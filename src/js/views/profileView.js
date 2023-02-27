import { getDOM } from "../DOM"
import { getMarkup } from "../markup"

export const renderProfilePage = (isOwnProfile, profile, parent) => {
   const markup = getMarkup().profilePage(profile)

   parent.innerHTML = markup

   if (!isOwnProfile) {
      getDOM().editProfileCont.style.display = 'none'
   }
}


export const renderPosts = (window, posts, parent) => {
   let markup = ''

   posts.forEach(cur => {
      markup += getMarkup().post(cur, window)
   })

   parent.innerHTML = markup
}

export const renderMorePosts = (window, posts, parent) => {
   let markup = ''

   posts.forEach(cur => {
      markup += getMarkup().post(cur, window)
   })

   parent.insertAdjacentHTML('beforeend', markup)
}