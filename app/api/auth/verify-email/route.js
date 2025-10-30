import dbConnect from "@/lib/dbConnect";
import { catchError, response } from "@/lib/helperFunction";
import User from "@/models/User";
import { jwtVerify } from "jose";
import { isValidObjectId } from "mongoose";

export async function POST(request){
    try {
        await dbConnect()
        const { token } = await request.json()

        if(!token){
            return response(false, 400, 'Missing token.')
        }

        const secret = new TextEncoder().encode(process.env.SECRET_KEY)
        const decoded = await jwtVerify(token, secret)
        const userId = decoded.payload.userId
        console.log(decoded)
        if(!isValidObjectId(userId)){
            return response(false, 400,'Invalid user Id')
        }

        //get user
        const user = await User.findById(userId)
        if(!userId){
            return response(false, 404, 'User not found.' )
        }

        user.isEmailVerified = true
        await user.save()

        return response(true,200,'User email verification is done.')
        
    } catch (error) {
        return catchError(error)
    }
}