import { formatTitle } from "../config/base"
import { getMarkup } from "../markup"

export const toggleBtn = (category, btn1, btn2) => {
   if (category == 'add') {
      btn1.id = 'saved'

      btn1.children[0].children[0].setAttribute('href', '../icons/icons.svg#icon__bookmark-check')
      btn1.children[1].textContent = 'Saved'

      btn2.children[0].children[0].setAttribute('href', '../icons/icons.svg#icon__bookmark-remove')
      btn2.children[1].textContent = 'Unsave review'
   } else if (category == 'remove') {
      btn1.id = 'not-saved'

      btn1.children[0].children[0].setAttribute('href', '../icons/icons.svg#icon__bookmark-fill')
      btn1.children[1].textContent = 'Bookmark'

      btn2.children[0].children[0].setAttribute('href', '../icons/icons.svg#icon__bookmark')
      btn2.children[1].textContent = 'Save review'
   }
}
 


export const renderSavedPosts = (posts, conts) => {
   let markup = {
      today: '',
      thisMonth: '',
      earlier: ''
   }

   posts.today.forEach(cur => {
      markup.today += getMarkup().savedPostItems(cur, formatTitle(cur.animeInfo.name))
   })

   posts.thisMonth.forEach(cur => {
      markup.thisMonth += getMarkup().savedPostItems(cur, formatTitle(cur.animeInfo.name))
   })

   posts.earlier.forEach(cur => {
      markup.earlier += getMarkup().savedPostItems(cur, formatTitle(cur.animeInfo.name))
   })

   conts.today.innerHTML = markup.today
   conts.thisMonth.innerHTML = markup.thisMonth
   conts.earlier.innerHTML = markup.earlier


   if (markup.today == '') conts.today.parentElement.style.display = 'none'
   if (markup.thisMonth == '') conts.thisMonth.parentElement.style.display = 'none'
   if (markup.earlier == '') conts.earlier.parentElement.style.display = 'none'

}





export const renderSearchPosts = (posts, cont) => {
   cont.parentElement.style.display = 'block'
   let markup = ''

   posts.forEach(cur => {
      markup += getMarkup().savedPostItems(cur, formatTitle(cur.animeInfo.name))
   })

   cont.innerHTML = markup
}


export const clearSearchPosts = (cont) => {
   cont.innerHTML = ''
   cont.parentElement.style.display = 'none'
}