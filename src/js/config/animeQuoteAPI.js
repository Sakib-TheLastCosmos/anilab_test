const baseLink = 'https://api.allorigins.win/get?url=https://api.rei.my.id/v3/quotes'

export const getRandomQuote = async () => {
   try {
      let res = await fetch(baseLink)

      res = await res.json()

      res = res.contents
   
      res = JSON.parse(res)

      return res
   } catch (e) {
      return e
   }
}