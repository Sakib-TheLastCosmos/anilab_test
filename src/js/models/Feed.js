import { collection, doc, endAt, getDoc, getDocs, limit, orderBy, query, setDoc, startAfter, startAt, updateDoc, where } from "firebase/firestore"
import { uploadBytesResumable } from "firebase/storage"
import { formatTitle, getProfile, shuffle } from "../config/base"
import { db } from "../config/firebase"
import Post from "./Post"

export default class Feed {
   constructor (uid) {
      this.uid = uid
   } 


   async getPosts () {
      const postRef = collection(db, 'postsBig')
      const q = query(postRef, orderBy("uploadedAt", 'desc'))
      const postSnapshot = await getDocs(q) 

      let posts = []

      postSnapshot.forEach(async cur => {
         const post = cur.data()
         console.log(post)
         const author = await getProfile(post.authorUID)

         post.author = {
            fullname: author.profile.fullname,
            totalAnimes: author.profile.totalAnimes,
            profilePhoto: author.profile.profilePhoto
         }

         post.reviewInfo.reviewShort = formatTitle(post.reviewInfo.review, 275)

         post.saved = await new Post (post.id).isSaved(this.uid)
         post.liked = await new Post (post.id).isLiked(this.uid)

         posts.push(post)
      })
      
      this.posts = posts
   }


