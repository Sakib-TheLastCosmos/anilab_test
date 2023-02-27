import { getMarkup } from "../markup"

export const renderLeftListItems = (category, reviews, parent) => {
   let markup = ''

   if (reviews && reviews.length > 0) {
      console.log(reviews)
      reviews.forEach(cur => {
         markup += getMarkup().yourReviewsListItem(cur.id, cur.animeInfo.name, cur.reviewInfo.imageURL)
      })
   } else {
      markup = getMarkup().noPostsLeftBarMsg(category)
      console.log(markup)
   }

   parent.innerHTML = markup
}


export const renderProfileBar = (profileBarInfo, parent) => {
   parent.children[1].textContent = profileBarInfo.name

   parent.children[0].children[0].src = profileBarInfo.profilePhoto
}


export const renderAdminInfos = (msg, parent) => {
   parent.textContent = msg
}

export const renderAdminProfile = (profile, parent) => {
   const imageElement = parent.children[0].children[0].children[0]
   imageElement.src = profile.profilePhoto
   imageElement.dataset.uid = profile.uid

   const nameElement = parent.children[1].children[0]
   nameElement.textContent = profile.name
   nameElement.dataset.uid = profile.uid
}

export const renderQuoteCont = (quote, parent) => {
   parent.children[0].children[0].children[0].textContent = quote.name
   parent.children[0].children[0].children[1].textContent = quote.anime

   parent.children[1].children[0].textContent = `"${quote.quote}"`
}


export const uploadPostPhoto = file => {
   var imageName = file.name;

   var isGood = (/\.(?=gif|jpg|png|jpeg)/gi).test(imageName);
   if (isGood) {
      document.getElementById('start-3').classList.add("hidden");
      // document.getElementById('response-2').classList.remove("hidden");
      document.getElementById('notimage-3').classList.add("hidden");
      // Thumbnail Preview
      document.getElementById('file-image-3').classList.remove("hidden");
      document.getElementById('file-image-3').src = URL.createObjectURL(file);
   }
   else {
      document.getElementById('file-image-3').classList.add("hidden");
      document.getElementById('notimage-3').classList.remove("hidden");
      document.getElementById('start-3').classList.remove("hidden");
      // document.getElementById('response-2').classList.add("hidden");
      document.getElementById("file-upload-form-3").reset();
   }
}