let url = process.env.DEPLOYEMENT==="production"?process.env.PRODUCTION_URL : process.env.DEVELOPEMENT_URL

console.log("url = ",url)

module.exports = url