   async getPostsTT (givenLimit) {
      try {
         this.posts = this.posts ? this.posts : []

         const postsDocRef = collection(db, 'postsBig')
         
         let q;
         if (this.lastDoc) q = query(postsDocRef, where(`seen.${this.uid}`, '!=', true), startAfter(this.lastDoc), limit(givenLimit))
         else q = query(postsDocRef, where(`seen.${this.uid}`, '!=', true), limit(givenLimit))
   
   
         const postsDocSnap = await getDocs(q)
         console.log('lastttt', postsDocSnap.docs)
         this.firstDoc = postsDocSnap.docs[0]
         this.lastDoc = postsDocSnap.docs[postsDocSnap.docs.length - 1]

         const posts = []
         postsDocSnap.forEach(post => {
            posts.push(post.data())
         })


         if (posts.length < givenLimit) {
            let q1;
            if (this.lastDoc) {
               q1 = query(postsDocRef, where(`seen.${this.uid}`, '==', true), startAfter(this.lastDoc), limit(givenLimit - posts.length))
            } else if (this.seenLastDoc) {
               q1 = query(postsDocRef, where(`seen.${this.uid}`, '==', true), startAfter(this.seenLastDoc), limit(givenLimit - posts.length))
            } else {
               q1 = query(postsDocRef, where(`seen.${this.uid}`, '==', true), limit(givenLimit - posts.length))
            }
            const seenPostsSnap = await getDocs(q1)
            console.log('lasttt2', seenPostsSnap.docs)

            const tempArr = []
            seenPostsSnap.forEach(cur => {
               posts.push(cur.data())
               tempArr.push(cur.data())
            })
            console.log('new posts', ...tempArr)
            console.log('newrrr', this.newRecommendations)
            this.seenLastDoc = seenPostsSnap.docs[seenPostsSnap.docs.length - 1]
            // this.lastDoc = this.seenLastDoc
         }
         
      
         let preferencesPosts = this.preferencesPosts ? this.preferencesPosts : []
         let newRecommendations = this.newRecommendations ? this.newRecommendations : []

         console.log('newP', ...newRecommendations)
         console.log('prefP', ...preferencesPosts)

   
         const preferenceDocRef = doc(db, 'preferences', this.uid)
         const preferenceDocSnap = await getDoc(preferenceDocRef)
         const avg = preferenceDocSnap.data().total / (preferenceDocSnap.data().count + 3)
   
         console.log(posts)
         posts.forEach(cur => {
            cur.reviewInfo.reviewShort = formatTitle(cur.reviewInfo.review, 275)

            let preference = preferenceDocSnap.data()
            let post = cur
   
            let points = 0
            let count = 0
            post.animeInfo.genres.forEach(genre => {
               count ++
               if (preference.genres[genre]) {
                  points += preference.genres[genre]
               }
            })
   
            if (preference.animes[post.animeInfo.name]) {
               points += preference.animes[post.animeInfo.name]
            }
            count ++
   
            if (preference.profiles[post.authorUID]) {
               points += preference.profiles[post.authorUID]
            }
            count ++
   
   
            points += post.likes * 40
   
            post.avg = points / count
   
            if ((points / count) > avg) {
               preferencesPosts.push(post)
            } else {
               newRecommendations.push(post)
            }

            cur.points = points
         })
         console.log('new', ...newRecommendations)
         console.log('pref', ...preferencesPosts)

      
         const selectedPreferencePosts = []
         const total = givenLimit
         const preferenceCount = Math.round(total * (80 / 100))
         const newCount = total - preferenceCount
   
         selectedPreferencePosts.push(...preferencesPosts.slice(0, total))
         preferencesPosts.splice(0, total)
         this.preferencesPosts = preferencesPosts
      
         if (selectedPreferencePosts.length < total) {
            if (selectedPreferencePosts.length <= preferenceCount && selectedPreferencePosts.length > newCount) {
               console.log('condition 1', ...newRecommendations)
               const selectedPreferencePostsOldLength = selectedPreferencePosts.length
               selectedPreferencePosts.push(...newRecommendations.slice(0, (total - selectedPreferencePostsOldLength)))
               newRecommendations.splice(0, (total - selectedPreferencePostsOldLength))  
            } else if (selectedPreferencePosts.length <= newCount && this.loaded == 0 && posts.length >= total) {
               console.log('condition 2')
               this.loaded ++
               this.newRecommendations = newRecommendations
               this.preferencesPosts = preferencesPosts
               await this.getPostsTT(givenLimit)
            } else {
               console.log('condition 3')
               selectedPreferencePosts.push(...preferencesPosts.slice(0, newCount))
               preferencesPosts.splice(0, newCount)   

               if (selectedPreferencePosts.length < total) {
                  const selectedPreferencePostsOldLength = selectedPreferencePosts.length
                  selectedPreferencePosts.push(...newRecommendations.slice(0, total - selectedPreferencePostsOldLength))
                  newRecommendations.splice(0, selectedPreferencePostsOldLength)
               }
            }
         }
         
         this.newRecommendations = newRecommendations
         console.log(...selectedPreferencePosts)
   
         this.loaded = 0

         // if (selectedPreferencePosts.length < total && preferencesPosts.length > 0) {
         //    selectedPreferencePosts.push(...preferencesPosts.slice(0, (total - 1 - selectedPreferencePosts.length)))
         //    preferencesPosts.splice(0, (total - 1 - selectedPreferencePosts.length))
         // } 
         
         shuffle(selectedPreferencePosts)

         this.posts.push(...selectedPreferencePosts)
         return selectedPreferencePosts 
      } catch (e) {
         console.log(e)
         return e
      }
   }


   async updateSeen () {
      if (this.firstDoc && this.lastDoc) {
         const postsDocRef = collection(db, 'postsBig')
         const q = query(postsDocRef, where(`seen.${this.uid}`, '!=', true), startAt(this.firstDoc), endAt(this.lastDoc))
         const postsDocSnap = await getDocs(q)
   
         for (let i = 0; i < postsDocSnap.docs.length; i++) {
            const postDocRef = doc(db, 'postsBig', postsDocSnap.docs[i].id)
            const str = `seen.${this.uid}`
            await updateDoc(postDocRef, {
               [str]: true
            })
         }
      }
   }


   async getLikesAndSaved (posts) {
      for (const post of posts) {
         post.liked = await new Post(post.id, this.uid).isLiked(this.uid)
         post.saved = await new Post(post.id, this.uid).isSaved(this.uid)
      }
   }
}


