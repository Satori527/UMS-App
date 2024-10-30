import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose, { Schema } from "mongoose";


const userSchema = new Schema(
    {
        first_name: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        last_name: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String,
            //required: true
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
            required: true
        },
        address: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        refreshToken: {
            type: String
        }
    }
)

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    console.log(password, this.password);
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.name,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)


/*
"user": "user@gmail.com",

    "start": {

        "$date": "2024-08-30T03:30:00.000Z"

    },

    "end": {

        "$date": "2024-08-30T07:00:00.000Z"

    },

    "duration": 30,

    "scheduledSlots": [

    ]

}
*/

/*
{

    "user": "user@gmail.com",

    "start": {

        "$date": "2024-08-30T03:30:00.000Z"

    },

    "end": {

        "$date": "2024-08-30T04:00:00.000Z"

    },

    "duration": 30,

    "scheduledSlots": [

        {

            "start": {

                "$date": "2024-08-30T03:30:00.000Z"

            },

            "end": {

                "$date": "2024-08-30T04:00:00.000Z"

            },

            "attendees": [

{

            "name": "siri",

            "email": "siri@myparticipants.com",

                        }

]

        }

    ]

}

*/