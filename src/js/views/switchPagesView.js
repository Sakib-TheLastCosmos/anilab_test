export const changeWindow = (oldHash, name, parent, markup) => {
   const windows = ['index', 'friends', 'animes', 'saved', 'about', 'login']

   // Removing the HTML
   parent.innerHTML = ''

   // Removing old CSS
   const prevCSS = document.querySelector(`.${oldHash}_css`)
   if (prevCSS) {
      document.getElementsByTagName('head')[0].removeChild(prevCSS)   
   }

   // Add the CSS
   const newCSS = document.querySelector(`.${name}_css`)
   if (!newCSS) {
      var linkElement = document.createElement('link');

      linkElement.setAttribute('rel', 'stylesheet');
      linkElement.setAttribute('href', `css/${name}.css`);
      linkElement.setAttribute("class", `${name}_css`)
      
      document.getElementsByTagName('head')[0].insertBefore(linkElement, document.querySelector(".dark_mode_css"));    
   }

   // Adding the HTML
   parent.innerHTML = markup
   
}



export const setActive = (activeWindow, navItems) => {
   Array.from(navItems).forEach(cur => {
      if (cur.getAttribute('href') == activeWindow) {
         cur.setAttribute('class', 'active')
      } else {
         cur.setAttribute('class', '')
      }
   })
}


export const initHashes = () => {
   if (window.location.hash == '') {
      window.location.hash = 'index'
   }
}
 