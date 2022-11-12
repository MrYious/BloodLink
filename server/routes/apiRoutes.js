import {
    createNewUser
} from "../controllers/mainController.js";
import express from "express";

// LIST OF ENDPOINTS
const apiRouter = express.Router();

// router.post('/login', validateUserByEmail);
apiRouter.post('/register', createNewUser)
// router.patch('/updateProfile', updateUserProfile);
// router.get('/donors', getAllDonors);
// router.post('/request', createRequest);
// router.patch('/request', updateRequest);
// router.post('/requestList', getRequestsByID);
// router.post('/seedusers', seedUser);

export default apiRouter;