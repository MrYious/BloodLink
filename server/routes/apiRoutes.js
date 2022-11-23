import {
    createNewUser,
    findUserByID,
    getAllUsers,
    updateAccount,
    updateAddress,
    updateHealth,
    updatePersonal,
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
// apiRouter.post('/request', createRequest);
// apiRouter.patch('/request', updateRequest);
// apiRouter.post('/requestList', getRequestsByID);
// apiRouter.post('/seedusers', seedUser);

export default apiRouter;