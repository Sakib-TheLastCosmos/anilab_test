import { collection, doc, getDoc, getDocs, limit, query, where } from "firebase/firestore"
import { db } from "../config/firebase"

export default class ProfileSuggestions {
    constructor (uid) {
        this.uid = uid
    }


    async getProfiles () {
        const preferenceDocRef = doc(db, 'preferences', this.uid)
        const preferenceDocSnap = await getDoc(preferenceDocRef)

        const preference = preferenceDocSnap.data()

        const sortedPreference = Object.fromEntries(
            Object.entries(preference.profiles).sort(([,a],[,b]) => b-a)
        );

        const profiles = Object.keys(sortedPreference) 
        let profilesArr = Object.keys(sortedPreference) 


        const selectedProfiles = []
        for (const profile of profiles.slice(0, 20)) {
            const profilesPostsDocRef = collection(db, 'postsBig')
            const str = `seen.${this.uid}`
            const q = query(profilesPostsDocRef, where('author.authorUID', '==', profile), where(str, '==', false), limit(1))

            const profilesPostsDocSnap = await getDocs(q)

            if (!profilesPostsDocSnap.docs.length > 0) {
                selectedProfiles.push(profile)
                profilesArr = profilesArr.filter(item => item !== profile)
            }

            if (selectedProfiles.length > 9) {
                break
            }
        }
        
        if (selectedProfiles.length > 9) {
            selectedProfiles.push(...profilesArr.slice(0, (10 - selectedProfiles.length)))
        }

        const selectedProfilesObjArr = []
        for (const profile of selectedProfiles) {
            const profileDocRef = doc(db, 'users', profile)
            const profileDocSnap = await getDoc(profileDocRef)

            const obj = {
                uid: profile,
                name: profileDocSnap.data().profile.nameArray[0],
                profilePhoto: profileDocSnap.data().profile.profilePhoto
            }

            selectedProfilesObjArr.push(obj)
        }

        return selectedProfilesObjArr
    }
}