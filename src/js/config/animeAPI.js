const baseLink = 'https://kitsu.io/api/edge'

export const getAnime = async query => {
   try {
      let res = await fetch(`${baseLink}/anime?filter[text]=${query}`)

      res = await res.json()
      res = res.data

      const resArray = []
      res.forEach(cur => {
         let obj = {}
         obj.id = cur.id
         obj.imageURL = cur.attributes.posterImage.tiny
         obj.year = cur.attributes.startDate.split('-')[0]
         obj.name = cur.attributes.titles.en || cur.attributes.titles.en_jp || cur.attributes.canonicalTitle

         obj.text = obj.name

         resArray.push(obj)
      })

      return resArray
   } catch (e) {
      return e
   }
}


export const getAnimeByID = async id => {
   try {
      let res = await fetch(`${baseLink}/anime?filter[id]=${id}`)

      res = await res.json()
      res = res.data

      const resArray = []
      res.forEach(cur => {
         let obj = {}
         obj.id = cur.id
         obj.imageURL = cur.attributes.posterImage.tiny
         obj.year = cur.attributes.startDate.split('-')[0]
         obj.name = cur.attributes.titles.en || cur.attributes.titles.en_jp || cur.attributes.canonicalTitle

         obj.text = obj.name

         resArray.push(obj)
      })

      return resArray
   } catch (e) {
      return e
   }
}





export const getAnimeByIDAll = async id => {
   try {
      let res = await fetch(`${baseLink}/anime?filter[id]=${id}`)

      res = await res.json()
      res = res.data

      const resArray = []
      res.forEach(cur => {
         resArray.push(cur)
      })

      return resArray
   } catch (e) {
      return e
   }
}


export const getGenres = async id => {
   try {
      let res = await fetch(`${baseLink}/anime/${id}/genres`)

      res = await res.json()
      res = res.data

      const resArray = []
      res.forEach(cur => {
         resArray.push(cur.attributes.name)
      })

      return resArray
   } catch (e) {
      return e
   }
}


