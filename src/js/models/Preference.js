import { addDoc, doc, getDoc, getDocs, increment, setDoc, updateDoc } from "firebase/firestore"
import { getGenres } from "../config/animeAPI"
import { getProfile } from "../config/base"
import { db } from "../config/firebase"

export default class Preference {
   constructor (uid) {
      this.uid = uid
   }

   async createPreference () {
      const preferenceDocRef = doc(db, 'preferences', this.uid)
      const preferenceDocSnap = await getDoc(preferenceDocRef)

      let profile = await getProfile(this.uid)
      profile = profile.profile

      const genre1 = await getGenres(profile.favAnimes[0].id)
      const genre2 = await getGenres(profile.favAnimes[1].id)
      const genre3 = await getGenres(profile.favAnimes[2].id)

      const genres = {}
      let total = 0
      let count = 0

      genre1.forEach(cur => {
         if (!genres[cur]) genres[cur] = 400
         else genres[cur] += 400
      })

      genre2.forEach(cur => {
         if (!genres[cur]) genres[cur] = 350
         else genres[cur] += 350
      })

      genre3.forEach(cur => {
         if (!genres[cur]) genres[cur] = 300
         else genres[cur] += 300
      })

      total += (400 + 350 + 300)
      count += 3

      const anime1 = profile.favAnimes[0].text
      const anime2 = profile.favAnimes[1].text
      const anime3 = profile.favAnimes[2].text

      const animes = {
         [anime1]: 500,
         [anime2]: 450,
         [anime3]: 400
      }

      total += (400 + 350 + 300 + 500 + 450 + 400)
      count += 6

      await setDoc(preferenceDocRef, {
         genres: genres,
         animes: animes,
         profiles: {},
         isInitiated: true,
         total: total,
         count: count
      })
   }

   async update (category, property, value) {
      const preferenceDocRef = doc(db, 'preferences', this.uid)
      const preferenceDocSnap = await getDoc(preferenceDocRef)
      
      if (!preferenceDocSnap.data().genres || !preferenceDocSnap.data().animes || !preferenceDocSnap.data().profiles) {
         await this.createPreference()
      }

      const categoryDoc = preferenceDocSnap.data()[category]
      console.log(categoryDoc)
      const propertyString = `${category}.${property}`

      if (categoryDoc[property]) {
         await updateDoc(preferenceDocRef, {
            [propertyString]:  increment(value)
         })
      } else {
         await updateDoc(preferenceDocRef, {
            [propertyString]: value
         })
      }

      await updateDoc(preferenceDocRef, {
         'total': increment(value),
         'count': increment(1)
      })
   }


   async updateBooleansFeed (postID, category, value) {
      const feedDocRef = doc(db, 'feed', postID)
      
      const str = `${category}.${this.uid}`
      await updateDoc(feedDocRef, {
         [str]: value
      })
   }


   async isInitiated () {
      const preferenceDocRef = doc(db, 'preferences', this.uid)
      const preferenceDocSnap = await getDoc(preferenceDocRef)

      if (!preferenceDocSnap.exists()) {
         return false
      }

      return preferenceDocSnap.data().isInitiated
   }
}