import { DOM, getDOM, DOMStrings, getInput } from "./js/DOM";
import { markupPage, getMarkup } from "./js/markup";
import { changeWindow, setActive, initHashes } from "./js/views/switchPagesView";
import { renderLoginConts, renderLoginCont2, renderDropdownMenu } from "./js/views/userView";
import * as userView from "./js/views/userView";
import * as initView from "./js/views/InitView";
import * as profileView from "./js/views/profileView";
import * as peopleSearchView from "./js/views/peopleSearchView"
import * as animeView from "./js/views/animeView"
import * as feedView from "./js/views/feedView"
import * as postView from "./js/views/postView"
import * as savedView from "./js/views/savedView"
import * as profileSuggestionsView from "./js/views/profileSuggestionsView"
import * as notificationsView from "./js/views/notificationsView"

import User from "./js/models/User";
import UploadPost from './js/models/UploadPost'
import { onAuthStateChanged, getAuth } from "@firebase/auth";

import { getPlaces } from "./js/config/placesAPI";
import { getAnime, getAnimeByID } from "./js/config/animeAPI";
import { getCharacter } from "./js/config/characterAPI";
import { removeCreatePostCont, removeReviewCont, renderCreatePostCont, renderResultAnimes, renderReviewCont, resetReviewConts } from "./js/views/uploadPostView";
import { removeLoader, showLoader } from "./js/config/base";
import Init from "./js/models/Init";
import Profile from "./js/models/Profile";
import People from "./js/models/PeopleSearch";
import Anime from "./js/models/Anime";
import About from "./js/models/About";
import { renderAboutPage } from "./js/views/aboutView";
import Feed from "./js/models/Feed";
import Post from "./js/models/Post";
import Saved from "./js/models/Saved";
import Preference from "./js/models/Preference";
import { collection, doc, getDocs, getDoc, onSnapshot, query, where, updateDoc } from "firebase/firestore";
import { db } from "./js/config/firebase";
import ProfileSuggestions from "./js/models/ProfileSuggestions";
import Notification from "./js/models/Notification";
import { getRandomQuote } from "./js/config/animeQuoteAPI";



const data = {
   window: '',
   prevWindow: '',
   initiated: {}
}



// CHANGE WINDOW
const updateDataWindow = (newWindow) => {
   // data.prevWindow = data.window
   if (newWindow && (window.location.hash.slice(1, location.hash.length) != newWindow) && !newWindow.includes('profile_')) {
      window.location.hash = newWindow
   }
   data.window = window.location.hash.slice(1, location.hash.length)
}



DOM.navBtn.forEach(cur => {
   cur.addEventListener('click', () => {
      window.location.hash = cur.getAttribute("href")
   })
})

const changeWindowCtrl = (newWindow) => {
   let prevWindow = data.prevWindow

   if (newWindow.includes('_')) {
      if (newWindow.includes('profile')) {
         console.log('asfasf', prevWindow, data.prevWindow)

         changeWindow(data.prevWindow, 'profile', DOM.middleBottomCont, markupPage[`profile`])
      }
   } else {
      if (prevWindow.includes('_')) {
         if (prevWindow.includes('profile')) {
            console.log('prev incle', prevWindow)
            updateDataWindow(newWindow)
            // console.log('previous ', prevWindow)
            changeWindow('profile', newWindow, DOM.middleBottomCont, markupPage[`${newWindow}`])      
         }
      } else {
         updateDataWindow(newWindow)
         // console.log('previous ', prevWindow)
         changeWindow(prevWindow, newWindow, DOM.middleBottomCont, markupPage[`${newWindow}`])   
      }
   }
   setActive(data.window, DOM.navBtn)
}


const hashCtrl = async (e) => {
   const hash = window.location.hash.slice(1, window.location.hash.length)
   console.log(e.oldURL)
   e.preventDefault()
   if (data.window != data.prevWindow) {
      

      data.window = window.location.hash.slice(1, window.location.hash.length)
      data.prevWindow = e.oldURL.slice(e.oldURL.indexOf('#') + 1, e.oldURL.length)   


      if (!data.window.includes('&post_') && !data.prevWindow.includes('&post_')) changeWindowCtrl(data.window)
   
      switch (data.window) {
         case 'index':
            indexCtrl()
            break
            
         case 'profile':
            profileCtrl(data.user.profile.uid)
            break
         
         case 'friends':
            peopleCtrl()
            break
   
         case 'animes':
            animeCtrl()
            break

         case 'saved':
            savedCtrl()
            break
         
         case 'about':
            aboutCtrl()
            break
   
         case 'login':
            setupLoginEvents()
            break
         
         default:
            console.log('hash', hash)
            if (hash.includes('_') && hash.includes('profile') && !hash.includes('&post_') &&!data.prevWindow.includes('&post_')) {
               const uid = hash.slice(8, hash.length)
               console.log(uid)
               changeWindowCtrl(hash)
               await profileCtrl(uid)
            } 

            if (hash.includes('&post_')) {
               console.log('a')
               let id = hash.slice(hash.indexOf('&post_') + 1, hash.length)
               id = id.slice(id.indexOf('_') + 1, id.length)
               console.log(id)
      
               await postPopupCtrl(id, data.prevWindow)
            }
      } 
   } else if (hash.includes('&post_')) {
      let id = hash.slice(hash.indexOf('&post_') + 1, hash.length)
      id = id.slice(id.indexOf('_') + 1, id.length)
      console.log(id)

      await postPopupCtrl(id, data.prevWindow)
   }
}


