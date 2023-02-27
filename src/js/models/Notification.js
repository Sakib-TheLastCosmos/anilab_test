import { addDoc, collection, doc, getDoc, getDocs, limit, orderBy, query, setDoc, startAfter, updateDoc, where } from "firebase/firestore"
import { db } from "../config/firebase"

export default class Notification {
    constructor (uid, name) {
        this.uid = uid
        this.name = name
        this.notifications = []
    }

    async send (postID, type) {
        try {
            const postDocRef = doc(db, 'postsBig', postID)
            const postDocSnap = await getDoc(postDocRef)

            if (this.uid != postDocSnap.data().authorUID) {
                const receiverUID = postDocSnap.data().authorUID
                const receiverDocRef = collection(db, 'notifications', receiverUID, 'notifications')
                const q = query(receiverDocRef, where('postID', '==', postID))
                let receiverDocSnap = await getDocs(q)
    
                const likes = postDocSnap.data().likes
        
                const anime = postDocSnap.data().animeInfo.name
                
                let text = ''
                if (likes < 2) {
                    text = `<strong>${this.name}</strong> loved your review on <strong>${anime}</strong>`
                } else {
                    text = `<strong>${this.name} and ${likes - 1} others</strong> loved your review on <strong>${anime}</strong>`
                }
    
                const updatedTime = new Date()
    
        
                if (receiverDocSnap.docs.length != 0) {
                    await updateDoc(receiverDocRef, {
                        name: this.name,
                        uid: this.uid,
                        likes: likes,
                        text: text,
                        updatedTime: updatedTime
                    })
                } else {
                    await addDoc(receiverDocRef, {
                        name: this.name,
                        uid: this.uid,
                        likes: likes,
                        anime: anime,
                        text: text,
                        updatedTime: updatedTime,
                        postID: postID,
                        postImg: postDocSnap.data().reviewInfo.imageURL
                    })
                }    
            }
        } catch (e) {
            console.log(e)
        }
    }


    async getNotifications (givenLimit) {
        const notificationsDocRef = collection(db, 'notifications', this.uid, 'notifications')

        let q = ''
        if (this.lastDoc) q = query(notificationsDocRef, orderBy('updatedTime', 'desc'), limit(givenLimit), startAfter(this.lastDoc))
        else q = query(notificationsDocRef, orderBy('updatedTime', 'desc'), limit(givenLimit))

        const notificationsDocSnap = await getDocs(q)

        const notifications = []
        if (notificationsDocSnap.docs.length > 0) {
            this.lastDoc = notificationsDocSnap.docs[notificationsDocSnap.docs.length - 1]

            for (const notification of notificationsDocSnap.docs) {
                notifications.push(notification.data())
            }
        }

        this.notifications.push(...notifications)
        return notifications
    }


    async updatePostNotifications () {
        try {
            const preferenceDocRef = doc(db, 'preferences', this.uid)
            const preferenceDocSnap = await getDoc(preferenceDocRef)
    
            const profiles = Object.keys(preferenceDocSnap.data().profiles)
    
            for (const profile of profiles) {
                const postDocRef = collection(db, 'postsBig')
                const str = `seen.${this.uid}`
                const q = query(postDocRef, where(str, '==', false), where('authorUID', '==', profile), limit(2))
                
                const postDocSnap = await getDocs(q)
    
                let notification = {}
                if (postDocSnap.docs.length == 1) {
                    const post = postDocSnap.docs[0].data()
    
                    notification = {
                        type: 2,
                        anime: post.animeInfo.name,
                        author: post.author.fullname,
                        authorUID: post.authorUID,
                        text: `<strong>${post.author.fullname}</strong> posted a new review on <strong>${post.animeInfo.name}</strong>`,
                        authorImg: post.author.profilePhoto,
                        postID: post.id,
                        updatedTime: new Date()
                    }
                } else if (postDocSnap.docs.length > 1) {
                    const post = postDocSnap.docs[0].data()
    
                    notification = {
                        type: 2,
                        author: post.author.fullname,
                        authorUID: post.authorUID,
                        text: `<strong>${post.author.fullname}</strong> posted some new reviews. Check them out!`,
                        authorImg: post.author.profilePhoto,
                        updatedTime: new Date()
                    }
                }
    
    
                if (notification.text) {
                    const notificationDocRef = collection(db, 'notifications', this.uid, 'notifications')
    
                    await addDoc(notificationDocRef, notification)
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    async getPostNotifications (givenLimit) {
        const notificationsDocRef = collection(db, 'notifications', this.uid, 'notifications')

        const q = query(notificationsDocRef, where('type', '==', 2), orderBy('updatedTime', 'desc'), limit(givenLimit))

        const notificationsDocSnap = await getDocs(q)

        const notifications = []
        if (notificationsDocSnap.docs.length > 0) {
            for (const notification of notificationsDocSnap.docs) {
                notifications.push(notification.data())
            }
        }

        return notifications
    }

    
}