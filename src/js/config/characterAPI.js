

const proxy = 'https://test.cors.workers.dev/?'
const baseLink = 'https://api.jikan.moe/v3/'

export const getCharacter = async query => {
   try {
      let res = await fetch(`${baseLink}search/character?q=${query}`)
      res = await res.json()

      let resArray = []

      for (let i =0; i < 10; i++) {
         let obj = {}

         obj.name = res.results[i].name
         obj.imageURL = res.results[i].image_url
         obj.text = obj.name

         resArray.push(obj)
      }

      return resArray
   } catch (e) {
      return e
   }
}