// PROFILE PAGE
const profileCtrl = async uid => {
   try {
      data.profile = new Profile(uid)
      await data.profile.getProfile()
   
      // Rendering the profile + functionality
      profileView.renderProfilePage(data.profile.isOwnProfile(data.user.profile.uid), data.profile.profile, getDOM().profileCont)
      animeClickCtrl()
   
      // Getting the posts and rendering them
      await data.profile.getPosts(data.user.profile.uid, 4)
      profileView.renderPosts(data.window, data.profile.posts, getDOM().profilePostsCont)
      // postDefaultCtrlInit()
   
      // Post scroll-load event
      let scrolled = false
      console.log(getDOM().profilePostsCont)
      if (!getDOM().profilePostsContDivRight.dataset.listener) {
         getDOM().profilePostsContDivRight.addEventListener('scroll', async () => {
            try {
               if (!scrolled && data.window.includes('profile')) {
                  scrolled = true 
         
                  const loadedHeight = getDOM().profilePostsCont.scrollTop + getDOM().profilePostsCont.offsetHeight
         
                  if (loadedHeight/getDOM().profilePostsCont.scrollHeight > 0.8) {
                     const oldLength = data.profile.posts.length
                     const posts = await data.profile.getPosts(data.user.profile.uid, 4)
                     profileView.renderMorePosts(data.window, posts, getDOM().profilePostsCont)
            
                     postDefaultCtrlInit()
                  }
         
                  scrolled = false
               }   
            } catch (e) {
               console.log(e)
            }
         })
         getDOM().profilePostsContDivRight.dataset.listener = true 
      }
   } catch (e) {
      console.log(e)
   }
   // Creating new profile object

}


// PEOPLE PAGE
const peopleCtrl = async () => {
   // Searching event 
   if (!getDOM().searchPeopleForm.dataset.listener) {
      getDOM().searchPeopleForm.addEventListener('submit', async e => {
         e.preventDefault()
   
         if (getDOM().searchPeopleInput.value !== '') {
            // creating the new people object
            data.people = new People(getDOM().searchPeopleInput.value)
            await data.people.getPeople()
   
            // rendering people list + functionality
            peopleSearchView.renderPeopleSearchResult(data.people, getDOM().searchPeopleResultCont)
            peopleEventInit()
         } else {
            alert('Please input something to search for')
         }   
      })

      getDOM().searchPeopleForm.dataset.listener = true
   }


   // Profile click event 
   const peopleEventInit = () => {
      Array.from(getDOM().searchPeopleResultListItem).forEach(cur => {
         if (!cur.dataset.listener) {
            cur.addEventListener('click', e => {
               const uid = cur.dataset.uid
               data.prevWindow = data.window
   
               data.window = `profile_${uid}`
               window.location.hash = `profile_${uid}`
            })

            cur.dataset.listener = true
         }
      })
   }

   data.initiated.friends = true
}


// ANIME PAGE
const animeCtrl = async (isManual = false) => {
   // isManual is used to determine whether the animeCtrl is being called from clicking an anime from the search result or manually from somewhere else 

   // Searching event
   if (!getDOM().animePageForm.dataset.listener) {
      getDOM().animePageForm.addEventListener('submit', async e => {
         e.preventDefault()
   
         // getting the result and creating object
         const query = getDOM().animePageInput.value
         data.anime = new Anime (query)
         await data.anime.getAnimes()
   
         // rendering the anime + functionality
         animeView.renderAnimeResult(data.anime.searchResultAnimes, getDOM().animePageSearchResultCont)
         animeClickEventsCtrl()
      })

      getDOM().animePageForm.dataset.listener = true
   }


   // Anime click event
   const animeClickEventsCtrl = async e => {
      if (getDOM().animePageSearchResultListItems) {

         getDOM().animePageSearchResultListItems.forEach(cur => {
            if (!cur.dataset.listener) {
               cur.addEventListener('click', async e => {
               
                  // Creating anime object
                  data.anime.selectID(cur.dataset.id)
                  await data.anime.getAnime()
   
                  // Rendering the anime + functionality
                  animeView.renderAnime(data.anime.anime, getDOM().animePageAnimeCont)
                  data.anime.anime.isFullDescEnabled = false
                  seeMoreDescriptionEvent()
                  backToResultBtnEvent()
   
                  // Getting reviews for the anime, rendering
                  await data.anime.getAnimeReviews(data.anime.anime.name, 9)
                  animeView.renderAnimeReviews(data.anime.posts, getDOM().animePageReviewsCont)
                  
   
                  // FUNCTIONALITY
                  postDefaultCtrlInit()
   
                  // Review click event
                  getDOM().review.forEach(cur => {
                     if (!cur.dataset.listener) {
                        cur.addEventListener('click', e => {            
                           if (!e.target.matches(DOMStrings.profileClick) && !e.target.matches(DOMStrings.animeClick) && !e.target.matches(DOMStrings.profileClickAll) && !e.target.matches(DOMStrings.animeClickAll)) {
                              console.log('hashshhh')
                              window.location.hash = `#${data.window}&post_${cur.dataset.id}`
                           }
                        })

                        cur.dataset.listener = true
                     }
                  })
   
                  // Review scroll-load event
                  getDOM().animesCont2.addEventListener('scroll', async () => {
                     if (!getDOM().animesCont2.dataset.listener) {
                        if (getDOM().animesCont2.scrollHeight == (getDOM().savedPagedSavedCont.scrollTop + getDOM().animesCont2.offsetHeight)) {
                           await data.anime.getAnimeReviews(data.anime.anime.name, 9, data.anime.posts[data.anime.posts.length - 1])
                           animeView.renderAnimeReviews(data.anime.posts, getDOM().animePageReviewsCont)
                           
                           postDefaultCtrlInit()      
                        }

                        getDOM().animesCont2.dataset.listener = true
                     }
                  })
               })

               cur.dataset.listener = true
            }
         })
      }
   }


   // FUNCTIONALITY: See more
   const seeMoreDescriptionEvent = () => {
      if (getDOM().seeMoreDescBtn) {
         if (!getDOM().seeMoreDescBtn.dataset.listener) {
            getDOM().seeMoreDescBtn.addEventListener('click', () => {
               let isFullDescEnabled = data.anime.anime.isFullDescEnabled
               if (isFullDescEnabled) {
                  animeView.seeMoreDescription(data.anime.anime.descriptionShort, getDOM().animePageDesc, 'See more...')
                  data.anime.anime.isFullDescEnabled = false
               } else {
                  animeView.seeMoreDescription(data.anime.anime.description, getDOM().animePageDesc, 'See less')
                  data.anime.anime.isFullDescEnabled = true
               }
               seeMoreDescriptionEvent()
            })

            getDOM().seeMoreDescBtn.dataset.listener = true
         }
      }
   }


   // FUNCTIONALITY: Back button
   const backToResultBtnEvent = () => {
      if (!getDOM().animeBackToResultBtn.dataset.listener) {
         getDOM().animeBackToResultBtn.addEventListener('click', () => {
            animeView.renderAnimeResult(data.anime.searchResultAnimes, getDOM().animePageSearchResultCont)
            animeClickEventsCtrl()
         })

         getDOM().animeBackToResultBtn.dataset.listener = true
      }
   }


   // Functionalities if the function was called manually 
   if (isManual) {
      data.anime.anime.isFullDescEnabled = false
      seeMoreDescriptionEvent()
      backToResultBtnEvent()
   }


   data.initiated.animes = true
}


