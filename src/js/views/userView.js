import { getDOM } from "../DOM"
import { getMarkup } from "../markup"


export const renderLoginConts = number => {
   const prevCont = number - 1
   const newCont = number
   document.querySelector(`.login__cont_popup-${prevCont}`).style.display = 'none'
   document.querySelector(`.login__cont_popup-${newCont}`).style.display = 'block'
}


export const renderLoginCont2 = (name, element) => {
   element.textContent = name
}


export const renderDropdownMenu = (category, items, dropdownCont) => {
   let markup = ''
   items.forEach(cur => {
      markup += getMarkup().livesInDropdownList(category, cur.id, cur.text, cur.imageURL)
   })

   dropdownCont.style.display = 'block'
   dropdownCont.children[0].innerHTML = markup
}


export const removeDropdownMenu = dropdownCont => {
   dropdownCont.style.display = 'none'
}


export const renderSelectedCont = (category, item, parent) => {
   category = category.split('_')
   let secondStringArr = Array.from(category[1])
   secondStringArr[0] = secondStringArr[0].toUpperCase()
   category[1] = secondStringArr.join('')
   category = category.join('')

   const markup = getMarkup().selectedCont(category, item.text, item.imageURL)
   parent.children[0].style.display = 'none'
   parent.children[1].style.display = 'none'

   parent.insertAdjacentHTML('beforeend', markup)
}

export const removeSelectedCont = (button) => {
   let category = button.parentElement.parentElement.dataset.category
   button.parentElement.parentElement.style.display = 'none'
   button.parentElement.parentElement.parentElement.children[0].style.display = 'block'
}  



export const uploadPhotoView = file => {
   var imageName = file.name;

   var isGood = (/\.(?=gif|jpg|png|jpeg)/gi).test(imageName);
   if (isGood) {
      document.getElementById('start').classList.add("hidden");
      // document.getElementById('response').classList.remove("hidden");
      document.getElementById('notimage').classList.add("hidden");
      // Thumbnail Preview
      document.getElementById('file-image').classList.remove("hidden");
      document.getElementById('file-image').src = URL.createObjectURL(file);
   }
   else {
      document.getElementById('file-image').classList.add("hidden");
      document.getElementById('notimage').classList.remove("hidden");
      document.getElementById('start').classList.remove("hidden");
      // document.getElementById('response').classList.add("hidden");
      document.getElementById("file-upload-form").reset();
   }
}


export const uploadCoverPhotoView = file => {
   var imageName = file.name;

   var isGood = (/\.(?=gif|jpg|png|jpeg)/gi).test(imageName);
   if (isGood) {
      document.getElementById('start-2').classList.add("hidden");
      // document.getElementById('response-2').classList.remove("hidden");
      document.getElementById('notimage-2').classList.add("hidden");
      // Thumbnail Preview
      document.getElementById('file-image-2').classList.remove("hidden");
      document.getElementById('file-image-2').src = URL.createObjectURL(file);
   }
   else {
      document.getElementById('file-image-2').classList.add("hidden");
      document.getElementById('notimage-2').classList.remove("hidden");
      document.getElementById('start-2').classList.remove("hidden");
      // document.getElementById('response-2').classList.add("hidden");
      document.getElementById("file-upload-form-2").reset();
   }
}


