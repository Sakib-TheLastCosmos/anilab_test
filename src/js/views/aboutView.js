import { getDOM } from "../DOM"
import { getMarkup } from "../markup"

export const renderAboutPage = (adminObj, parent) => {
   const markup = getMarkup().aboutCont(adminObj)

   parent.innerHTML = markup
   
   // getDOM().aboutMessage.inn = adminObj.about
}