// ABOUT PAGE
const aboutCtrl = async () => {
   if (!data.about) {
      data.about = new About ()
      await data.about.getInfo()   
   } 

   renderAboutPage(data.about, getDOM().aboutCont)

   defaultCtrl()

   data.initiated.about = true 
}




// INDEX PAGE
const indexCtrl = async () => {
   try {
      if (!data.feed) data.feed = new Feed(data.user.profile.uid)
      // Functionalities of the posts


      

      // Profile suggestions
      const initProfileSuggestions = async () => {
         if (!data.feed || !data.feed.profiles) {
            data.feed.profiles = await new ProfileSuggestions(data.user.profile.uid).getProfiles()
         }
         profileSuggestionsView.renderProfileSuggestions(data.feed.profiles, getDOM().activePanelUl)
         
      }

      initProfileSuggestions()
   

      // Feed
      const savedAndLikesInit = async (posts) => {
         try {
            await data.feed.getLikesAndSaved(posts)

            for (const post of posts) {
               feedView.updateLikesAndSaved(post, getDOM().postSavedButtonMain(post.id), getDOM().postSavedButtonDropdown(post.id), getDOM().postLikeButton(post.id))
            }
         } catch (e) {
            console.log(e)
         }
      }


      const postsInit = async () => {
         if (!data.feed.posts) {
            const posts = await data.feed.getPostsTT(4)
         }
         // for (const post of data.feed.posts) {
         //    post.saved = await new Saved (data.user.profile.uid).isSaved(post.id)
         //    post.liked = await new Post (post.id).isLiked(data.user.profile.uid)
         // }
         feedView.renderPosts(data.window, data.feed.posts, getDOM().indexPostsCont)
         await savedAndLikesInit(data.feed.posts)

         postDefaultCtrlInit()  
      }

      postsInit()




      // Scroll event
      const loadMorePosts = async () => {
         await data.feed.updateSeen()

         const feedPostsLastIndex = data.feed.posts.length - 1
         const newPosts = await data.feed.getPostsTT(4)

         if (newPosts.length > 0) {
            feedView.renderMorePosts(data.window, newPosts, getDOM().indexPostsCont)
            await savedAndLikesInit(data.feed.posts.slice(feedPostsLastIndex, feedPostsLastIndex + 4))

            postDefaultCtrlInit()
         }  
      }


      // Creating "create post" panel with author pfp
      feedView.renderFeedCreatePostPanel(data.user.profile.profile.profilePhoto, data.user.profile.uid, getDOM().indexCreatePostCont)

      postDefaultCtrlInit()


      // Events
      if (!getDOM().middleBottomCont.dataset.listener) {
         let scrolled = false
         getDOM().middleBottomCont.addEventListener('scroll', async () => {
            if (!scrolled && data.window == 'index') {
               scrolled = true
               const loadedHeight = getDOM().middleBottomCont.scrollTop + getDOM().middleBottomCont.offsetHeight
               if (loadedHeight/getDOM().middleBottomCont.scrollHeight > 0.8) {
                  await loadMorePosts()
               }

               scrolled = false
            }
         })

         getDOM().middleBottomCont.dataset.listener = true
      }

      

      // Adding event listener to the add post buttons
      Array.from(getDOM().createPostClick).forEach(cur => {
         if (!cur.dataset.listener) {
            cur.addEventListener('click', e => {
               e.preventDefault()
               renderCreatePostCont()
            })

            cur.dataset.listener = true
         }
      })

      // Navigation bar events
      getDOM().changeWindowBtn.forEach(cur => {
         if (!cur.dataset.listener) {
            cur.addEventListener('click', () => {
               window.location.hash = cur.dataset.window
            })

            cur.dataset.listener = true
         }
      })   
   } catch (e) {
      console.log(e)
   }
}


