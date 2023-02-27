import { getDOM } from "../DOM"
import { getMarkup } from "../markup"

export const renderFullPostView = post => {
   getDOM().fullPostViewParentCont.style.display = 'flex'
   getDOM().fullPostViewCont.style.display = 'block'

   getDOM().fullPostViewCont.innerHTML = getMarkup().fullPost(post)

   getDOM().fullPostReviewCont.innerText = post.reviewInfo.review
}


export const removeFullPostView = post => {
   getDOM().fullPostViewParentCont.style.display = 'none'
   getDOM().fullPostViewCont.style.display = 'none'

}


export const updateLikes = (likes, button) => {
   button.children[1].children[0].textContent = likes
}

export const toggleLikeButton = (isLiked, button) => {
   if (isLiked) {
      button.children[0].children[0].setAttribute('href', '../icons/icons.svg#icon__heart-fill')
   } else {
      button.children[0].children[0].setAttribute('href', '../icons/icons.svg#icon__heart')
   }
}