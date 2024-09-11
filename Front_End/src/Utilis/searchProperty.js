
class PropSearchObj {
   constructor (cityLocation, minPrice, maxPrice) {
      this.cityLocation = cityLocation
      this.minPrice = minPrice
      this.maxPrice = maxPrice
   }
}

/**
 * Function that take the states and return Object
 *
 * Retrun: object of searching details
 */

const searchProperties = (e, city, min, max) => {
   e.preventDefault()

   return (new PropSearchObj(city, min, max))
}

export {searchProperties}