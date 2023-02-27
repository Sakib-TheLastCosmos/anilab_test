import { getMarkup } from "../markup"
import { formatTitle } from "../config/base"
import { getDOM } from "../DOM"

export const renderAnimeResult = (result, parent) => {
   getDOM().animesCont1.style.display = 'block'
   getDOM().animesCont2.style.display = 'none'

   getDOM().animeBackToResultBtn.style.display = 'none'

   let markup = ''

   if (result) {
      Array.from(result).forEach(cur => {
         markup += getMarkup().reviewAnimeSearchResults('anime-page__list-items', cur.id, formatTitle(cur.name), cur.year, cur.imageURL)
      })
   } else {
      markup = 'No result to display'
   }
   
   parent.innerHTML = markup
}


export const renderAnime = (anime, parent) => {
   getDOM().animesCont1.style.display = 'none'
   getDOM().animesCont2.style.display = 'block'


   getDOM().animeBackToResultBtn.style.display = 'block'


   const markup = getMarkup().animePageAnime(anime)

   parent.innerHTML = markup
   getDOM().animePageDesc.innerText = anime.descriptionShort 


   if (anime.description == anime.descriptionShort) {
      getDOM().animePageAnimeMain.style.alignItems = 'center'
   } else {
      getDOM().animePageDesc.insertAdjacentHTML('beforeend', getMarkup().seeMoreBtn('See more...'))
   }

   getDOM().animePageDescBlueLine.style.height = `${document.querySelector('.anime main').offsetHeight}px`
} 


export const seeMoreDescription = (fullDesc, parent, seeMoreBtnText) => {
   console.log(parent.textContent)
   if (parent.textContent != fullDesc) {
      parent.innerText = fullDesc
      getDOM().animePageDesc.insertAdjacentHTML('beforeend', getMarkup().seeMoreBtn(seeMoreBtnText))
   }

}


export const renderAnimeReviews = (reviews, parent) => {
   let markup = ''

   reviews.forEach(cur => {
      markup += getMarkup().savedPostItems(cur, formatTitle(cur.animeInfo.name))
   })

   parent.innerHTML = markup
}