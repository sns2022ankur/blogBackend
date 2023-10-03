const express = require('express')
const multer = require('multer');
const router = express.Router()
const Auth = require('../middleware/Auth');
const AuthController = require('../controllers/AuthController');
const BlogController = require('../controllers/BlogController');


// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
});
  
// Create the multer instance
const upload = multer({ storage: storage });


//AuthController
router.post('/register',AuthController.userRegister)
router.post('/login',AuthController.userLogin)
router.get('/logout',AuthController.logout)


//BlogController
router.get('/fetchAllBlogs',BlogController.fetchAll)
router.get('/fetchSingleBlog/:id',BlogController.fetchSingle)
router.post('/storeBlog',upload.single('file'),BlogController.store)
router.put('/updateBlog/:id',upload.single('file'),BlogController.update)
router.delete('/deleteBlog/:id',BlogController.delete)




module.exports = router