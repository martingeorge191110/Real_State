
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

const getPostInf = (id, postsArr) => {
   let result
   for (const post of postsArr) {
      if (post._id.toString() === id) {
         result = post;
         break;
      }
   }
   return result;
}

export {orgData, getPostInf}
