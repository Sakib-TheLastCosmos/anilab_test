import { getDOM } from "../DOM"
import { getMarkup } from "../markup"
import { adminInfoID } from "./config"
import { doc, getDoc } from "firebase/firestore"
import { db } from "./firebase"
import { async } from "@firebase/util"
import ShortUniqueId from "short-unique-id"

export const renderPopupCont = child => {
   child.parentElement.style.display = 'flex'
}

export const removePopupCont = child => {
   child.parentElement.style.display = 'none'
}


export const showLoader = parent => {
   const prevLoader = document.querySelectorAll('.loader_cont')
   if (prevLoader) {
      Array.from(prevLoader).forEach(cur => {
         parent.removeChild(cur)
      })
   }

   const markup = getMarkup().loader()

   parent.insertAdjacentHTML('afterbegin', markup)
}


export const removeLoader = parent => {
   Array.from(document.querySelectorAll('.loader_cont')).forEach(cur => {
      parent.removeChild(cur)
   })
}



export const formatTitle = (title, maxLength = 20) => {
   const titleArr = title.split(' ')
   let formattedTitle = ''
   titleArr.forEach(cur => {
     if (formattedTitle.length + cur.length <= maxLength) {
       formattedTitle += `${formattedTitle.length > 0 ? ' ' : ''}${cur}`
     }
   })
 
   if (formattedTitle.toLowerCase() !== title.toLowerCase()) formattedTitle += ' ...'
   return formattedTitle
}


export const getAdmin = async () => {
   const adminDocRef = doc(db, 'admin', adminInfoID)
   const adminDocSnap = await getDoc(adminDocRef)

   if (adminDocSnap.exists()) {
      const admin = adminDocSnap.data()
      return admin
   }
}


export const getProfile = async userUID => {
   const profileDocRef = doc(db, 'users', userUID)
   const profileDocSnap = await getDoc(profileDocRef)

   if (profileDocSnap.exists()) {
      const profile = profileDocSnap.data()
      return profile
   }
}


export const getPost = async postID => {
   const postDocRef = doc(db, 'postsBig', postID)
   const postDocSnap = await getDoc(postDocRef)

   if (postDocSnap.exists()) {
      const post = postDocSnap.data()
      return post
   }
}


export const getManualPostID = async UID => {
   let ID = ''

   ID += `${3000 - new Date().getFullYear()}-`
   if (12 - new Date().getMonth() < 10) {
      ID += `0${12 - new Date().getMonth()}-`
   } else {
      ID += `${12 - new Date().getMonth()}-`
   }

   if ((31 - new Date().getDate()) < 10) {
      ID += `0${31 - new Date().getDate()}`
   } else {
      ID += `${31 - new Date().getDate()}`
   }

   ID += `-${UID}`
   const addition = new ShortUniqueId({length: 6})
   ID += `-${addition()}` 

   return ID
}


export const shuffle = (array) => {
   let currentIndex = array.length,  randomIndex;
 
   // While there remain elements to shuffle.
   while (currentIndex != 0) {
 
     // Pick a remaining element.
     randomIndex = Math.floor(Math.random() * currentIndex);
     currentIndex--;
 
     // And swap it with the current element.
     [array[currentIndex], array[randomIndex]] = [
       array[randomIndex], array[currentIndex]];
   }
 
   return array;
 }

