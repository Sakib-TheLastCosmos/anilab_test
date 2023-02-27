import { getAuth, onAuthStateChanged } from "@firebase/auth"
import { doc, getDoc, getDocs, updateDoc, collection, query, orderBy, limit, where } from "@firebase/firestore"
import { adminInfoID } from "../config/config"
import { db } from "../config/firebase"
import { getRandomQuote } from "../config/animeQuoteAPI"
import { getAdmin, getProfile } from "../config/base"

export default class Init {
   constructor (userUID) {
      this.userUID = userUID
   }

   async getYourReviews () {
      const postDocRef = collection(db, 'postsBig')

      const q = query(postDocRef, where('authorUID', '==', this.userUID), orderBy('uploadedAt', 'desc'), limit(6))

      const postDocSnap = await getDocs(q)

      const yourReviews = []
      postDocSnap.forEach(cur => {
         yourReviews.push(cur.data())
      })

      this.yourPosts = yourReviews
   }


   async getSavedPosts () {
      const savedDocRef = collection(db, 'saved', this.userUID, 'postsBig')
      const q = query(savedDocRef, orderBy('savedAt', 'desc'), limit(6))

      const savedDocSnap = await getDocs(q)

      const saved = []

      for (let i in savedDocSnap.docs) {
         const postDocRef = doc(db, 'postsBig', savedDocSnap.docs[i].data().id)
         const postDocSnap = await getDoc(postDocRef)
         saved.push(postDocSnap.data())
      }

      this.savedPosts = saved
   }


   async getMode () {
      const profile = await getProfile(this.userUID)
      const mode = profile.mode
      return mode
   }


   async getProfileBarInfo () { 
      const profile = await getProfile(this.userUID)

      const obj = {
         name: profile.profile.fullname,
         profilePhoto: profile.profile.profilePhoto
      }

      return obj
   }


   async getWelcomeMsg () {
      const admin = await getAdmin()
      const welcomeMsg = admin.welcomeMsg

      this.welcomeMsg = welcomeMsg
   }


   async getAdminMsg () {
      const admin = await getAdmin()
      const adminMsg = admin.adminMsg

      this.adminMsg = adminMsg

      const adminProfile = await getProfile(admin.adminProfile)
      this.adminProfile = {
         uid: this.userUID,
         profilePhoto: adminProfile.profile.profilePhoto,
         name: adminProfile.profile.fullname
      }
   }


   async getQuote () {
      const admin = await getAdmin()
      let quote;
      if (admin.quote && (admin.quote.date.date == new Date().getDate() && admin.quote.date.month == new Date().getMonth() && admin.quote.date.fullYear == new Date().getFullYear())) {
         quote = admin.quote
      } else {
         const adminDocRef = doc(db, 'admin', adminInfoID)
         const quoteData = {
            quote: await getRandomQuote()
         }
         quoteData.quote.date = {
            date: new Date().getDate(),
            month: new Date().getMonth(),
            fullYear: new Date().getFullYear()
         }
         quote = quoteData.quote

         await updateDoc(adminDocRef, quoteData)
      }

      this.quote = quote
   }
}




