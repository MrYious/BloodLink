import {
    createNewUser,
    findUserByID,
    validateUserLogin
} from "../controllers/mainController.js";

import express from "express";

// LIST OF ENDPOINTS
const apiRouter = express.Router();

apiRouter.post('/login', validateUserLogin);
apiRouter.post('/register', createNewUser)
apiRouter.post('/getUserByID', findUserByID);
// apiRouter.get('/donors', getAllDonors);
// apiRouter.post('/request', createRequest);
// apiRouter.patch('/request', updateRequest);
// apiRouter.post('/requestList', getRequestsByID);
// apiRouter.post('/seedusers', seedUser);

export default apiRouter;