// SAVED PAGE
const savedCtrl = async () => {
   // Click to save event
   const setupPostClickEvents = () => {
      getDOM().review.forEach(cur => {
         if (!cur.dataset.listener) {
            cur.addEventListener('click', e => {   
               console.log('out')
               if (!e.target.matches(DOMStrings.profileClick) && !e.target.matches(DOMStrings.animeClick) && !e.target.matches(DOMStrings.profileClickAll) && !e.target.matches(DOMStrings.animeClickAll)) {
                  console.log('in')
                  window.location.hash = `#${data.window}&post_${cur.dataset.id}`
               }
            })

            cur.dataset.listener = true
         }
      })
   }

   // Search for a specific saved post event
   const searchEventsInit = () => {
      getDOM().savedSearchInput.addEventListener('change', async e => {
         // Getting and rendering the search result
         await data.saved.getSearchedSaved(e.srcElement.value)
         savedView.renderSearchPosts(data.saved.search.result, getDOM().savedSearchCont)


         // Saved reviews click to view event
         Array.from(getDOM().savedSearchCont.children).forEach(cur => {
            if (!cur.dataset.listener) {
               cur.addEventListener('click', e => {
                  if (!e.target.matches(DOMStrings.profileClick) && !e.target.matches(DOMStrings.animeClick) && !e.target.matches(DOMStrings.profileClickAll) && !e.target.matches(DOMStrings.animeClickAll)) {
                     window.location.hash = `#${data.window}&post_${cur.dataset.id}`
                  }
               })

               cur.dataset.listener = true
            }
         })
         // Functionalities
         defaultCtrl()
      }) 

      
      // Clearing the input field after a search has been made
      getDOM().savedSearchInput.addEventListener('input', e => {
         if (e.srcElement.value == '') {
            savedView.clearSearchPosts(getDOM().savedSearchCont)
         }
      }) 
   }




   // Checking saved posts
   if (!data.saved) {
      data.saved = new Saved(data.user.profile.uid)
   }

   if (!data.saved.savedPosts) {
      await data.saved.getSaved(9)
   }
   // Rendering the saved posts
   savedView.renderSavedPosts(data.saved.savedPosts, getDOM().savedPostsCont)

   
   // Scroll to load event
   if (!getDOM().savedPagedSavedCont.dataset.listener) {
      getDOM().savedPagedSavedCont.addEventListener('scroll', async () => {
         if (getDOM().savedPagedSavedCont.scrollHeight == (getDOM().savedPagedSavedCont.scrollTop + getDOM().savedPagedSavedCont.offsetHeight)) {
            // Getting and rendering posts
            await data.saved.getSaved(9, data.saved.savedPosts.allPosts[data.saved.savedPosts.allPosts.length - 1])
            savedView.renderSavedPosts(data.saved.savedPosts, getDOM().savedPostsCont)
            
            // Functionalities
            defaultCtrl()
            setupPostClickEvents()
         }
      })

      getDOM().savedPagedSavedCont.dataset.listener = true
   }

   
   // Functionalities
   defaultCtrl()
   setupPostClickEvents()
   searchEventsInit()
}



// FULL POST VIEW
const viewFullPostInit = () => {
   // Click to view postr event setting
   // Array.from(getDOM().postClick).forEach(cur => {
   //    cur.addEventListener('click', async () => {
   //       // Getting the post
   //       data.post = new Post (cur.dataset.id, data.user.profile.uid)
   //       data.post.getPostFromFeed(data.feed.posts)

   //       // Rendering the post
   //       postView.renderFullPostView(data.post.post)

   //       // Functionalities
   //       removeFullPostCont()
   //       defaultCtrl()
   //       savePostCtrl()
   //    })
   // })


   // Remove the full post cont funtion
   const removeFullPostCont = () => {
      if (!getDOM().fullPostViewParentCont.dataset.listener) {
         getDOM().fullPostViewParentCont.addEventListener('click', e => {
            if (!e.target.matches(DOMStrings.fullPostContAll) && !e.target.matches(DOMStrings.fullPostCont)) {
               postView.removeFullPostView()
            }
         })

         getDOM().fullPostViewParentCont.dataset.listener = true
      }
   }

   removeFullPostCont()
}


// Click to popup post function
const postPopupCtrl = async (id, onWindow) => {
   // Removing the full post view funtion
   const removeFullPostCont = () => {
      if (!getDOM().fullPostViewParentCont.dataset.listener) {
         getDOM().fullPostViewParentCont.addEventListener('click', e => {
            if (!e.target.matches(DOMStrings.fullPostContAll) && !e.target.matches(DOMStrings.fullPostCont)) {
               postView.removeFullPostView()
               window.location.hash = data.prevWindow
            }
         })

         getDOM().fullPostViewParentCont.dataset.listener = true
      }
   }



   // Getting the post
   data.post = new Post (id, data.user.profile.uid)
   showLoader(DOM.wrapper)
   await data.post.getPost()

   // Rendering the post
   removeLoader(DOM.wrapper)
   postView.renderFullPostView(data.post.post)

   // Functionalities
   savePostCtrl()
   removeFullPostCont()
}


// Anime click to view function
const animeClickCtrl = () => {
   // Setting event listener
   Array.from(getDOM().animeClick).forEach(cur => {
      if (!cur.dataset.listener) {
         cur.addEventListener('click', async () => {
            // Changing the window
            window.location.hash = 'animes'
   
            // Getting the anime
            data.anime = new Anime ()
            data.anime.selectID(cur.dataset.id)
            await data.anime.getAnime()
   
            // Rendering the anime
            animeView.renderAnimeResult(data.anime.searchResultAnimes, getDOM().animePageSearchResultCont)
            animeView.renderAnime(data.anime.anime, getDOM().animePageAnimeCont)
   
            // Getting anime reviews and rendering them
            await data.anime.getAnimeReviews(data.anime.anime.name, 9)
            animeView.renderAnimeReviews(data.anime.posts, getDOM().animePageReviewsCont)
            
            // Functionalities
            postDefaultCtrlInit()
            // Click to view reviews functionality
            getDOM().review.forEach(cur => {
               cur.addEventListener('click', e => {      
                  if (!e.target.matches(DOMStrings.profileClick) && !e.target.matches(DOMStrings.animeClick) && !e.target.matches(DOMStrings.profileClickAll) && !e.target.matches(DOMStrings.animeClickAll)) {
                     window.location.hash = `#${data.window}&post_${cur.dataset.id}`
                  }
               })
            })
   
            // Calling the anime control function (manually)
            animeCtrl(true)
         })

         cur.dataset.listener = true
      }
   })
}



