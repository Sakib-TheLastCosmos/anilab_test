import { getMarkup } from "../markup"

export const renderNotifications = (notifications, parent) => {
    let markup = ''

    notifications.forEach(cur => {
        markup += getMarkup().notification(cur)
    })

    parent.innerHTML = markup
}

export const setNotificationsHeight = parent => {
    let totalHeight = 0
    Array.from(parent.children).forEach(cur => {
        totalHeight += cur.offsetHeight
    })

    parent.style.height = `${totalHeight - 20}px`
}

export const renderMoreNotifications = (notifications, parent, position) => {
    let markup = ''

    notifications.forEach(cur => {
        markup += getMarkup().notification(cur)
    })

    parent.insertAdjacentHTML(position, markup)
}