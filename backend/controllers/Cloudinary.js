const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

// Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });
cloudinary.config({ 
    cloud_name: 'dsf7eyovf', 
    api_key: '425934167632424', 
    api_secret: '3aKVTy84SopbQmIgd6mEDdIjXa4' // Click 'View API Keys' above to copy your API secret
});


module.exports = cloudinary;
