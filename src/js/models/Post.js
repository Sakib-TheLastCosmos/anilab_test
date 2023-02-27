import { arrayRemove, arrayUnion, doc, getDoc, increment, updateDoc } from "firebase/firestore"
import { db } from "../config/firebase"
import { getProfile } from "../config/base"
import Preference from "./Preference"
import { getAnime, getAnimeByID, getGenres } from "../config/animeAPI"

export default class Post {
   constructor (id, uid) {
      this.id = id
      this.uid = uid
   }

   async isSaved (uid) {
      const saveDocRef = doc(db, 'saved', uid, 'postsBig', this.id)
      const saveDocSnap = await getDoc(saveDocRef)

      if (saveDocSnap.exists()) {
         return true
      } else {
         return false
      }
   }

   
   async isLiked (uid) {
      const likeDocRef = doc(db, 'likes', this.id)
      const likeDocSnap = await getDoc(likeDocRef)

      if (likeDocSnap.data().profiles.includes(uid)) {
         return true
      } else {
         return false
      }
   }

   async getPost () {
      const postDocRef = doc(db, 'postsBig', this.id)
      const postDocSnap = await getDoc(postDocRef)
   
      const post = postDocSnap.data()

      const author = await getProfile(post.authorUID)

      post.author = {
         fullname: author.profile.fullname,
         totalAnimes: author.profile.totalAnimes,
         profilePhoto: author.profile.profilePhoto
      }
      post.liked = await this.isLiked(this.uid)
      post.saved = await this.isSaved(this.uid)

      this.post = post
   }


   getPostFromFeed (feed) {
      const post = Array.from(feed).find(item => item.id == this.id)

      this.post = post
   }


   async like (uid) {
      const likesDocRef = doc(db, 'likes', this.id)
      const likesDocSnap = await getDoc(likesDocRef)

      const postDocRef = doc(db, 'postsBig', this.id)

      const updatePreference = async category => {
         await this.getPost()
         const genres = this.post.animeInfo.genres
         const anime = this.post.animeInfo.name
         const profile = this.post.authorUID
         console.log(profile, anime)

         const preference = new Preference(this.uid)

         if (category == 'liked') {
            await preference.update('profiles', profile, 100)
            genres.forEach(async cur => {
               await preference.update('genres', cur, 100)
            })
            await preference.update('animes', anime, 200)
            // preference.updateBooleansFeed(this.post.id, 'liked', true)
         } else if (category == 'unliked') {
            await preference.update('profiles', profile, -100)
            genres.forEach(async cur => {
               await preference.update('genres', cur, -100)
            })
            await preference.update('animes', anime, -200)
            // preference.updateBooleansFeed(this.post.id, 'liked', false)
         }
      }

      if (likesDocSnap.data().profiles.includes(uid)) {
         await updateDoc(likesDocRef, {
            profiles: arrayRemove(uid)
         })

         await updateDoc(postDocRef, {
            likes: increment(-1)
         })

         this.liked = false

         updatePreference('unliked')
      } else {
         await updateDoc(likesDocRef, {
            profiles: arrayUnion(uid)
         })

         await updateDoc(postDocRef, {
            likes: increment(1)
         })

         this.liked = true

         updatePreference('liked')
      }
   }

   async getTotalLikes () {
      const postDocRef = doc(db, 'postsBig', this.id)
      const postDocSnap = await getDoc(postDocRef)

      this.totalLikes = postDocSnap.data().likes

      return postDocSnap.data().likes
   }

}
