import {
    createNewUser
} from "../controllers/mainController.js";
import express from "express";

// LIST OF ENDPOINTS
const apiRouter = express.Router();

// apiRouter.post('/login', validateUserByEmail);
apiRouter.post('/register', createNewUser)
// apiRouter.patch('/updateProfile', updateUserProfile);
// apiRouter.get('/donors', getAllDonors);
// apiRouter.post('/request', createRequest);
// apiRouter.patch('/request', updateRequest);
// apiRouter.post('/requestList', getRequestsByID);
// apiRouter.post('/seedusers', seedUser);

export default apiRouter;