import { doc, setDoc, deleteDoc, getDoc, getDocs, limit, query, orderBy, collection, startAfter, where } from "firebase/firestore"
import { getPost, getProfile } from "../config/base"
import { db } from "../config/firebase"
import Preference from "./Preference"

export default class Saved {
   constructor (uid) {
      this.uid = uid
   }

   async addPost (postID) {
      const post = await getPost(postID)
      const author = await getProfile(post.authorUID)

      const obj = {
         id: post.id,
         animeInfo: {
            id: post.animeInfo.id,
            name: post.animeInfo.name,
            nameArr: post.animeInfo.name.split(' ').map(cur => cur.toLowerCase())
         },
         reviewInfo: {
            imageURL: post.reviewInfo.imageURL,
            rating: post.reviewInfo.rating
         },
         author: {
            uid: post.authorUID,
            name: author.profile.fullname,
            nameArr: author.profile.fullname.split(' ').map(cur => cur.toLowerCase()),
            totalAnimes: author.profile.totalAnimes,
            profilePhoto: author.profile.profilePhoto
         },
         savedAt: new Date ()
      }

      if (obj.animeInfo.nameArr.length == 1) {
         obj.animeInfo.nameArr = obj.animeInfo.nameArr[0].split(';')
      }

      const saveDocRef = doc(db, 'saved', this.uid, 'postsBig', postID)
      await setDoc(saveDocRef, obj)

      const preference = new Preference (this.uid)
      post.animeInfo.genres.forEach(cur => {
         preference.update('genres', cur, 100)
      })
      preference.update('animes', obj.animeInfo.name, 200)
      preference.update('profiles', obj.author.uid, 100)
   }

   async removePost (postID) {
      const saveDocRef = doc(db, 'saved', this.uid, 'postsBig', postID)
      await deleteDoc(saveDocRef)


      const post = await getPost(postID)
      const preference = new Preference (this.uid)
      post.animeInfo.genres.forEach(cur => {
         preference.update('genres', cur, -100)
      })
      preference.update('animes', post.animeInfo.name, -200)
      preference.update('profiles', post.authorUID, -100)

   }


   async isSaved (postID) {
      const saveDocRef = doc(db, 'saved', this.uid, 'postsBig', postID)
      const saveDocSnap = await getDoc(saveDocRef)

      if (saveDocSnap.exists()) {
         return true
      } else {
         return false
      }
   }


   async getSaved (givenLimit, lastDoc) {
      if (!this.savedPosts) {
         this.savedPosts = {
            today: [],
            thisMonth: [],
            earlier: []
         }
      }

      const savedDocRef = collection(db, 'saved', this.uid, 'postsBig')

      let q = ''
      if (!lastDoc) {
         q = query(savedDocRef, orderBy('savedAt'), limit(givenLimit))
         
      } else {
         const lastDocSnap = await getDoc(doc(db, 'saved', this.uid, 'postsBig', lastDoc.id))
         console.log(lastDocSnap)
         q = query(savedDocRef, orderBy('savedAt'), startAfter(lastDocSnap), limit(givenLimit))
      }


      const savedDocSnap = await getDocs(q)
      console.log(savedDocSnap)

      if (!this.savedPosts.allPosts) this.savedPosts.allPosts = []
      savedDocSnap.forEach(cur => {
         cur = cur.data()
         const savedAt = cur.savedAt.toDate()
         if (savedAt.getFullYear() == new Date ().getFullYear() && savedAt.getMonth() == new Date ().getMonth() && savedAt.getDate() == new Date ().getDate()) {
            this.savedPosts.today.push(cur)

         } else if (savedAt.getFullYear() == new Date ().getFullYear() && savedAt.getMonth() == new Date ().getMonth() && savedAt.getDate() != new Date ().getDate()) {
            this.savedPosts.thisMonth.push(cur)

         } else {
            this.savedPosts.earlier.push(cur)

         }

         this.savedPosts.allPosts.push(cur)
      })
   }


   async getSearchedSaved (searchQuery) {
      this.search = {
         query: searchQuery,
         result: []
      }

      let queryArr = searchQuery.split(' ')
      queryArr = queryArr.map(cur => cur.toLowerCase())

      const tempSnapshot = []

      const savedDocRef = collection(db, 'saved', this.uid, 'postsBig')
      for (let i in queryArr) {
         const q = query(savedDocRef, where("animeInfo.nameArr", "array-contains", queryArr[i]))
         const querySnapshot = await getDocs(q)
         tempSnapshot.push(querySnapshot)
      }

      for (let i in queryArr) {
         const q = query(savedDocRef, where("author.nameArr", "array-contains", queryArr[i]))
         const querySnapshot = await getDocs(q)
         tempSnapshot.push(querySnapshot)
      }

      tempSnapshot.forEach(cur => {
         const resultArr = cur.docs

         resultArr.forEach(saved => {
            let savedObj = saved.data()

            if (!this.search.result.some(item => item.id == savedObj.id)) {
               this.search.result.push(savedObj)
            }   
         })
      })

      return this.search.result
   }
}