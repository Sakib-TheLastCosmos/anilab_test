import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, updateProfile, onAuthStateChanged } from "firebase/auth";

import { db } from "../config/firebase";
import { doc, setDoc, getDoc, updateDoc, addDoc } from "@firebase/firestore";
import { getDOM } from "../DOM";

import { storage } from "../config/firebase";
import { ref, uploadBytes, updateMetadata, getDownloadURL } from "@firebase/storage";

import { firebaseStorageConfig } from "../config/config";
import { getProfile } from "../config/base";
import Preference from "./Preference";

const auth = getAuth()
const provider = new GoogleAuthProvider();


export default class User {
   constructor () {
   }


   async init () {
      const user = await getAuth()
      if (!this.auth) {
         this.auth = user.currentUser
      }
      console.log(user.currentUser)
   }


   async signIn () {
      try {
         provider.addScope('https://www.googleapis.com/auth/user.birthday.read')
     
         const result = await signInWithPopup(auth, provider)

         // This gives you a Google Access Token. You can use it to access the Google API.
         const credential = await GoogleAuthProvider.credentialFromResult(result);
         const token = credential.accessToken;

         // The signed-in user info.
         const user = result.user;

         this.auth = user

         const profileDocRef = doc(db, 'users', this.auth.uid)
         const isProfileCompleted = await this.isProfileCompleted()

         if (!isProfileCompleted) {
            let nameArray = this.auth.displayName.split(' ')
            nameArray = nameArray.map(cur => cur.toLowerCase())
            const profileDocData = {
               profile: {
                  fullname: this.auth.displayName,
                  nameArray: nameArray,
                  email: this.auth.email,
               },
               posts: [],
               savedPosts: [],
               mode: 'light'
            }
   
            await setDoc(profileDocRef, profileDocData)   
            new Preference(this.auth.uid).createPreference()
         }

         return user
      } catch (error) {
         // Handle Errors here.
         const errorCode = error.code;
         const errorMessage = error.message;
         // The email of the user's account used.
         const email = error.email;
         // The AuthCredential type that was used.
         const credential = GoogleAuthProvider.credentialFromError(error);

         return error
      }
   }


   signOut () {
      signOut(auth)
      this.auth = undefined
   }


   async isSignedIn () {
      await this.init()
      console.log(this.auth)
      if (this.auth) return true
      else return false   
   }


   async updateProfile (property, value, profile=true) {
      try {
         const profileDocRef = doc(db, 'users', this.auth.uid)
         const profileDocSnap = await getDoc(profileDocRef)

         if (!profileDocSnap.exists()) {

         }

         let profileDocData = {}
         if (profile) {
            profileDocData = {
               [`profile.${property}`]: value 
            }
         } else {
            profileDocData = {
               [property]: value
            }
         }

         await updateDoc(profileDocRef, profileDocData)
      } catch (e) {
         return e
      }
   }


   async uploadProfilePhoto (photo) {
      const storageRef = ref(storage, `${firebaseStorageConfig.profileFolder}/${this.auth.uid}/profile.jpeg`)

      const snapshot = await uploadBytes(storageRef, photo)

      const imageURL = await getDownloadURL(storageRef)
      console.log(imageURL)

      await this.updateProfile('profilePhoto', imageURL)
   }


   async uploadCoverPhoto (photo) {
      const storageRef = ref(storage, `${firebaseStorageConfig.profileFolder}/${this.auth.uid}/cover.jpeg`)
      console.log(storageRef)

      const snapshot = await uploadBytes(storageRef, photo)

      const imageURL = await getDownloadURL(storageRef)
      console.log(imageURL)

      await this.updateProfile('coverPhoto', imageURL)

      const usersDocRef = doc(db, 'users', 'allusers')
      updateDoc(usersDocRef, {
         users: arrayUnion(this.auth.uid)
      })
   }


   async isProfileCompleted () {
      try {
         const profileDocRef = doc(db, 'users', this.auth.uid)
         const profileDocSnap = await getDoc(profileDocRef)
   
         if (profileDocSnap.exists()) {
            const profile = await profileDocSnap.data().profile
            console.log(profile)
   
            if (profile.bio && profile.livesIn && profile.favAnimes && profile.dreamChar && profile.totalAnimes && profile.subOrDub && profile.animeOrManga && profile.profilePhoto && profile.coverPhoto) {
               return true
            } else {
               return false
            }
         } else {
            return false
         }
      } catch (e) {
         return e
      }
   }


   async updateMode (mode) {
      try {
         const profileDocRef = doc(db, 'users', this.auth.uid)
         const profileDocSnap = await getDoc(profileDocRef)

         const profileDocData = {
            mode: mode 
         }

         await updateDoc(profileDocRef, profileDocData)
      } catch (e) {
         return e
      }
   }

   getUID () {
      return this.auth.uid
   }

   async getOwnProfile () {
      const profile = await getProfile(this.auth.uid)

      this.profile = profile
   }


   async updatePreferences (property, value) {
      const preferenceDocRef = doc(db, 'preferences', this.profile.uid)
      const preferenceDocSnap = await getDoc()
   }
}


