import { getMarkup } from "../markup"

export const renderPeopleSearchResult = (result, parent) => {
   let markup = ''
   const people = result.people

   if (people.length > 0) {
      people.forEach(cur => {
         markup += getMarkup().peopleSearchResult(cur)
      })
   } else {
      markup += '<p>No result to display</p>'
   }

   parent.innerHTML = markup
}