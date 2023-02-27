import { setDoc, doc, updateDoc, arrayUnion, collection, getDocs, getDoc } from '@firebase/firestore'
import { db } from '../config/firebase'
import { getAnimeByIDAll, getGenres } from '../config/animeAPI'
import { firebaseStorageConfig } from '../config/config'
import { getUniqueID } from '../config/uniqueIDAPI'
import { ref, uploadBytes, getDownloadURL } from '@firebase/storage'
import { storage } from '../config/firebase' 
import Preference from './Preference'
import { getManualPostID } from '../config/base'



const refreshFeedServer = async (id) => {
   const preferencesDocRef = collection(db, 'preferences')
   const preferencesDocSnap = await getDocs(preferencesDocRef)

   const postDocRef = doc(db, 'postsBig', id)
   const postDocSnap = await getDoc(postDocRef)

   const feedDocRef = doc(db, 'feed', id)
   await setDoc(feedDocRef, {
      profiles: {},
      seen: [],
      liked: {},
      time: new Date()
   })

   preferencesDocSnap.forEach(async preference => {
      let cur = preference.data()
      let points = 0
      postDocSnap.data().animeInfo.genres.forEach(genre => {
         if (cur.genres[genre]) {
            points += cur.genres[genre]
         }
      })

      if (cur.animes[postDocSnap.data().animeInfo.name]) {
         points += cur.animes[postDocSnap.data().animeInfo.name]
      }

      if (cur.profiles[postDocSnap.data().authorUID]) {
         points += cur.profiles[postDocSnap.data().authorUID]
      }

      points += postDocSnap.data().likes * 40

      const refStr = `profiles.${preference.id}`
      await updateDoc(feedDocRef, {
         [refStr]: points
      })
   })
}


const initSeen = async id => {
   const postDocRef = doc(db, 'postsBig', id)
   const usersDocRef = doc(db, 'users', 'allusers')
   const usersDocSnap = await getDoc(usersDocRef)

   const users = usersDocSnap.data().users

   const seenObj = {}
   users.forEach(cur => {
      seenObj[cur] = false
   })

   updateDoc(postDocRef, {
      seen: seenObj
   })
}

 


export default class UploadPost {
   constructor (id) {
      this.id = id
   }


   async getAnimeInfo () {
      try {
         let resultRawAnime = await getAnimeByIDAll(this.id)
         resultRawAnime = resultRawAnime[0]

         const obj = {
            id: resultRawAnime.id,
            name: resultRawAnime.attributes.titles.en || resultRawAnime.attributes.titles.en_jp || resultRawAnime.attributes.canonicalTitle,
            totalEpisodes: resultRawAnime.attributes.episodeCount,
            imageURL: resultRawAnime.attributes.posterImage.tiny,
            year: resultRawAnime.attributes.startDate.split('-')[0]
         }
   
         const genres = await getGenres(this.id)
         obj.genres = genres

         this.animeInfo = obj
         if (!this.reviewInfo) this.reviewInfo = {}
      } catch (e) {
         console.log(e)
      }
   }

   
   async upload (reviewInfo, uid) {
      try {
         const postID = await getManualPostID(uid)
         reviewInfo.id = postID
         // reviewInfo.authorUID = uid

         const storageRef = ref(storage, `${firebaseStorageConfig.profileFolder}/${uid}/${firebaseStorageConfig.postFolder}/${reviewInfo.id}.jpeg`)

         const snapshot = await uploadBytes(storageRef, reviewInfo.image)
         
         reviewInfo.image = null
   
         const imageURL = await getDownloadURL(storageRef) 

         reviewInfo.imageURL = imageURL

         const postDocRef = doc(db, 'postsBig', postID)
         const postDocData = {
            id: postID,
            authorUID: uid,
            animeInfo: this.animeInfo,
            reviewInfo: reviewInfo,
            uploadedAt: new Date(),
            likes: 0
         }

         await setDoc(postDocRef, postDocData)

         const authorDocRef = doc(db, "users", uid)
         const authorDocSnap = await getDoc(authorDocRef)

         postDocData.author = {
            profilePhoto: authorDocSnap.data().profile.profilePhoto,
            fullname: authorDocSnap.data().profile.fullname,
            totalAnimes: authorDocSnap.data().profile.totalAnimes
         }

         const postsBigDocRef = doc(db, 'postsBig', postID)
         await setDoc(postsBigDocRef, postDocData)

         const likesDocRef = doc(db, 'likes', postID)
         setDoc(likesDocRef, {
            profiles: []
         })

         new Preference(uid).update('animes', this.animeInfo.name, (reviewInfo.rating * 10))
         this.animeInfo.genres.forEach(cur => {
            new Preference(uid).update('genres', cur, reviewInfo.rating * 10)
         })

         initSeen(postDocData.id)



      } catch (e) {
         console.log(e)
      }
   }
}