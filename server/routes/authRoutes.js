const express=require('express');
const router=express.Router();
const cors=require('cors')
const {test,registerUser,loginUser,forgetPassword,updatePassword,resetPassword,getProfile,getItems,updateItem,deleteItem,saveItem,validateUser,fetchUser}=require('../controllers/authController')

router.use(cors({
    credentials:true,
     origin:'http://localhost:5173',
     optionSuccessStatus:200,
}))

router.get('/',test);
router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/forgot-password',forgetPassword);
router.post('/reset-password/:id/:token',resetPassword);
router.get('/profile',getProfile);
router.get('/get-items/:email',getItems);
router.put('/update-item/:id',updateItem)
router.post('/save-item',saveItem);
router.delete('/delete-item/:id',deleteItem);
router.get('/validateUser',validateUser)
router.get('/get-users/:email',fetchUser)
router.post('/update-password',updatePassword)

module.exports = router;