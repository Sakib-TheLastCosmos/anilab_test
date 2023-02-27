export const DOM = {
   wrapper: document.querySelector('.wrapper'),

   mode: document.querySelector(".mode"),
   modeIcon: document.querySelector(".mode svg use"),
   popupCont: document.querySelector(".popup__container"),
   postPopupCont: document.querySelector(".post_popup__container"),
   postPopupBox: document.querySelector(".post_big__cont"),
   createPostClick: document.querySelectorAll(".create_post_click"),
   addReviewPopup1: document.querySelector(".add-review-popup__box-1"),
   addReviewPopup1Animes: document.querySelectorAll(".add-review-popup__box-1 ul li"),
   addReviewPopup2: document.querySelector(".add-review-popup__box-2"),

   middleBottomCont: document.querySelector(".index_middle__bottom"),
   friendsBtn: document.querySelector("#friends__btn"),
   navBtn: document.querySelectorAll("nav ul li"),

   mainLeft: document.querySelector(".main__left"),
}

export const DOMStrings = {
   lightModeSVGHref: "../icons/icons.svg#icon__sun",
   darkModeSVGHref: "../icons/icons.svg#icon__moon-stars-fill",
   livesInDropdown: '.lives_in_dropdown',
   livesInDropdownAll: '.lives_in_dropdown *',
   favAnimesDropdownAll: '.fav_anime_dropdown *',
   dreamCharDropdownAll: '.dream_char_dropdown *',
   selectedContAll: '.selected *',
   fullPostCont: '.post_big__cont',
   fullPostContAll: '.post_big__cont *',
   profileClick: '.profile_click',
   profileClickAll: '.profile_click *',
   animeClick: '.anime_click',
   animeClickAll: '.anime_click *'
}


