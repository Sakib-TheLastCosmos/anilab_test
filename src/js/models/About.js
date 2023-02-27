import { getAdmin, getProfile } from "../config/base";


export default class About {
   constructor () {

   }


   async getInfo () {
      const admin = await getAdmin()

      this.about = admin.aboutMsg
      this.version = admin.version
      this.devEmail = admin.devMail
      this.contact = admin.contact
      this.adminProfile = {
         uid: admin.adminProfile
      }

      const adminProfile = await getProfile(this.adminProfile.uid)
      this.adminProfile.profilePhoto = adminProfile.profile.profilePhoto
      this.adminProfile.name = adminProfile.profile.fullname
   }
}