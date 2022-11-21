import Address from "../models/Address.js";
import Admin from "../models/Admin.js";
import DonorInfo from "../models/DonorInfo.js";
import DonorRequest from "../models/DonorRequest.js";
import Review from "../models/Review.js";
import User from "../models/User.js";
import bcrypt from "bcrypt"

// LIST OF FUNCTIONS (CRUD & VALIDATION)

const saltRounds = 10;

export const createNewUser = async (req, res) => {
    try {
        // console.log("BODY: ", req.body.data)

        const checkUser = await User.findOne({
            where: {
                email: req.body.data.personal.email
            }
        });

        if(checkUser){
            res.status(400).json({ message: "Email is already registered!" });
        } else if(req.body.data.security.password !== req.body.data.security.confirmPassword){
            res.status(400).json({ message: "Passwords does not match!" });
        } else {

            const userData = {
                firstname: req.body.data.personal.firstName,
                lastname: req.body.data.personal.lastName,
                middlename: req.body.data.personal.middleName,
                gender: req.body.data.personal.gender,
                age: req.body.data.personal.age,
                mobileNumber: req.body.data.personal.mobileNo,
                email: req.body.data.personal.email,
                bloodGroup: req.body.data.security.bloodGroup,
                password: bcrypt.hashSync(req.body.data.security.password, saltRounds),
                shortBio: req.body.data.personal.bio,
            }
            console.log(userData);

            const user = await User.create(userData);

            const addressData = {
                userID: user.id,
                region: req.body.data.address.region,
                province: req.body.data.address.province,
                city: req.body.data.address.city,
                barangay: req.body.data.address.barangay,
                addressLine1: req.body.data.address.line1,
                addressLine2: req.body.data.address.line2,
            }
            console.log(addressData);

            const address = await Address.create(addressData);

            const donorInfoData = {
                userID: user.id,
            }
            console.log(donorInfoData);

            const donor = await DonorInfo.create(donorInfoData);

            res.status(200).json({ message: "Register Success!" });
        }

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const validateUserLogin = async (req, res) => {
    try {
        // console.log("BODY: ", req.body.data)

        const checkUser = await User.findOne({
            where: {
                email: req.body.data.email
            }
        });

        if(!checkUser){
            res.status(400).json({ message: "Incorrect Email or Password!" });
        } else if(!(bcrypt.compareSync(req.body.data.password, checkUser.password ))){
            res.status(400).json({ message: "Incorrect Email or Password!" });
        } else {
            res.status(200).json({ message: "Login Success!", checkUser });
        }

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const findUserByID = async (req, res) => {
    try {
        console.log("BODY: ", req.body.data)

        const user = await User.findOne({
            where: {
                id: req.body.data.id
            }
        });

        const address = await Address.findOne({
            where: {
                userID: req.body.data.id
            }
        });

        const donorInfo = await DonorInfo.findOne({
            where: {
                userID: req.body.data.id
            }
        });

        const acceptDonorReq = await DonorRequest.findAll({
            where: {
                donorID: req.body.data.id
            }
        });

        const seekDonorReq = await DonorRequest.findAll({
            where: {
                seekerID: req.body.data.id
            }
        });

        const allReviews = await Review.findAll();

        if(!user){
            res.status(400).json({ message: "Error loading user's profile data!" });
        } else {
            res.status(200).json({ message: "Retrieve Success!", userProfile: {
                user,
                address,
                donorInfo,
                acceptDonorReq,
                seekDonorReq,
                allReviews,
            }});
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const updateAccount = async (req, res) => {
    try {
        console.log("BODY: ", req.body.data)

        const user = await User.update({
            status: req.body.data.tabAccount.status,
            profilePicture: req.body.data.tabAccount.pic,
        },{
            where: {
                id: req.body.data.id
            }
        });

        if(!user){
            res.status(400).json({ message: "Failed to Update Profile!" });
        } else {
            res.status(200).json({ message: "Profile Updated!", });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const updatePersonal = async (req, res) => {
    try {
        console.log("BODY: ", req.body.data)

        const user = await User.update({
            firstname: req.body.data.tabPersonal.firstName,
            middlename: req.body.data.tabPersonal.middleName,
            lastname: req.body.data.tabPersonal.lastName,
            gender: req.body.data.tabPersonal.gender,
            age: req.body.data.tabPersonal.age,
            mobileNumber: req.body.data.tabPersonal.contact,
            email: req.body.data.tabPersonal.email,
            shortBio: req.body.data.tabPersonal.bio,
        },{
            where: {
                id: req.body.data.id
            }
        });

        if(!user){
            res.status(400).json({ message: "Failed to Update Profile!" });
        } else {
            res.status(200).json({ message: "Profile Updated!", });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const updateAddress = async (req, res) => {
    try {
        console.log("BODY: ", req.body.data)

        const address = await Address.update({
            region: req.body.data.tabAddress.region,
            province: req.body.data.tabAddress.province,
            city: req.body.data.tabAddress.city,
            barangay: req.body.data.tabAddress.barangay,
            addressLine1: req.body.data.tabAddress.line1,
            addressLine2: req.body.data.tabAddress.line2,
        },{
            where: {
                userID: req.body.data.id
            }
        });

        if(!address){
            res.status(400).json({ message: "Failed to Update Profile!" });
        } else {
            res.status(200).json({ message: "Profile Updated!", });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const updateSocial = async (req, res) => {
    try {
        console.log("BODY: ", req.body.data)

        const user = await User.update({
            linkFB: req.body.data.tabSocial.facebook,
            linkIG: req.body.data.tabSocial.instagram,
            linkTW: req.body.data.tabSocial.twitter,
        },{
            where: {
                id: req.body.data.id
            }
        });

        if(!user){
            res.status(400).json({ message: "Failed to Update Profile!" });
        } else {
            res.status(200).json({ message: "Profile Updated!", });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const updateHealth = async (req, res) => {
    try {
        console.log("BODY: ", req.body.data)

        const user = await User.update({
            bloodGroup: req.body.data.tabHealth.bloodGroup,
        },{
            where: {
                id: req.body.data.id
            }
        });

        const health = await DonorInfo.update({
            healthStatus: req.body.data.tabHealth.status,
            healthConditions: req.body.data.tabHealth.conditions,
        },{
            where: {
                userID: req.body.data.id
            }
        });

        if(!health && !user){
            res.status(400).json({ message: "Failed to Update Profile!" });
        } else {
            res.status(200).json({ message: "Profile Updated!", });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}