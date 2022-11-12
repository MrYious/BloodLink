// import User from "../models/User.js";

// LIST OF FUNCTIONS (CRUD & VALIDATION)

export const createUser = async (req, res) => {
    // try {
    //     const checkUser = await User.findOne({
    //         where: {
    //             email: req.body.user.email
    //         }
    //     });
    //     if(checkUser){
    //         res.status(400).json({ message: "Email is already registered" });
    //     }
    //     console.log("BODY: ", req.body)

    //     const address = await Address.create(req.body.address);
    //     console.log("New Address ID ", address.id);
    //     console.log("Address Created")

    //     req.body.user.password = bcrypt.hashSync(req.body.user.password, saltRounds);
    //     req.body.user.addressID = address.id;
    //     const user = await User.create(req.body.user);
    //     console.log("New User ID ", user.id);
    //     console.log("User Created");
    //     console.log("User Created",req.body.accountType);

    //     if(req.body.user.accountType === 'Donor'){
    //         const donor = await DonorInfo.create({donorID: user.id});
    //         console.log("New Donor ID", donor.id);
    //         console.log("DonorInfo Created");
    //     }

    //     res.status(200).json({ message: "Complete User Created" });
    // } catch (error) {
    //     res.status(400).json({ message: error.message });
    // }
}