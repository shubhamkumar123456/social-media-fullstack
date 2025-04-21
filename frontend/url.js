 
 let URL = import.meta.env.VITE_PRODUCTION==="developement"? import.meta.env.VITE_BackendLIVE_URL :import.meta.env.VITE_BACKEND_LOCAL_URL

 export default URL