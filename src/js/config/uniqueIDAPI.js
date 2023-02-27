export const getUniqueID = async () => {
   try {
      let res = await fetch('https://www.uuidtools.com/api/generate/v1/count/1')

      res = await res.json()

      res = res[0]
   
      return res   
   } catch (e) {
      return e
   }
}