export const getDOM = () => {
   return {
      middleBottomCont: document.querySelector(".index_middle__bottom"),
      viewFullPostBtn: document.querySelectorAll(".view-full-post-btn"),
      animesContAnimesLi: document.querySelectorAll(".animes-1 ul li"),
      animesCont1: document.querySelector(".animes-1"),
      animesCont2: document.querySelector(".animes-2"),
      signInBtn: document.querySelector('.login-with-google-btn'),
      signInNextBtn: document.querySelectorAll('.next'),
      getLoginCont: number => {
         return document.querySelector(`.login__cont_popup-${number}`)
      },

      userFullname: document.querySelector('.user__fullname'),

      livesInInput: document.querySelector('#lives_in'),
      favAnime: document.querySelectorAll('.fav_anime'),
      favAnime1: document.querySelector('#fav_anime_1'),
      favAnime2: document.querySelector('#fav_anime_2'),
      favAnime3: document.querySelector('#fav_anime_3'),
      dreamChar: document.querySelector('#dream_char'),

      livesInDropdown: document.querySelector('.lives_in_dropdown'),
      favAnimesDropdown: document.querySelectorAll('.fav_anime_dropdown'),
      dreamCharDropdown: document.querySelector('.dream_char_dropdown'),

      dropdownListItems: document.querySelectorAll('.dropdown ul li'),

      removeSelectedContBtn: document.querySelectorAll('.remove_selected_cont_btn'),

      loginNextBtn2: document.querySelectorAll('.next-2'),
      loginNextBtn3: document.querySelectorAll('.next-3'),
      loginNextBtn4: document.querySelectorAll('.next-4'), 
      loginNextBtn5: document.querySelectorAll('.next-5'),
      
      profilePhotoInput: document.querySelector('.profile-photo-input'),
      coverPhotoInput: document.querySelector('.cover-photo-input'),


      createPostClick: document.querySelectorAll('.create_post_click'),
      addReviewPopup1: document.querySelector(".add-review-popup__box-1"),
      reviewSearchAnimeInput: document.querySelector('#review-search-anime-input'),
      reviewSearchAnimeResultCont: document.querySelector('.popup-animes ul'),

      addReviewPopup2: document.querySelector(".add-review-popup__box-2"),
      addReviewPopup1Animes: document.querySelectorAll(".add-review-popup__box-1 ul li"),
      reviewAnimeImage: document.querySelector('#review-anime-img'),
      reviewAnimeName: document.querySelector('#review-anime-name'),
      reviewAnimeYear: document.querySelector('#review-anime-year'),

      reviewAnimeRatingInput: document.querySelector('input[name="rating"]:checked'),
      reviewAnimeAboutInputDefault: document.querySelector('.default-checked'),
      reviewAnimeAboutInput: document.querySelector('#review-about-anime'),
      reviewAnimeReviewInput: document.querySelector('#review-review-anime'),
      reviewAnimeImageInput: document.querySelector('.review-image-anime'),
      postReviewBtn: document.querySelector('#post-review-btn'),

      loader: document.querySelector('#clackers'),

      yourReviewsCont: document.querySelector('.your-reviews__cont'),
      yourReviewsItems: document.querySelectorAll('.your-reviews__cont li'),
      savedReviewsCont: document.querySelector('.saved-reviews__cont'),

      profileBar: document.querySelector('.profile_bar'),

      welcomeMsgCont: document.querySelector('.welcome_msg main p'),
      adminMsgCont: document.querySelector('.admin_msg main p'),
      adminProfileCont: document.querySelector('.admin_msg header'),
      quoteCont: document.querySelector('.quote'),

      signOutBtn: document.querySelector('.sign-out_btn'),


      profileCont: document.querySelector('.profile__cont'),
      editProfileCont: document.querySelector('.profile_edit'),


      searchPeopleResultCont: document.querySelector('.search_people_result__cont'),
      searchPeopleBtn: document.querySelector('#search_people__btn'),
      searchPeopleInput: document.querySelector('#search_people__input'),
      searchPeopleForm: document.querySelector('#search_people__form'),
      searchPeopleResultListItem: document.querySelectorAll('.people-search-result__list-item'),


      animePageForm: document.querySelector('.anime-page__form'),
      animePageInput: document.querySelector('.anime-page__input'),
      animePageSearchResultCont: document.querySelector('.anime-page__anime-result'),
      animePageSearchResultListItems: document.querySelectorAll('.anime-page__list-items'),
      animesCont1: document.querySelector(".animes-1"),
      animesCont2: document.querySelector(".animes-2"),
      animePageAnimeCont: document.querySelector('.anime'),
      seeMoreDescBtn: document.querySelector('.view-full-description__btn'),
      animePageDesc: document.querySelector('.anime-page-description'),
      animePageDescBlueLine: document.querySelector('.anime .blue-line'),
      animePageAnimeMain: document.querySelector('.anime main'),   
      animeBackToResultBtn: document.querySelector('.anime-back-to-result__btn'),   


      aboutCont: document.querySelector('.about__cont'),
      aboutMessage: document.querySelector('.about-message'),


      profileClick: document.querySelectorAll('.profile_click'),


      indexCreatePostCont: document.querySelector('.create_post_panel'), 
      indexPostsCont: document.querySelector('.index_middle__bottom .posts ul'),


      fullPostViewParentCont: document.querySelector('.post_popup__container'),
      fullPostViewCont: document.querySelector('.post_big__cont'),
      fullPostReviewCont: document.querySelector('.full_post_review_cont'),

      postClick: document.querySelectorAll('.post_click'),
      postClickLoad: document.querySelectorAll('.post_click_load'),
      animeClick: document.querySelectorAll('.anime_click'),

      saveAnimeBtn: document.querySelectorAll('.save-anime__btn'),

      savedPostsCont: {
         today: document.querySelector('.today-review-cont'),
         thisMonth: document.querySelector('.thisMonth-review-cont'),
         earlier: document.querySelector('.earlier-review-cont')
      },

      review: document.querySelectorAll('.review'),
      savedPagedSavedCont: document.querySelector('.saved__cont > .bottom'),
      savedSearchInput: document.querySelector('.saved_search__input'),
      savedSearchCont: document.querySelector('.search-review-cont'),

      changeWindowBtn: document.querySelectorAll('.change-window'),

      loveBtn: document.querySelectorAll('.love_btn'),

      profilePostsContDivRight: document.querySelector('.profile__info .right'),
      profilePostsCont: document.querySelector('.profile__info .right .posts ul'),
      animePageReviewsCont: document.querySelector('.anime footer main ul'),
      activePanelUl: document.querySelector('.active_panel ul'),
      notificationsUl: document.querySelector('.notifications main ul'),

      postSavedButton: id => {
         let formattedID = `#\\3${id}`;
         formattedID = formattedID.slice(0, 4) + ' ' + formattedID.slice(4, formattedID.length)

         return document.querySelector(`${formattedID} .footer__bottom .left`)
      },

      postLikeButton: id => {
         let formattedID = `#\\3${id}`;
         formattedID = formattedID.slice(0, 4) + ' ' + formattedID.slice(4, formattedID.length)

         return document.querySelector(`${formattedID} .love_btn svg`)
      },

      postSavedButtonMain: id => {
         let formattedID = `#\\3${id}`;
         formattedID = formattedID.slice(0, 4) + ' ' + formattedID.slice(4, formattedID.length)

         return document.querySelector(`${formattedID} .save-anime__btn-main`)
      },
      
      postSavedButtonDropdown: id => {
         let formattedID = `#\\3${id}`;
         formattedID = formattedID.slice(0, 4) + ' ' + formattedID.slice(4, formattedID.length)

         return document.querySelector(`${formattedID} .save-anime__btn-dropdown`)
      }
   }
}


export const getInput = () => {
   return {
      bio: document.querySelector('#bio').value
   }
}
