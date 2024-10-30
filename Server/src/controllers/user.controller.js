import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const helloTest = asyncHandler( async (req, res) => {
    res.status(200).send("Hello World");
})

const registerUser = asyncHandler( async (req, res) => {

    const {firstName, lastName, email,  password, address, phone} = req.body;

    console.log("email: ",email);

    if (
    ([firstName, lastName, email, password, address, phone].some((field) => field?.trim() === ""))
    ) {
        throw new ApiError(400, "All fields are required")
    }
    /*
    else{
        res.status(200).json({
            "Name": name,
            "Email": email,
            "Role": role,
            "avatar": `https://robohash.org/${email}\.png?size=50x50&set=set1`,
            "availability": availability
        })
    }
    */
    
    const existingUser = await User.findOne({ email: email })

    if(existingUser){
        throw new ApiError(409, "User with email already exists")
    }

    const createdUser = await User.create({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        avatar:`https://robohash.org/${email}\.png?size=50x50&set=set1`,
        address,
        phone,
        role: "user",
    })

    if(!createdUser){
        throw new ApiError(400, "User not created")
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully")
    )
    
})

const loginUser = asyncHandler( async (req, res) => {
    const {email, password} = req.body
    console.log(email);

    console.log(password,"/n");

    if (!email) {
        throw new ApiError(400, "username or email is required")
    }

    const user = await User.findOne({email:email})

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        console.log("Invalid user credentials");
        const err = new ApiError(401, "Invalid user credentials")
        res.status(401).json(err)
    throw err
    }

    const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

    console.log("accessToken",accessToken," refreshToken",  refreshToken);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )

})

const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
            
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})

const createUser = asyncHandler( async (req, res) => {
    const {firstName, lastName, email, address, phone, role} = req.body;
    console.log("email: ",email);
    console.log("firstName: ",firstName);
    console.log("lastName: ",lastName);
    console.log("address: ",address);
    console.log("phone: ",phone);
    console.log("role: ",role);
    if (
    ([firstName, lastName, email, address, phone, role].some((field) => field?.trim() === ""))
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existingUser = await User.findOne({ email: email })

    if(existingUser){
        throw new ApiError(409, "User with email already exists")
    }

    const user = await User.create({
        first_name: firstName,
        last_name: lastName,
        email,
        avatar:`https://robohash.org/${email}\.png?size=50x50&set=set1`,
        address,
        phone,
        password: "password",
        role
    })

    res.status(200).json(new ApiResponse(200, user, "User created successfully"))

})

const getUsers = asyncHandler( async (req, res) => {

    const {page = 1, limit = 10} = req.query
    const users = await User.find({})
    .skip((page-1)*limit)
    .limit(limit)
    .select("-password -refreshToken -__v -id")
    res.status(200).json(new ApiResponse(200, users, "Users fetched successfully"))
})

const getUserById = asyncHandler( async (req, res) => {
    const {id} = req.query;
    const user = await User.findById(id).select("-password -refreshToken -__v -id")
    
    res.status(200).json(new ApiResponse(200, user, "User fetched successfully"))
})

const getUsersByName = asyncHandler( async (req, res) =>{
    const {search = "", page = 1, limit = 10} = req.query
    console.log(search)
    const users = await User.find({
        $or: [
            {first_name: {$regex: search, $options: "i"}},
            {last_name: {$regex: search, $options: "i"}}
        ]
    }).skip((page-1)*limit)
    .limit(limit)
    .select("-password -refreshToken -__v -id")
    
    
    console.log(users)
    res.status(200).json(new ApiResponse(200, users, "User fetched successfully"))
})

const updateUserInfo = asyncHandler( async (req, res) => {
    const {firstName, lastName, email, phone, address, avatar,id,role} = req.body
    console.log("role: ",role);
    const user = await User.findByIdAndUpdate(id, {
        $set: {
            first_name: firstName,
            last_name: lastName,
            email,
            phone,
            address,
            avatar,
            role
        }
    }, {new: true}).select("-password -refreshToken -__v -id")
    res.status(200).json(new ApiResponse(200, user, "User updated successfully"))
})

const deleteUser = asyncHandler( async (req, res) => {
    const {id} = req.query
    const user = await User.findByIdAndDelete(id)
    res.status(200).json(new ApiResponse(200, user, "User deleted successfully"))
})

const updateAccountDetails = asyncHandler(async(req, res) => {
    const {fullName, email} = req.body

    if (!fullName || !email) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName,
                email: email
            }
        },
        {new: true}
        
    ).select("-password")

    return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"))
});


export { createUser, deleteUser, getUserById, getUsers, getUsersByName, helloTest, loginUser, logoutUser, refreshAccessToken, registerUser, updateAccountDetails, updateUserInfo };

