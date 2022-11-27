import {
    createNewRequest,
    createNewUser,
    findUserByID,
    getAllUsers,
    getRequest,
    updateAccount,
    updateAddress,
    updateHealth,
    updatePersonal,
    updateRequest,
    updateSocial,
    validateUserLogin
} from "../controllers/mainController.js";

import express from "express";

// LIST OF ENDPOINTS
const apiRouter = express.Router();

apiRouter.post('/login', validateUserLogin);
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
// apiRouter.post('/seedusers', seedUser);

export default apiRouter;