import {
    createNewContent,
    createNewRequest,
    createNewUser,
    deleteContent,
    deleteRequest,
    findUserByID,
    getAllContents,
    getAllUsers,
    getRequest,
    updateAccount,
    updateAddress,
    updateContent,
    updateHealth,
    updatePersonal,
    updateRequest,
    updateSocial,
    validateAdminLogin,
    validateUserLogin,
} from "../controllers/mainController.js";

import express from "express";

// LIST OF ENDPOINTS
const apiRouter = express.Router();

apiRouter.post('/login', validateUserLogin);
apiRouter.post('/adminLogin', validateAdminLogin);
apiRouter.post('/register', createNewUser)
apiRouter.post('/getUserByID', findUserByID);
apiRouter.post('/getAllUsers', getAllUsers);
apiRouter.post('/updateAccountByID', updateAccount);
apiRouter.post('/updatePersonalByID', updatePersonal);
apiRouter.post('/updateAddressByID', updateAddress);
apiRouter.post('/updateSocialByID', updateSocial);
apiRouter.post('/updateHealthByID', updateHealth);
apiRouter.post('/request', createNewRequest);
apiRouter.patch('/request', updateRequest);
apiRouter.post('/getRequest', getRequest);
apiRouter.post('/deleteRequest', deleteRequest);
apiRouter.post('/content', createNewContent);
apiRouter.post('/getAllContents', getAllContents);
apiRouter.post('/updateContent', updateContent);
apiRouter.post('/deleteContent', deleteContent);

export default apiRouter;