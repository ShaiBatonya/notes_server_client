const router  = require('express').Router();
const { userRegisterValidation, userLoginValidation } = require('../middleware/validations');

const {
    getAll,
    getById,
    updateById,
    deleteById,
    register,
    login,
    authUser
} = require(`../controllers/users.controller`);

router.post('/register',userRegisterValidation, register);
router.post('/login',userLoginValidation, login);
router.get('/all', getAll);
router.get('/get_by_id/:id', getById);
router.put('/update_by_id/:id', updateById);
router.delete('/delete_by_id/:id', deleteById);
router.get('/auth',authUser);


module.exports = router;