import { formatTitle } from "./config/base"

export const markupPage = {
   index:
   `<div class="active_panel">
      <ul>
         <li>
            <figure>
               <img src="../img/profile_img.jpg" alt="">
            </figure>

            <p>Sakib</p>
         </li>
      </ul>
   </div>


   <div class="create_post_panel">
   </div>


   <div class="posts">
      <ul>
      </ul>
   </div>`,


   friends: 
   `<div class="friends__cont">
      <div class="top">
         <form id="search_people__form">
            <input id="search_people__input" type="text" placeholder="Search for someone...">
            <button id="search_people__btn" type="submit">
               <svg>
                  <use href="../icons/icons.svg#icon__search"></use>
               </svg>

               Search
            </button>
         </form>
      </div>

      <div class="bottom">
         <ul class="search_people_result__cont">
         </ul>
      </div>
   </div>`,


   animes: 
   `<div class="animes__cont">
      <form class="anime-page__form">
         <svg class="anime-back-to-result__btn">
            <use href="icons/icons.svg#icon__back"></use>
         </svg>
         <input class="anime-page__input" type="text" placeholder="Search for an anime">
      </form>
      <main class="animes-1">    
         <ul class="anime-page__anime-result">
            
         </ul>
      </main>

      <main class="animes-2">    
         <div class="anime">
         </div>
      </main>
   </div>`,


   saved:
   `<div class="saved__cont">
      <div class="top">
         <input class="saved_search__input" type="text" placeholder="Search with an Anime keyword">
      </div>

      <div class="bottom">
         <div class="search-review" style="display: none">
            <h3>Search Result</h2>
            <ul class="search-review-cont">
            <ul>
         </div>

         <div class="today-review">
            <h3>Today</h3>
            <ul class="today-review-cont">
            </ul>   
         </div>
         
         <div class="this-month-review">
            <h3>This month</h3>
            <ul class="thisMonth-review-cont">
            </ul>   
         </div>

         <div class="last-year-review">
            <h3>Earlier this year</h3>
            <ul class="earlier-review-cont">
            </ul>   
         </div>
      </div>
   </div>`,


   about: 
   `<div class="about__cont">
   </div>`,


   profile:
   `<div class="profile__cont">
   </div>`,


   login:
   `<div class="login__cont">
      <div class="top_svg_cont">
         <div class="top_svg"></div>
      </div>

      <div class="bottom_svg_cont">
         <div class="bottom_svg"></div>
      </div>



      <div class="login__cont_popup-0 login__cont_popups">
         <div class="middle">
            <div class="left">
               <figure>
                  <img src="../icons/logo_full.png" alt="">
               </figure>

               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex dolorum labore vel nesciunt provident, non exercitationem soluta sunt debitis velit ea error libero consectetur illum at doloribus rerum ab similique.</p>
            </div>


            <div class="right">
               <div class="top">
                  <h3>Welcome aboard!</h3>
                  <p>Please sign in first to continue...</p>   
               </div>

               <button type="button" class="login-with-google-btn" >
                  Sign in with Google
               </button>

               <div class="bottom">
                  <p>Let's venture in the world of animes!</p>
               </div>
            </div>
         </div>

      </div>



      <div class="login__cont_popup-1 login__cont_popups temp">
         <div class="container" id="container">
            <div class="form-container sign-in-container">
               <form action="#">
                  <h1 class="user__fullname"></h1>
                  <span>Please enter these information to proceed</span>

                  <input id="bio" type="text" placeholder="Write one or two lines about yourself" />
                  <div class="dropdown_cont input_dropdown_cont lives_in_dropdown_cont">
                     <input id="lives_in" type="text" placeholder="Lives in... (city)" />

                     <div class="dropdown input_dropdown lives_in_dropdown" id="input_dropdown">
                        <ul>
                        </ul>
                     </div>
                  </div>


                  <div class="dropdown_cont input_dropdown_cont fav_anime_1_dropdown_cont" data-amime="1">
                     <input id="fav_anime_1" type="text" placeholder="Favorite anime 1" class="fav_anime" />

                     <div class="dropdown input_dropdown fav_anime_dropdown" id="input_dropdown">
                        <ul>
                        </ul>
                     </div>
                  </div>
                  <div class="dropdown_cont input_dropdown_cont fav_anime_2_dropdown_cont" data-anime="2">
                     <input id="fav_anime_2" type="text" placeholder="Favorite anime 2" class="fav_anime"/>

                     <div class="dropdown input_dropdown fav_anime_dropdown" id="input_dropdown">
                        <ul>
                        </ul>
                     </div>
                  </div>
                  <div class="dropdown_cont input_dropdown_cont fav_anime_3_dropdown_cont" data-anime="3">
                     <input id="fav_anime_3" type="text" placeholder="Favorite anime 3" class="fav_anime"/>

                     <div class="dropdown input_dropdown fav_anime_dropdown" id="input_dropdown">
                        <ul>
                        </ul>
                     </div>
                  </div>
                  <div class="dropdown_cont input_dropdown_cont dream_char_dropdown_cont">
                     <input id="dream_char" type="text" placeholder="Dream Character" />

                     <div class="dropdown input_dropdown dream_char_dropdown" id="input_dropdown">
                        <ul>
                        </ul>
                     </div>
                  </div>


                  <button class="next-2 next">Next</button>
               </form>
            </div>
            <div class="overlay-container">
               <div class="overlay">                   
                  <div class="overlay-panel overlay-right">
                     <h1>Hello, Friend!</h1>
                     <p>Enter your personal details and start journey with us</p>
                     <button class="ghost next-2 next" id="signUp">Next</button>
                  </div>
               </div>
            </div>
         </div>
      </div>


      
      <div class="login__cont_popup-2 login_cont_popups choose-box temp">
         <h3>When it comes to watching anime, I'm a ...</h3>
         <ul>
            <li class="next-3 next" data-amount="8+">
               <h3>Beginner</h3>
               <p>I've just started and watched less than 10 animes</p>

               <span>1-10</span>
            </li>

            <li class="next-3 next" data-amount="20+">
               <h3>Moderate</h3>
               <p>I've watched around 20 animes so far</p>

               <span>11-40</span>
            </li>
         </ul>

         <ul>
            <li class="next-3 next" data-amount="50+">
               <h3>Intermediate</h3>
               <p>Animes are my profession! I've watched more than 50 animes</p>

               <span>41-80</span>
            </li>

            <li class="next-3 next" data-amount="100+">
               <h3>Die hard</h3>
               <p>Almost century! I don't watch animes, rather they watch me</p>

               <span>80+</span>
            </li>
         </ul>
      </div>



      <div class="login__cont_popup-3 login_cont_popups choose-box temp">
         <h3>In the sub vs dub debate, I belong to the...</h3>
         <ul>
            <li class="next-4 next">
               <h3>Sub Gang</h3>
               <p>I prefer the things original as original I myself and subbed animes are!</p>

               <span>40%</span>
            </li>

            <li class="next-4 next">
               <h3>Dub Gang</h3>
               <p>Why go to Hebrew when you have English! Dub for sure!</p>

               <span>30%</span>
            </li>
         </ul>

         <ul>
            <li class="next-4 next">
               <h3>Neutral</h3>
               <p>I think both are okay! I am as neutral as neutrons are inside the nucleus. There shouldn't be any debate on sub vs dub.</p>

               <span>30%</span>
            </li>
         </ul>
      </div>


      <div class="login__cont_popup-4 login_cont_popups choose-box temp">
         <h3>Our wise owl says, since the ancient age there's been another debate as well. Anime or manga?</h3>
         <ul>
            <li class="next-5 next">
               <h3>Anime</h3>
               <p>I think it's foolish how people go for pages of pictures when you have the whole video!</p>

               <span>40%</span>
            </li>

            <li class="next-5 next">
               <h3>Manga</h3>
               <p>Animes become trash comparing to the storyline we have in manga! Give manga a respect!</p>
               <span>30%</span>
            </li>
         </ul>

         <ul>
            <li class="next-5 next">
               <h3>Neutral</h3>
               <p>Some animes are better than the manga while some are no match to it comparing the storyline. So, just take the one you like which I do as well.</p>

               <span>30%</span>
            </li>
         </ul>
      </div>



      <div class="login__cont_popup-5 login_cont_popups choose-box temp">
         <h3>Please upload a photo we can use as your profile picture!</h3>
         
         <form id="file-upload-form" class="uploader">
            <input id="file-upload" class="profile-photo-input" type="file" name="fileUpload" accept="image/*" dropzone="true"/>
         
            <label for="file-upload" id="file-drag">
            <img id="file-image" class="file-image hidden" src="#" alt="Preview">
            <div id="start" class="start">
               <i class="fa fa-download" aria-hidden="true"></i>
               <div>Select an image or drag here</div>
               <div id="notimage" class="not-image hidden">Please select an image</div>
               <span id="file-upload-btn" class="btn btn-primary">Browse image</span>
            </div>
            
            </label>
         </form>
      </div>


      <div class="login__cont_popup-6 login_cont_popups choose-box temp">
         <h3>Another one to use as your cover photo and we are done, pretty please ^ ^</h3>
         
         <form id="file-upload-form-2" class="uploader">
            <input id="file-upload-2" class="cover-photo-input" type="file" name="file-upload-2" accept="image/*" dropzone="true"/>
         
            <label for="file-upload-2" id="file-drag-2">
            <img id="file-image-2" class="file-image hidden" src="#" alt="Preview">
            <div id="start-2" class="start">
               <i class="fa fa-download" aria-hidden="true"></i>
               <div>Select an image or drag here</div>
               <div id="notimage-2" class="not-image hidden">Please select an image</div>
               <span id="file-upload-btn-2" class="btn btn-primary">Browse image</span>
            </div>
            
            </label>
         </form>
      </div>
   </div>`
}




