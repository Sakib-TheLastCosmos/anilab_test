import { getMarkup } from "../markup"

export const renderProfileSuggestions = (profiles, parent) => {
    let markup = ''

    profiles.forEach(cur => {
        markup += getMarkup().activePanelProfile(cur)
    })

    parent.innerHTML = markup
}