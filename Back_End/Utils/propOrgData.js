
/**
 * Utiliy function to organize Searching Data
 */

const orgData = (respObj) => {
   let arr = []
   respObj.forEach( user => {
      user.posts.forEach( post => {
         arr.push ({
            _id: post._id,
            userId: user.userId,
            post
         })
      })
   });

   return (arr)
}

export default orgData