// POST EVENTS
// Saving a post
const savePostCtrl = () => {
   Array.from(getDOM().saveAnimeBtn).forEach(cur => {
      console.log('a')
      let clicked = false
      // Setting event listener
      if (!cur.dataset.listener) {
         cur.addEventListener('click', async () => {
            if (!clicked) {
               clicked = true
               // Creating saved object
               if (!data.saved) {
                  data.saved = new Saved (data.user.profile.uid)
               }
               // Check if it is saved or not
               const isSaved = await data.saved.isSaved(cur.dataset.id)
   
               const savedPost = data.feed.posts.find(el => el.id == cur.dataset.id)
   
               // Toggling save/unsave and updating everything
               if (isSaved) {
                  await data.saved.removePost(cur.dataset.id)
                  savedView.toggleBtn('remove', getDOM().postSavedButtonMain(cur.dataset.id), getDOM().postSavedButtonDropdown(cur.dataset.id))
                  savedPost.saved = false
               } else {
                  await data.saved.addPost(cur.dataset.id)
                  savedView.toggleBtn('add', getDOM().postSavedButtonMain(cur.dataset.id), getDOM().postSavedButtonDropdown(cur.dataset.id))  
                  savedPost.saved = true 
               }
               
               clicked = false
            }
         })
         
         cur.dataset.listener = true
      }
   })
}

// Liking a post
const likePostCtrl = () => {
   let clicked = false
   // Setting event listener
   getDOM().loveBtn.forEach(cur => {
      if (!clicked) {
         clicked = true
         // Check if the listener doesn't exist yet
         if (!cur.getAttribute('likeEventListener') ) {
            cur.addEventListener('click', async () => {
               // Create the object and like the post
               data.post = new Post (cur.dataset.id, data.user.profile.uid)
               await data.post.like(data.user.profile.uid)

               const likedPost = data.feed.posts.find(el => el.id == cur.dataset.id)

         
               // Toggling like buttons
               if (data.post.liked) {
                  postView.toggleLikeButton(true, cur)
                  likedPost.likes ++
                  likedPost.liked = true 

                  await new Notification(data.user.profile.uid, data.user.profile.profile.fullname).send(cur.dataset.id)
               } else {
                  postView.toggleLikeButton(false, cur)
                  likedPost.likes --
                  likedPost.liked = false 
               }
               
               // Updating total likes
               await data.post.getTotalLikes()
               postView.updateLikes(data.post.totalLikes, cur)
            }) 
            // Setting the attribute of the HTML element that likeEventListener has been added to the element
            cur.setAttribute('likeEventListener', true)
         }
         clicked = false
      }

   })   
}


// Default Post Functionalities all in one
const postDefaultCtrlInit = () => {
   defaultCtrl()
   // viewFullPostInit()
   animeClickCtrl()   
   savePostCtrl()
   likePostCtrl()
}






// LIVE UPDATES





// SIGNING IN 
const signIn = async () => {
   await data.user.signIn()
}

// Initiating the user function
const userInit = async () => {
   data.user = new User()
   data.user.profile = {}
   await data.user.init()
}


