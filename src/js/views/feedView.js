import { getProfile } from "../config/base"
import { getMarkup } from "../markup"

export const renderPosts = async (window, posts, parent) => {
   let markup = ''

   for (let i in posts) {
      markup += getMarkup().post(posts[i], window)
   }

   parent.innerHTML = markup
}


export const setProfilePhoto = (imageLink, imageCont) => {
   imageCont.src = imageLink
}

export const renderFeedCreatePostPanel = (profilePhoto, uid, parent) => {
   const markup = getMarkup().createPostFeed(profilePhoto, uid)

   parent.innerHTML = markup
}


export const renderMorePosts = (window, posts, parent) => {
   console.log('more postss arr', posts)
   let markup = ''

   for (let i in posts) {
      markup += getMarkup().post(posts[i], window)
   }

   parent.insertAdjacentHTML('beforeend', markup)
}


export const updateLikesAndSaved = (post, saveCont1, saveCont2, likeIconCont) => {
   saveCont1.parentElement.innerHTML = getMarkup().saveButton(post.saved, post.id)
   saveCont2.innerHTML = getMarkup().saveButtonDropdown(post.saved, post.id)
   likeIconCont.innerHTML = getMarkup().likeButtonIcon(post.liked)
}



