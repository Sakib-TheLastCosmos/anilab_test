import { doc, getDoc, collection, query, where, getDocs, limit, startAfter, orderBy } from "@firebase/firestore"
import { db } from "../config/firebase"
import { getProfile, formatTitle } from "../config/base"
import Post from "./Post"

export default class Profile {
   constructor (uid) {
      this.uid = uid
      this.lastDoc = false
   }

   isOwnProfile (uid) {
      if (this.uid == uid) {
         return true
      } else {
         return false
      }
   }


   async getProfile () {
      const profileDocRef = doc(db, 'users', this.uid)
      const profileDocSnap = await getDoc(profileDocRef)

      if (profileDocSnap.exists()) {
         const profile = profileDocSnap.data()
         this.profile = profile
      }
   }


   async getPosts (uid, givenLimit) {
      try {
         const profilePostDocRef = collection(db, 'postsBig')
         let q = ''
   
         if (!this.lastDoc) {
            q = query(profilePostDocRef, where('authorUID', '==', this.uid), limit(givenLimit))
            
         } else {   
            q = query(profilePostDocRef, where('authorUID', '==', this.uid), startAfter(this.lastDoc), limit(givenLimit))
         }
   
         const profilePostDocSnap = await getDocs(q)

         const newPosts = []
         if (profilePostDocSnap.docs.length > 0) {
            this.lastDoc = profilePostDocSnap.docs[profilePostDocSnap.docs.length - 1]
   
            for (let i in profilePostDocSnap.docs) {
               const post = profilePostDocSnap.docs[i].data()
               console.log(post)
               const author = await getProfile(post.authorUID)
      
               post.author = {
                  fullname: author.profile.fullname,
                  totalAnimes: author.profile.totalAnimes,
                  profilePhoto: author.profile.profilePhoto
               }
      
               post.reviewInfo.reviewShort = formatTitle(post.reviewInfo.review, 275)
      
               post.saved = await new Post (post.id).isSaved(uid)
               post.liked = await new Post (post.id).isLiked(uid)
      
               if (this.posts) {
                  newPosts.push(post)
                  this.posts.push(post)
               } else {
                  this.posts = [post]
               }
            }
            return newPosts
         }
      } catch (e) {
         console.log(e)
      } 
   }
}