// Events for Login process
const setupLoginEvents = async () => {
   // Create "preference" object in cloud if it's not created yet
   if (!data.user.preference) data.user.preference = new Preference(data.user.profile.uid)

   // Sign in event
   getDOM().signInBtn.addEventListener('click', async () => {
      try {
         await signIn()
      } catch (e) {
         console.log(e)
      }
   })   


   // ADDING MORE INFOS
   // DROPDOWN
   // Lives in
   getDOM().livesInInput.addEventListener('input', async e => {
      // Getting input data and rendering results accordingly
      const res = await getPlaces(getDOM().livesInInput.value)
      renderDropdownMenu(e.srcElement.id, res, getDOM().livesInDropdown)

      // Click to select event for the dropdown list items
      Array.from(getDOM().dropdownListItems).forEach(cur => {
         cur.addEventListener('click', () => {
            selectListItemsCtrl(cur)
         })
      })

      // Removing the dropdown menu
      document.addEventListener('click', e => {
         if (!e.target.matches(DOMStrings.livesInDropdownAll)) {
            userView.removeDropdownMenu(getDOM().livesInDropdown)
         }
      })
   })


   // Favorite Animes
   Array.from(getDOM().favAnime).forEach(cur => {
      cur.addEventListener('input', async e => {
         // Getting input data and rendering results accordingly
         const res = await getAnime(e.srcElement.value)
         const dropdownMenu = e.target.parentElement.children[1]
         renderDropdownMenu(e.srcElement.id, res, dropdownMenu)

         // Click to select event for the dropdown list items
         Array.from(getDOM().dropdownListItems).forEach(async cur => {
            cur.addEventListener('click', () => {
               selectListItemsCtrl(cur)
            })
         })
   
         // Removing the dropdown menu
         document.addEventListener('click', e => {
            if (!e.target.matches(e.target.parentElement.className[0]) && !e.target.matches(`#${dropdownMenu.id} *`)) {
               userView.removeDropdownMenu(dropdownMenu)
            }
         })
      })
   })


   // Favorite Character
   getDOM().dreamChar.addEventListener('input', async e => {
      let query = e.srcElement.value

      // Setting timeout in loading the dropdown menu with input result so the API does not overload
      setTimeout(async () => {
         // Checking if the value has changed or not
         if (e.srcElement.value === query) {
            // Getting input data and rendering results accordingly
            const res = await getCharacter(e.srcElement.value)
            renderDropdownMenu(e.srcElement.id, res, getDOM().dreamCharDropdown)

            // Click to select event for the dropdown list items
            Array.from(getDOM().dropdownListItems).forEach(cur => {
               cur.addEventListener('click', () => {
                  selectListItemsCtrl(cur)
               })
            })      
         }
      }, 1000)

      // Removing the dropdown menu
      document.addEventListener('click', e => {
         if (!e.target.matches(DOMStrings.dreamCharDropdownAll) && !e.target.matches(DOMStrings.selectedContAll)) {
            userView.removeDropdownMenu(getDOM().dreamCharDropdown)
         }
      })
   })


   // SELECTION
   const selectListItemsCtrl = e => {
      const category = e.dataset.category

      let item = {}
      let cont = document.querySelector(`.${category}_dropdown_cont`);

      // Getting all the data
      switch (category) {
         case 'lives_in':
            item = {
               text: e.children[1].textContent,
               id: e.dataset.id
            }
            data.user.profile.livesIn = item
            break

         case 'fav_anime_1':
            item = {
               imageURL: e.children[0].children[0].src,
               text: e.children[1].textContent,
               id: e.dataset.id
            }
            data.user.profile.favAnime1 = item
            break

         case 'fav_anime_2':
            item = {
               imageURL: e.children[0].children[0].src,
               text: e.children[1].textContent,
               id: e.dataset.id
            }
            data.user.profile.favAnime2 = item               
            break

         case 'fav_anime_3':
            item = {
               imageURL: e.children[0].children[0].src,
               text: e.children[1].textContent,
               id: e.dataset.id
            } 
            data.user.profile.favAnime3 = item              
            break

         case 'dream_char':
            item = {
               imageURL: e.children[0].children[0].src,
               text: e.children[1].textContent
            }
            data.user.profile.dreamChar = item               
            break
      }

      // Rendering the selected items in place of the input field
      userView.renderSelectedCont(category, item, cont)

      // Removing/Deleting selected data
      removeSelectedContsEventsCtrl()
   }

   // Deleting selected data function
   const removeSelectedContsEventsCtrl = () => {
      Array.from(getDOM().removeSelectedContBtn).forEach(cur => {
         cur.addEventListener('click', evt => {
            evt.preventDefault()
            // Removing from the UI
            userView.removeSelectedCont(cur)

            // Removing from data
            data.user.profile[cur.parentElement.parentElement.dataset.category] = undefined
         })
      })
   }


   // Next page from page 2
   Array.from(getDOM().loginNextBtn2).forEach(cur => {
      cur.addEventListener('click', e => {
         e.preventDefault()
         const profile = data.user.profile

         // Checking if all data are filled up
         if (profile.favAnime1 && profile.favAnime2 && profile.favAnime3 && profile.dreamChar && profile.livesIn && (getInput().bio !== '')) {
            // Updating the profile with the given data
            data.user.updateProfile('bio', getInput().bio)
            data.user.updateProfile('livesIn', profile.livesIn)
            data.user.updateProfile('favAnimes', [profile.favAnime1, profile.favAnime2, profile.favAnime3])
            data.user.updateProfile('dreamChar', profile.dreamChar)

            // Rendering next login cont
            renderLoginConts(2)
         } 
      })
   })


   // Next page from page 3
   Array.from(getDOM().loginNextBtn3).forEach(cur => {
      cur.addEventListener('click', e => {
         const obj = {
            amount: cur.dataset.amount,
            header: cur.children[0].textContent,
            text: cur.children[1].textContent
         }

         data.user.updateProfile('totalAnimes', obj)
         renderLoginConts(3)
      })
   })


   // Next page from page 4
   Array.from(getDOM().loginNextBtn4).forEach(cur => {
      cur.addEventListener('click', e => {
         const obj = {
            header: cur.children[0].textContent,
            text: cur.children[1].textContent,
         }

         data.user.updateProfile('subOrDub', obj)
         renderLoginConts(4)
      })
   })
   

   // Next page from page 5
   Array.from(getDOM().loginNextBtn5).forEach(cur => {
      cur.addEventListener('click', e => {
         const obj = {
            header: cur.children[0].textContent,
            text: cur.children[1].textContent,
         }

         data.user.updateProfile('animeOrManga', obj)
         renderLoginConts(5)
      })
   })


   // Last page (uploading profile photo) (copied)
   const uploadProfilePhoto = async e => {
      if (window.File && window.FileList && window.FileReader) {
         var files = e.target.files || e.dataTransfer.files;
         userView.uploadPhotoView(files[0])

         // Uploading the photo
         await data.user.uploadProfilePhoto(files[0])

         // Rendering the next cont/[age]
         renderLoginConts(6)
       } else {
         document.getElementById('file-drag').style.display = 'none';
       }
   }
   getDOM().profilePhotoInput.addEventListener('change', uploadProfilePhoto)


   // Cover Photo
   getDOM().coverPhotoInput.addEventListener('change', async e => {
      // Removing profile photo upload listener from the previous page
      getDOM().profilePhotoInput.removeEventListener('change', uploadProfilePhoto)

      if (window.File && window.FileList && window.FileReader) {
         var files = e.target.files || e.dataTransfer.files;
         userView.uploadCoverPhotoView(files[0])

         // Uploading the cover photo
         await data.user.uploadCoverPhoto(files[0])
         window.addEventListener('hashchange', hashCtrl)
         changeWindowCtrl('index')

         // Initiating all events as the profile is now COMPLETE
         await initEvents(data.user.profile.uid)
       } else {
         document.getElementById('file-drag-2').style.display = 'none';
       }
   })
}







