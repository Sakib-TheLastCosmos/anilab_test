import { collection, getDocs, limit, orderBy, where, query, startAfter } from "firebase/firestore"
import { getAnime, getAnimeByIDAll, getGenres } from "../config/animeAPI"
import { formatTitle } from "../config/base"
import { db } from "../config/firebase"
import { getProfile } from '../config/base'

export default class Anime {
   constructor (query) {
      this.query = query
   }


   async getAnimes () {
      const resultAnimes = await getAnime(this.query)

      this.searchResultAnimes = resultAnimes
   }

   selectID (id) {
      this.animeID = id
   }  


   async getAnime () {
      this.posts = []
      let resultRawAnime = await getAnimeByIDAll(this.animeID)
      console.log(resultRawAnime)
      resultRawAnime = resultRawAnime[0]
      
      const obj = {
         id: resultRawAnime.id,
         name: resultRawAnime.attributes.titles.en || resultRawAnime.attributes.titles.en_jp || resultRawAnime.attributes.canonicalTitle,
         description: resultRawAnime.attributes.description,
         descriptionShort: formatTitle(resultRawAnime.attributes.description, 475),
         imageURL: resultRawAnime.attributes.posterImage.large,
         sourceRating: (parseFloat(resultRawAnime.attributes.averageRating) / 10).toFixed(1),
         anilabRating: '6.9',
         totalEpisodes: resultRawAnime.attributes.episodeCount,
         episodeLength: resultRawAnime.attributes.episodeLength,
         otherName: resultRawAnime.attributes.titles.en_jp,
         status: resultRawAnime.attributes.status,
      }

      const genres = await getGenres(this.animeID)
      obj.genres = genres

      this.anime = obj 
   }


   async getAnimeReviews (animeName, givenLimit, lastDoc) {
      const animeReviewsRef = collection(db, 'postsBig')

      let q = ''
      if (lastDoc) {
         const lastDocSnap = await getDoc(doc(db, 'postsBig', lastDoc.id))

         q = query(animeReviewsRef, where('animeInfo.name', '==', animeName), limit(givenLimit), startAfter(lastDocSnap))
      } else {
         q = query(animeReviewsRef, where('animeInfo.name', '==', animeName), limit(givenLimit))
      }

      const animeReviewSnap = await getDocs(q)
      for (let i in animeReviewSnap.docs) {
         const post = animeReviewSnap.docs[i].data()
         const author = await getProfile(post.authorUID)

         const obj = {
            id: post.id,
            animeInfo: {
               id: post.animeInfo.id,
               name: post.animeInfo.name,
            },
            reviewInfo: {
               imageURL: post.reviewInfo.imageURL,
               rating: post.reviewInfo.rating
            },
            author: {
               uid: post.authorUID,
               name: author.profile.fullname,
               totalAnimes: author.profile.totalAnimes,
               profilePhoto: author.profile.profilePhoto
            }
         }

         if (this.posts) this.posts.push(obj)
         else this.posts = [obj]

      }
   }
}
