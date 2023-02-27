import { removePopupCont, renderPopupCont } from "../config/base"
import { getDOM } from "../DOM"
import { getMarkup } from "../markup"

export const renderCreatePostCont = () => {
   renderPopupCont(getDOM().addReviewPopup1)
   getDOM().addReviewPopup1.style.display = 'block'
   getDOM().addReviewPopup2.style.display = 'none'
}

export const removeCreatePostCont = () => {
   removePopupCont(getDOM().addReviewPopup1)
   getDOM().addReviewPopup2.style.display = 'none'
}


export const renderResultAnimes = (parent, result) => {
   let markup = ''
   Array.from(result).forEach(cur => {
      markup += getMarkup().reviewAnimeSearchResults('upload-post__anime-list-items', cur.id, formatTitle(cur.name), cur.year, cur.imageURL)
   })


   parent.innerHTML = markup
}


export const renderReviewCont = anime => {
   console.log(anime)
   getDOM().addReviewPopup1.style.display = 'none'
   getDOM().addReviewPopup2.style.display = 'block'


   getDOM().reviewAnimeImage.src = anime.imageURL
   getDOM().reviewAnimeName.textContent = anime.name
   getDOM().reviewAnimeYear.textContent = anime.year
}


export const removeReviewCont = () => {
   resetReviewConts()
   removePopupCont(getDOM().addReviewPopup2)
}



const resetReviewConts = () => {
   getDOM().animesContAnimesLi.innerHTML = ''

   getDOM().reviewAnimeAboutInput.value = ''
   getDOM().reviewAnimeAboutInputDefault.checked
   getDOM().reviewAnimeReviewInput.value = ''
   document.querySelector('input[id="rating2"]').checked = true   
   getDOM().reviewAnimeImageInput.value = ''
   document.getElementById('file-image-3').classList.add("hidden");
   document.getElementById('notimage-3').classList.remove("hidden");
   document.getElementById('start-3').classList.remove("hidden");
   // document.getElementById('response-2').classList.add("hidden");
   document.getElementById("file-upload-form-3").reset();
}


const formatTitle = (title, maxLength = 20) => {
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