// INIT EVENTS
const initEvents = async uid => {
   // MODE
   const modeEventsInit = async () => {
      // Getting the mode set by the user
      let mode = await data.init.getMode()
   
      // Setting a new mode - function
      const setMode = mode => {
         // If the mode was dark, switching to light mode
         if (mode === "dark") {
            DOM.modeIcon.setAttribute("href", DOMStrings.darkModeSVGHref)
   
            /* create the link element */
            var linkElement = document.createElement('link');
   
            /* add attributes */
            linkElement.setAttribute('rel', 'stylesheet');
            linkElement.setAttribute('href', 'css/index.dark.css');
            linkElement.setAttribute("class", "dark_mode_css")
   
            /* attach to the document head */
            document.getElementsByTagName('head')[0].appendChild(linkElement);

         } else if (mode === "light") { // If the mode was light, switching to dark
            DOM.modeIcon.setAttribute("href", DOMStrings.lightModeSVGHref)
   
            // Removing dark mode css
            let darkModeCSS = document.querySelector(".dark_mode_css")
            if (darkModeCSS) {
               document.getElementsByTagName('head')[0].removeChild(darkModeCSS)
            }
         }
      }
      setMode(mode)
   
      // Toggling mode event
      DOM.mode.addEventListener("click", async () => {
         if (mode === 'dark') {
            mode = 'light'
         } else if (mode == 'light') {
            mode = 'dark'
         }
         setMode(mode)
         await data.user.updateMode(mode)
      })
   
   }
   
   // Rendering profile bar
   const profileBarInit = async () => {
      const profileBarInfo = await data.init.getProfileBarInfo()
      initView.renderProfileBar(profileBarInfo, getDOM().profileBar)
   }
   
   // Rendering welcome message 
   const welcomeMsgInit = async () => {
      const msg = await data.init.getWelcomeMsg()
      initView.renderAdminInfos(data.init.welcomeMsg, getDOM().welcomeMsgCont)
   }
   
   // Rendering admin message
   const adminMsgInit = async () => {
      const msg = await data.init.getAdminMsg()

      initView.renderAdminInfos(data.init.adminMsg, getDOM().adminMsgCont)
      initView.renderAdminProfile(data.init.adminProfile, getDOM().adminProfileCont)
   }
   
   // Rendering quote of the day (quote from API)
   const quoteInit = async () => {
      await data.init.getQuote()
      initView.renderQuoteCont(data.init.quote, getDOM().quoteCont)
   }
   
   // Sign out button functionality (event)
   const signOutInit = async () => {
      getDOM().signOutBtn.addEventListener('click', async () => {
         await data.user.signOut()
      })
   }

   // Rendering reviews
   const reviewsInit = async () => {
      await data.init.getYourReviews()
      initView.renderLeftListItems('postsBig', data.init.yourPosts, getDOM().yourReviewsCont)

      // Functionality
      postClickLoadCtrl()
   }

   // Rendering saved posts
   const savedPostsInit = async () => {
      await data.init.getSavedPosts()
      initView.renderLeftListItems('savedPosts', data.init.savedPosts, getDOM().savedReviewsCont) 
      
      // Functionality
      postClickLoadCtrl()
   }

   // Loading any post event function
   const postClickLoadCtrl = () => {
      Array.from(getDOM().postClickLoad).forEach(cur => {
         if (!cur.dataset.listener) {
            cur.addEventListener('click', async () => {
               window.location.hash = `#${data.window}&post_${cur.dataset.id}`
            })

            cur.dataset.listener = true
         }
      })
   }

   // Creating a post event
   const postReviewEventInit = () => {
      if (!getDOM().postReviewBtn.getAttribute('eventListener')) {
         getDOM().postReviewBtn.addEventListener('click', async () => {
            // Data
            const obj = {
               rating: getDOM().reviewAnimeRatingInput.value,
               about: getDOM().reviewAnimeAboutInput.value,
               review: getDOM().reviewAnimeReviewInput.value,
               image: data.uploadPost.reviewInfo.image
            }
   
            // If everything is filled up
            if (obj.rating && obj.review && obj.about && obj.image) {
               // Uploading the post
               showLoader(getDOM().addReviewPopup2)
               await data.uploadPost.upload(obj, data.user.profile.uid)
   
               // setting the upload post object back to default and resetting others
               data.uploadPost = ''
               removeLoader(getDOM().addReviewPopup2)
               removeReviewCont()
            } else {
               alert('please fill up all the inputs')
            }
         })   
         getDOM().postReviewBtn.setAttribute('eventListener', true)
      }


      getDOM().reviewAnimeImageInput.addEventListener('change', e => {
         if (window.File && window.FileList && window.FileReader) {
            var files = e.target.files || e.dataTransfer.files
            initView.uploadPostPhoto(files[0])
            data.uploadPost.reviewInfo.image = files[0]
            } else {
            document.getElementById('file-drag-3').style.display = 'none';
            }
      })
   }

   const initPreferences = async () => {
      if (!data.user.preference) data.user.preference = new Preference(data.user.profile.uid)

      const isInitiated = await data.user.preference.isInitiated()
      if (!isInitiated) {
         await data.user.preference.createPreference()
      }
   }

   const initNotifications = async () => {
      if (!data.notifications) data.notifications = new Notification(data.user.profile.uid, data.user.profile.profile.name)

      const notifications = await data.notifications.getNotifications(4)

      notificationsView.renderNotifications(notifications, getDOM().notificationsUl)

      notificationsView.setNotificationsHeight(getDOM().notificationsUl)
      
      postClickLoadCtrl()


      let scrolled = false
      if (!getDOM().notificationsUl.dataset.listener) {
         getDOM().notificationsUl.addEventListener('scroll', async e => {
            if (!scrolled) {
               scrolled = true
               const loadedHeight = getDOM().notificationsUl.scrollTop + getDOM().notificationsUl.offsetHeight
      
               if (loadedHeight > getDOM().notificationsUl.scrollHeight) {
                  const newNotifications = await data.notifications.getNotifications(4)
   
                  notificationsView.renderMoreNotifications(newNotifications, getDOM().notificationsUl, 'beforeend')
               }
               
               scrolled = false
            }
         })

         getDOM().notificationsUl.dataset.listener = true
      }

      // await data.notifications.updatePostNotifications()
      // const postNotifications = await data.notifications.getPostNotifications(4)

      // notificationsView.renderMoreNotifications(postNotifications, getDOM().notificationsUl, 'afterbegin')

   }


   // LISTENING FOR SAVED UPDATE
   const updateSavedCtrl = onSnapshot(collection(db, 'saved', data.user.profile.uid, 'postsBig'), async snapshot => {
      savedPostsInit()
   })


   // LISTENING FOR POST UPDATE
   const updateYourPosts = onSnapshot(query(collection(db, 'postsBig'), where('authorUID', '==', data.user.profile.uid)), async snapshot => {
      reviewsInit()
   })


   // Calling all the init functions
   try {
      data.init = new Init(uid)

      profileBarInit()
      modeEventsInit()
      welcomeMsgInit()
      adminMsgInit()
      quoteInit()
      signOutInit()
   
      reviewsInit()
      savedPostsInit()

      addPostsInit()
      initPreferences()

      initNotifications()

      // hashCtrl()
      window.addEventListener('hashchange', hashCtrl)

      await indexCtrl()

      defaultCtrl()

      postReviewEventInit()
   } catch (e) {
      console.log(e)
   }
}



