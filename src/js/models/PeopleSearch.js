import { collection, getDocs, query, where } from "@firebase/firestore"
import { db } from "../config/firebase"

export default class People {
   constructor (query) {
      this.query = query.toLowerCase()
   }


   async getPeople () {
      const usersRef = collection(db, 'users')

      let queryArray = this.query.split(' ')
      queryArray = queryArray.map(cur => cur.toLowerCase())

      let result = []

      let tempSnapshot = []

      for (let i in queryArray) {
         const q = query(usersRef, where("profile.nameArray", "array-contains", queryArray[i]))
         const querySnapshot = await getDocs(q)
   
         tempSnapshot.push(querySnapshot)
      }

      tempSnapshot.forEach(cur => {
         const profileArr = cur.docs
         profileArr.forEach(profile => {
            let profileObj = profile.data()
            const obj = {
               uid: profile.id,
               fullname: profileObj.profile.fullname,
               profilePhoto: profileObj.profile.profilePhoto,
               totalAnimesAmount: profileObj.profile.totalAnimes.amount
            }

            if (!result.some(profile => profile.uid === obj.uid)) {
               result.push(obj)
            }
         })
      })



      this.people = result
      return result
   }
}

