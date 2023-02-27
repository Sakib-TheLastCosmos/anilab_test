const proxy = 'https://api.allorigins.win/get?url='
const api_key = 'ba3a0da0-4a82-11ec-a085-9df0bff680fb'

export const getPlaces = async query => {
   let res = await fetch(`https://app.geocodeapi.io/api/v1/search?apikey=${api_key}&text=${query}`)


   res = await res.json()

   res = res.features

   const resArray = []

   Array.from(res).forEach(cur => {
      let obj = {}

      obj.id = cur.properties.id

      obj.city = cur.properties.name
      obj.region = cur.properties.region ? cur.properties.region : ''
      obj.country = cur.properties.country
      obj.text = `${obj.city}, ${obj.region}, ${obj.country}`

      resArray.push(obj)
   })

   return resArray
}