// DEFAULT CONTROL
const defaultCtrl = () => {
   // Profile click to view event
   // Array.from(getDOM().profileClick).forEach(cur => {
   //    cur.addEventListener('click', () => {
   //       if (data.window != data.prevWindow) {
   //          const uid = cur.dataset.uid

   //          window.location.hash = `profile_${uid}`
   //          console.log(data.window)   
   //       }
   //    })
   // })

   // Post click to view event
   // Array.from(getDOM().postClickLoad).forEach(cur => {
   //    cur.addEventListener('click', async () => {
   //       postPopupCtrl(cur.dataset.id)
   //    })
   // })

   // Other functionalities
   addPostsInit()
   animeClickCtrl()
}



// INDEX PAGE
// ADDING POST
const addPostsInit = () => {
   // Searching on which anime to post about
   const searchEventInit = () => {
      getDOM().reviewSearchAnimeInput.addEventListener('change', async e => {
         // Getting and rendering search result
         const result = await getAnime(e.srcElement.value)
         renderResultAnimes(getDOM().reviewSearchAnimeResultCont, result)

         // Selecting anime funtionality/next cont
         selectAnimeEventInit()
      })
   }

   // Selecting an anime function
   const selectAnimeEventInit = () => {
      // Check for anime clicks
      Array.from(getDOM().addReviewPopup1Animes).forEach(cur => {
         if (!cur.dataset.listener) {
            cur.addEventListener('click', async e => {
               // Getting the anime info
               const id = cur.dataset.id
               data.uploadPost = new UploadPost(id)
               await data.uploadPost.getAnimeInfo()
   
               // Rendering the anime info
               renderReviewCont(data.uploadPost.animeInfo)
            })

            cur.dataset.listener = true
         }
      })
   }

   // Create post button click event
   Array.from(getDOM().createPostClick).forEach(cur => {
      cur.addEventListener('click', e => {
         e.preventDefault()
         renderCreatePostCont()
         searchEventInit()
      })
   })
}

// Removing the create post popup cont
getDOM().addReviewPopup1.parentElement.addEventListener('click', e => {
   if (e.target.matches(".add_reveiew_popup__container")) {
      removeCreatePostCont()   
   }
})


// USER
const userCtrl = async user => {
   console.log('auth state changed')
   // Initiating user
   await userInit()

   // Checking if the user is logged in or not
   if (user) {
      // Checking if the profile is completed or not
      const isProfileCompleted = await data.user.isProfileCompleted()
      if (isProfileCompleted) { // Setting all up
         await data.user.getOwnProfile()
         data.user.profile.uid = user.uid

         window.addEventListener('hashchange', hashCtrl)
         changeWindowCtrl('index')

         await initEvents(data.user.profile.uid)
         console.log('profile completed')

      } else { // Profile isn't completed, going back to sign up page to fill out the infos
         window.removeEventListener('hashchange', hashCtrl) // Hash will not change from sign in page

         changeWindowCtrl('login')
         renderLoginConts(1)
         renderLoginCont2(data.user.auth.displayName, getDOM().userFullname)

         await setupLoginEvents()
      }
   } else { // User does not exist, going to the sign in page
      window.removeEventListener('hashchange', hashCtrl)
      console.log('no user')
      changeWindowCtrl('login')
      console.log(data.user)
      await setupLoginEvents() 
      console.log(getDOM().signInBtn)

      getDOM().signInBtn.addEventListener('click', () => {
         console.log('sign in btn')
      })
   }
}



// LIVE UPDATE: USER CHANGE
onAuthStateChanged(getAuth(), async user => {
   await userCtrl(user)
})





const init = async () => {
   initHashes()
   changeWindowCtrl('index')
   indexEventsInit()
}







// DEBUGGING
window.data = data
// window.getAuth = getAuth()
// const animes = getAnime('steins gate')
// const characters = getCharacter("okabe")
// // console.log(characters)
// window.getDOM = getDOM()
// window.loader = getMarkup().loader()

// const test = async () => {
//    const ref = doc(db, 'users', 'ALM9kzEFfzWVZs47PoxhaEuDgc12')
//    const res = await getDoc(ref)
//    console.log(res.data())
// }

// test()
// data.people = new People('Sakib UL Hasjj')
// data.people.getPeople().then(res => console.log(res))
// window.data.people = new People('Sakib ul')
// data.people = new People('ul hasan')
// data.people.getPeopleTest().then(res => {console.log(res[0], res.length)})

window.test = () => {
   console.log('a')
}

window.data.removeSeen = async () => {
   const postsDocRef = collection(db, 'postsBig')
   const postsDocSnap = await getDocs(postsDocRef)

   postsDocSnap.forEach(async cur => {
      const postDocRef = doc(db, 'postsBig', cur.id)
      await updateDoc(postDocRef, {
         "seen.10iJZN4zb6RlMoNjWhB9Zcph1583": false
      })
   })
}

window.data.seeProfiles = async () => {
   const profiles = await new ProfileSuggestions('10iJZN4zb6RlMoNjWhB9Zcph1583').getProfiles()
   console.log(profiles)
}



// new Feed ('ALM9kzEFfzWVZs47PoxhaEuDgc12').getPostsTT(4).then(res => {console.log(res)})

// window.feed = new Feed('ALM9kzEFfzWVZs47PoxhaEuDgc12')
// new Preference('ALM9kzEFfzWVZs47PoxhaEuDgc12').update('test', 'test', 100).then(res => console.log(res))


window.getRandomQuote = async () => {
   let res = await getRandomQuote()

   res = await res.json()

   res = res.contents

   res = JSON.parse(res)

   console.log(res)
}