export const getMarkup = () => {
   return {
      livesInDropdownList: (category, id, text, imageURL) => {
         return `
         <li data-category=${category} data-id=${id}>
            <figure style="display: ${imageURL ? 'block' : 'none'}">
               <img src=${imageURL ? imageURL : ''}>
            </figure>

            <a>${text}</a>
         </li>
         `
      },


      selectedCont: (category, text, imageURL) => {
         return `
         <div class="selected" data-category=${category}>
            <div class="left">
               <figure>
               <img src="${imageURL ? imageURL : ''}" style="display: ${imageURL ? 'block' : 'none'}">
               </figure>
            </div>

            <div class="middle">
               <span>${text}</span>
            </div>

            <div class="right">
               <button class="remove_selected_cont_btn">
                  <svg>
                     <use href="./icons/icons.svg#icon__x"></use>
                  </svg>
               </button>
            </div>
         </div>
         `
      },


      inputCont: category => {
         let generalClassName;

         if (category.split('_')[2]) {
            generalClassName = category.split('_').pop().join()
         } else {
            generalClassName = category
         }

         return `
         <div class="dropdown_cont input_dropdown_cont ${category}_dropdown_cont">
            <input id=${category} type="text" placeholder="Favorite anime 3" class="fav_anime"/>

            <div class="dropdown ${generalClassName} fav_anime_dropdown" id="input_dropdown">
               <ul>
                  
               </ul>
            </div>
         </div>
         `
      },


      reviewAnimeSearchResults: (className, id, name, year, imageURL) => {
         return `
         <li data-id=${id} class=${className}>
            <div class="top">
               <figure>
                  <img src=${imageURL} alt="">
               </figure>
            </div>

            <div class="bottom">
               <h4>${name}</h4>
               <p>${year}</p>
            </div>
         </li>
         `
      },


      loader: () => {
         return `
         <div class="loader_cont">
            <svg width="300" height="120" id="clackers">
               <!-- Left arc path -->
               <svg>
                  <path id="arc-left-up" fill="none" d="M 90 90 A 90 90 0 0 1 0 0"/>
               </svg>
               <!-- Right arc path -->
               <svg>
                  <path id="arc-right-up" fill="none" d="M 100 90 A 90 90 0 0 0 190 0"/>
               </svg>
               
               <text x="150" y="50" fill="#ffffff" font-family="Helvetica Neue,Helvetica,Arial" font-size="18"
                     text-anchor="middle">
                  L O A D I N G
               </text>
               <circle cx="15" cy="15" r="15">
                  <!-- I used a python script to calculate the keyPoints and keyTimes based on a quadratic function. -->
                  <animateMotion dur="1.5s" repeatCount="indefinite"
                     calcMode="linear"
                     keyPoints="0.0;0.19;0.36;0.51;0.64;0.75;0.84;0.91;0.96;0.99;1.0;0.99;0.96;0.91;0.84;0.75;0.64;0.51;0.36;0.19;0.0;0.0;0.05;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0"
                     keyTimes="0.0;0.025;0.05;0.075;0.1;0.125;0.15;0.175;0.2;0.225;0.25;0.275;0.3;0.325;0.35;0.375;0.4;0.425;0.45;0.475;0.5;0.525;0.55;0.575;0.6;0.625;0.65;0.675;0.7;0.725;0.75;0.775;0.8;0.825;0.85;0.875;0.9;0.925;0.95;0.975;1.0">
                     <mpath xlink:href="#arc-left-up"/>
                  </animateMotion>
               </circle>
               <circle cx="135" cy="105" r="15" />
               <circle cx="165" cy="105" r="15" />
               <circle cx="95" cy="15" r="15">
                  <animateMotion dur="1.5s" repeatCount="indefinite"
                     calcMode="linear"
                     keyPoints="0.0;0.0;0.05;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0.0;0.19;0.36;0.51;0.64;0.75;0.84;0.91;0.96;0.99;1.0;0.99;0.96;0.91;0.84;0.75;0.64;0.51;0.36;0.19;0.0"
                     keyTimes="0.0;0.025;0.05;0.075;0.1;0.125;0.15;0.175;0.2;0.225;0.25;0.275;0.3;0.325;0.35;0.375;0.4;0.425;0.45;0.475;0.5;0.525;0.55;0.575;0.6;0.625;0.65;0.675;0.7;0.725;0.75;0.775;0.8;0.825;0.85;0.875;0.9;0.925;0.95;0.975;1.0">
                     <mpath xlink:href="#arc-right-up"/>
                  </animateMotion>
               </circle>
            </svg>
         </div>`
      },


      yourReviewsListItem: (id, name, imageURL) => {
         return `
         <li class="post_click_load" data-id=${id}>
            <div class="left">
               <figure>
                  <img src=${imageURL} alt="">
               </figure>

               <p>${name}</p>
            </div>

            <div class="right">
               <!-- <div class="blue-dot"></div> -->
            </div>
         </li>
         `
      },


      noPostsLeftBarMsg: category => {
         let markup = ''
         if (category == 'postsBig') {
            markup = "<li class='no-your-reviews-msg'>You haven't posted anything yet!</li>"
         } else if (category == 'savedPosts') {
            markup = "<li class='no-your-reviews-msg'>You haven't saved any posts yet!</li>"
         }

         return markup
      },


      profilePage: profileObj => {
         const profile = profileObj.profile
         console.log(profile)
         return `
         <div class="profile_cover">
            <img class="cover_img" src=${profile.coverPhoto}>
         </div>


         <div class="profile-bottom__cont">
            <div class="profile__bottom">
               <div class="profile_bottom__top">
                  <div class="profile">
                     <figure class="profile_img">
                        <img src=${profile.profilePhoto} alt="">
                     </figure>

                     <main>
                        <h2>${profile.fullname}</h2>
                        <p>${profile.bio}</p>
                     </main>
                  </div>

                  <div class="profile_edit">
                     <button>
                        <svg>
                           <use href="../icons/icons.svg#icon__edit"></use>
                        </svg>
                        <span>Edit Profile</span>
                     </button>
                  </div>
               </div>
            </div>


            <div class="profile__info">
               <div class="left">
                  <!-- Date of birth, favorite animes, gmail, total animes watched, lives in, dream character, sub or dub, manga? -->
                  <div class="left__conts">
                     <div>
                        <span>Lives in</span>
                        <span>${profile.livesIn.text}</span>
                     </div>
                     <div>
                        <span>Born in</span>
                        <span>To be fixed</span>
                     </div>
                  </div>

                  <div class="left__conts">
                     <div>
                        <span>Watched</span>
                        <span>${profile.totalAnimes.amount} anime</span>
                     </div>
                     <div>
                        <span>Sub or Dub?</span> 
                        <span>${profile.subOrDub.text}</span>
                     </div>
                     <div>
                        <span>Anime or Manga?</span>
                        <span>${profile.animeOrManga.text}</span>
                     </div>
                  </div>

                  <div class="left__conts">
                     <div>
                        <span>Animes top picks</span>
                        <div>
                           <ul class="top-picks">
                              <li class="anime_click anime_click_text" data-id=${profile.favAnimes[0].id}>${profile.favAnimes[0].text}</li>
                              <li class="anime_click anime_click_text" data-id=${profile.favAnimes[1].id}>${profile.favAnimes[1].text}</li>
                              <li class="anime_click anime_click_text" data-id=${profile.favAnimes[2].id}>${profile.favAnimes[2].text}</li>
                           </ul>
                        </div>
                     </div>

                     <div>
                        <span>Dream Character</span>
                        <span>${profile.dreamChar.text}</span>
                     </div>
                  </div>

                  <div class="left__conts">
                     <div>
                        <span>Contact</span>
                        <span>${profile.email}</span>   
                     </div>
                  </div>
               </div>


               <div class="right">
                  <div class="posts">
                     <ul>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
         `
      },


      peopleSearchResult: people => {
         return `
         <li data-uid=${people.uid} class="people-search-result__list-item">
            <div class="left">
               <figure>
                  <img src=${people.profilePhoto} alt="">
               </figure>

               <div>
                  <h3>${people.fullname}</h3>
                  <p>Watched over ${people.totalAnimesAmount.slice(0, people.totalAnimesAmount.length - 1)} animes</p>
               </div>
            </div>

            <div class="right">
               <svg>
                  <use href="../icons/icons.svg#icon__three-dots-vertical"></use>
               </svg>
            </div>
         </li>
         `
      },


      animePageAnime: anime => {
         let genreMarkup = ''
         anime.genres.forEach(cur => {
            genreMarkup += `<li>${cur}</li>`
         })

         return `
         <header>
            <div class="left">
               <figure>
                  <img src=${anime.imageURL} alt="">
               </figure>
            </div>

            <div class="middle">
               <div class="top">
                  <h3>${anime.name}</h3>
               </div>

               <div class="bottom">
                  <div class="rating">
                     <div class="left">
                        <svg class="icon__star">
                           <use href="../icons/icons.svg#icon__star"></use>
                        </svg>
                        <span>${anime.sourceRating}/10</span>
                        <span>(Imdb)</span>
                     </div>
                     
                     <div class="right">
                        <svg class="icon__star">
                           <use href="../icons/icons.svg#icon__star"></use>
                        </svg>
                        <span>${anime.anilabRating}/10</span>
                        <span>(AniLab)</span>
                     </div>
                  </div>

                  <div class="others">
                     <p>${anime.totalEpisodes} eps</p>
                     <p>${anime.episodeLength} min</p>   
                  </div>
               </div>
            </div>

            <div class="right">
               <ul>
                  <li>
                     <span>Synonyms:</span>
                     <span>${anime.otherName}</span>
                  </li>

                  <li>
                     <span>Status:</span>
                     <span>${anime.status}</span>
                  </li>

                  <li class="genre__ul">
                     <span>Genre:</span>
                     <ul class="genres">
                        ${genreMarkup}
                     </ul>
                  </li>
               </ul>
            </div>
         </header>


         <main>
            <div class="blue-line anime-description_blue-line"></div>
            <p class="anime-page-description">${anime.descriptionShort} <button class="see-more__btn view-full-description__btn"">See more...</button>
            </p>
         </main>


         <footer>
            <header>
               <h3>Reviews</h3>
            </header>

            <main>
               <ul>
               </ul>
            </main>
         </footer>
         `
      },


      seeMoreBtn: (text) => {
         return `
            <button class="see-more__btn view-full-description__btn"">${text}</button>
         `
      },


      aboutCont: (obj) => {
         return `
         <header>
            <figure>
               <img src="../icons/logo_full.png" alt="">
            </figure>
         </header>

         <main>
            <div class="blue-line"></div>
            <p class="about-message">${obj.about}</p>
         </main>

         <footer>
            <div class="top">
               <table>
                  <tr>
                     <td>Version</td>
                     <td>&nbsp : &nbsp</td>
                     <td> ${obj.version}</td>
                  </tr>

                  <tr>
                     <td>For anything about the site</td>
                     <td>&nbsp : &nbsp</td>
                     <td> ${obj.devEmail}</td>
                  </tr>
               </table>
            </div>

            <div class="middle">
               <div class="profile profile_click" data-uid=${obj.adminProfile.uid}>
                  <div class="left">
                     <figure>
                        <img src=${obj.adminProfile.profilePhoto} alt="">
                     </figure>
                  </div>

                  <div class="right">
                     <h3>${obj.adminProfile.name}</h3>
                     <p>Admin</p>
                  </div>
               </div>
            </div>

            <div class="bottom">
               <h3>Contact</h3>

               <div class="links__cont">
                  <ul class="links">
                     <li>
                        <a href=${obj.contact.facebook} target="_blank">
                           <svg>
                              <use href="../icons/icons.svg#icon__facebook"></use>
                           </svg>
                        </a>
                     </li>

                     <li>
                        <a href=${obj.contact.twitter} target="_blank">
                           <svg>
                              <use href="../icons/icons.svg#icon__twitter"></use>
                           </svg>
                        </a>
                     </li>

                     <li>
                        <a href=${obj.contact.github} target="_blank">
                           <svg>
                              <use href="../icons/icons.svg#icon__github"></use>
                           </svg>
                        </a>
                     </li>

                     <li>
                        <a href=${obj.contact.discord} target="_blank">
                           <svg>
                              <use href="../icons/icons.svg#icon__discord"></use>
                           </svg>
                        </a>
                     </li>

                     <li>
                        <a href=${obj.contact.linkedin} target="_blank">
                           <svg>
                              <use href="../icons/icons.svg#icon__linkedin"></use>
                           </svg>
                        </a>
                     </li>
                  </ul>
               </div>
            </div>
         </footer>
         `
      },


      post: (post) => {
         let genresText = ''
         post.animeInfo.genres.forEach(cur => {
            if (post.animeInfo.genres.indexOf(cur) !== (post.animeInfo.genres.length - 1)) {
               genresText += `${cur}, `
            } else {
               genresText += cur
            }
         })

         const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

         
         return `
         <li class="post" id=${post.id}>
            <div class="post__left">
               <figure>
                  <img src=${post.reviewInfo.imageURL} alt="">
               </figure>
            </div>

            
            <div class="post__right">
               <header>
                  <div class="left">
                     <div class="left">
                        <p>${months[post.uploadedAt.toDate().getMonth()]}</p>
                        <h2>${post.uploadedAt.toDate().getDate()}</h2>
                     </div>

                     <div class="right">
                        <h2 class="anime_click anime_click_text" data-id=${post.animeInfo.id} style="font-size: ${formatTitle(post.animeInfo.name, 23).length > 11 ? "1.3rem" : "1.4rem"}">${formatTitle(post.animeInfo.name, 23)}</h2>
                        <p>${post.reviewInfo.about}</p>
                     </div>

                     <div class="rating">${post.reviewInfo.rating}/10</div>
                  </div>
                  
                  <div class="right dropdown_cont">
                     <button>
                        <svg>
                           <use href="../icons/icons.svg#icon__three-dots-vertical"></use>
                        </svg>   
                     </button>

                     <div class="post_options_dropdown dropdown">
                        <ul>
                           <li class="save-anime__btn" data-id=${post.id}>
                              <svg>
                                 <use href=${post.saved? '../icons/icons.svg#icon__bookmark-remove' : '../icons/icons.svg#icon__bookmark'}></use>
                              </svg>
      
                              <a>${post.saved? 'Unsave review' : 'Save review'}</a>
                           </li>
                        
                           <li class="anime_click" data-id=${post.animeInfo.id}>
                              <svg>
                                 <use href="../icons/icons.svg#icon__three-dots-horizontal"></use>
                              </svg>
      
                              <a>More reviews</a>
                           </li>

                           <li> 
                              <svg>
                                 <use href="../icons/icons.svg#icon__report"></use>
                              </svg>
      
                              <a>Report this post</a>
                           </li>
                        </ul>
                     </div>
                  </div>
               </header>


               <main class="view-full-post-btn post_click" data-id=${post.id}>
                  <p>${post.reviewInfo.reviewShort}<button class="see-more__btn view-full-post-btn" data-id="post-1">See more...</button></p>
               </main>

               <footer>
                  <div class="footer_top">
                     <div class="anime_info">
                        <p>Total Episodes: &nbsp ${post.animeInfo.totalEpisodes}</p>
                        <p>${genresText}</p>   
                     </div>

                     <div class="author">
                        <div class="author__left">
                           <figure class="profile_click" data-uid=${post.authorUID}>
                              <img src=${post.author.profilePhoto} alt="">
                           </figure>
                        </div>

                        <div class="author__right">
                           <h4 class="profile_click profile_click_text" data-uid=${post.authorUID}>${post.author.fullname}</h4>
                           <p>Watched ${post.author.totalAnimes.amount} animes</p>
                        </div>
                     </div>
                  </div>

                  <div class="footer__bottom">
                     <div class="left">
                        <button class="save-anime__btn" id=${post.saved? 'saved' : 'not-saved'} data-id=${post.id}>
                           <svg>
                              <use href=${post.saved? '../icons/icons.svg#icon__bookmark-check' : '../icons/icons.svg#icon__bookmark-fill'}></use>
                           </svg>

                           <span>${post.saved? 'Saved' : 'Bookmark'}</span>
                        </button>
                     </div>

                     <div class="right">
                        <button class="love_btn" data-id=${post.id}>
                           <svg>
                              <use href=${post.liked ? '../icons/icons.svg#icon__heart-fill' : '../icons/icons.svg#icon__heart'}></use>
                           </svg>

                           <span><strong>${post.likes}</strong></span>
                        </button> 
                     </div>
                  </div>
               </footer>
            </div>
         </li>
         `
      },


      createPostFeed: (profilePhoto, uid) => {
         return `
         <div class="create_post__cont">
            <figure data-uid=${uid} class="profile_click">
               <img class="feed_profile_photo" src=${profilePhoto} alt="">
            </figure>

            <input class="create_post_input create_post_click" type="text" name="" id="" placeholder="Add a review...">

            <button class="create_post_click">
               <svg>
                  <use href="../icons/icons.svg#icon__send"></use>
               </svg>
            </button>
         </div>
         `
      },


      fullPost: post => {
         let genresText = ''
         post.animeInfo.genres.forEach(cur => {
            if (post.animeInfo.genres.indexOf(cur) !== (post.animeInfo.genres.length - 1)) {
               genresText += `${cur}, `
            } else {
               genresText += cur
            }
         })

         const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']


         return `
         <div class="post" id="post-1">
            <div class="top">
               <div class="post__left">
                  <figure style="max-height: 320px;">
                     <img src=${post.reviewInfo.imageURL} alt="">
                  </figure>
               </div>
      
               
               <div class="post__right">
                  <header>
                     <div class="left">
                        <div class="left">
                           <p>${months[post.uploadedAt.toDate().getMonth()]}</p>
                           <h2>${post.uploadedAt.toDate().getDate()}</h2>
                        </div>
      
                        <div class="right">
                           <h2>${post.animeInfo.name}</h2>
                           <p>${post.reviewInfo.about}</p>
                        </div>
      
                        <div class="rating">${post.reviewInfo.rating}/10</div>
                     </div>
                     
                     <div class="right dropdown_cont">
                        <button>
                           <svg>
                              <use href="./icons/icons.svg#icon__three-dots-vertical"></use>
                           </svg>   
                        </button>
      
                        <div class="post_options_dropdown dropdown">
                           <ul>
                              <li class="save-anime__btn" data-id=${post.id}>
                                 <svg>
                                    <use href=${post.saved ? '../icons/icons.svg#icon__bookmark-remove' : '../icons/icons.svg#icon__bookmark'}></use>
                                 </svg>
         
                                 <a>${post.saved ? 'Unsave review' : 'Save review'}</a>
                              </li>
                           
                              <li class="anime_click" data-id=${post.animeInfo.id}>
                                 <svg>
                                    <use href="../icons/icons.svg#icon__three-dots-horizontal"></use>
                                 </svg>
         
                                 <a>More reviews</a>
                              </li>

                              <li> 
                                 <svg>
                                    <use href="../icons/icons.svg#icon__report"></use>
                                 </svg>
         
                                 <a>Report this post</a>
                              </li>
                           </ul>
                        </div>
                     </div>
                  </header>
      
      
                  
      
                  <footer>
                     <div class="footer_top">
                        <div class="anime_info">
                           <p>Total Episodes: ${post.animeInfo.totalEpisodes}</p>
                           <p>${genresText}</p>   
                        </div>
      
                        <div class="author">
                           <div class="author__left">
                              <figure class="profile_click" data-uid=${post.authorUID}>
                                 <img src=${post.author.profilePhoto} alt="">
                              </figure>
                           </div>
      
                           <div class="author__right">
                              <h4 class="profile_click profile_click_text" data-uid=${post.authorUID}>${post.author.fullname}</h4>
                              <p>Watched ${post.author.totalAnimes.amount} animes</p>
                           </div>
                        </div>
                     </div>
      
                     <div class="footer__bottom">
                        <div class="left">
                           <button class="save-anime__btn" id=${post.saved? 'saved' : 'not-saved'} data-id=${post.id}>
                              <svg>
                                 <use href=${post.saved ? '../icons/icons.svg#icon__bookmark-check' : '../icons/icons.svg#icon__bookmark-fill'}></use>
                              </svg>

                              <span>${post.saved ? 'Saved' : 'Bookmark'}</span>
                           </button>
                        </div>

                        <div class="right">
                           <button class="love_btn" data-id=${post.id}>
                              <svg>
                                 <use href=${post.liked ? '../icons/icons.svg#icon__heart-fill' : '../icons/icons.svg#icon__heart'}></use>
                              </svg>

                              <span><strong>${post.likes}</strong></span>
                           </button> 
                        </div>
                     </div>
                  </footer>
               </div>   
            </div>

            <div class="bottom">
               <main>
                  <p class="full_post_review_cont"></p>
               </main>   
            </div>
         </div>`
      },


      savedPostItems: (saved, formattedTitle) => {
         return `
         <li class="review" data-id=${saved.id}>
            <div class="rating name">
               <span class="anime_click anime_click_text" data-id=${saved.animeInfo.id}>${formattedTitle}</span>
            </div>

            <div class="top">
               <figure>
                  <img src=${saved.reviewInfo.imageURL} alt="">
               </figure>

               <div class="rating">
                  <span>${saved.reviewInfo.rating}/10</span>

                  <svg>
                     <use href="../icons/icons.svg#icon__star"></use>
                  </svg>
               </div>
            </div>

            <div class="bottom">
               <div class="left">
                  <figure class="profile_click" data-uid=${saved.author.uid}>
                     <img src=${saved.author.profilePhoto} alt="">
                  </figure>
               </div>

               <div class="right">
                  <h3 class="profile_click profile_click_text" data-uid=${saved.author.uid}>${saved.author.name}</h3>
                  <p>Watched ${saved.author.totalAnimes.amount} animes</p>
               </div>
            </div>
         </li>
         `
      },

      activePanelProfile: profile => {
         return `
         <li>
            <figure class="profile profile_click" data-uid=${profile.uid}>
               <img src=${profile.profilePhoto} alt="">
            </figure>

            <p>${profile.name}</p>
         </li>
         `
      },

      saveButton: (isSaved, id) => {
         return `
         <button class="save-anime__btn" id=${isSaved? 'saved' : 'not-saved'} data-id=${id}>
            <svg>
               <use href=${isSaved? '../icons/icons.svg#icon__bookmark-check' : '../icons/icons.svg#icon__bookmark-fill'}></use>
            </svg>

            <span>${isSaved? 'Saved' : 'Bookmark'}</span>
         </button>
         `
      },

      likeButtonIcon: (isLiked) => {
         return `
            <use href=${isLiked ? '../icons/icons.svg#icon__heart-fill' : '../icons/icons.svg#icon__heart'}></use>
         `
      }
   }
}