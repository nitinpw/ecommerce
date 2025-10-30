import { SignJWT } from "jose";
import { z } from "zod";
import { emailVerificationLink } from "@/email/emailVerificationLink";
import dbConnect from "@/lib/dbConnect";
import { catchError, response } from "@/lib/helperFunction";
import { sendMail } from "@/lib/sendMail";
import User from "@/models/User";

export async function POST(request){
    try {
        await dbConnect();

        const validationSchema = z.object({
            name: z.string().min(1, "Name is required"),
            email: z.string().email("Invalid email"),
            password: z.string().min(6, "Password must be at least 6 characters")
        });

        const data = await request.json();
        const validatedData = validationSchema.safeParse(data);

        if(!validatedData.success){
            return response(false, 400, 'Invalid or missing input field.', validatedData.error.issues);
        }

        const {name, email, password} = validatedData.data;

        const checkUser = await User.exists({email});
        if(checkUser){
            return response(false, 409, 'User is already registered.');
        }

        const newUser = new User({
            name,
            email,
            password
        });

        await newUser.save();

        const secret = new TextEncoder().encode(process.env.SECRET_KEY);
        const token = await new SignJWT({userId: newUser._id.toString()})
            .setIssuedAt()
            .setExpirationTime('1h')
            .setProtectedHeader({alg: 'HS256'})
            .sign(secret);

        const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${token}`;

        await sendMail(
            'Email Verification request from Ecommerce site', 
            email, 
            emailVerificationLink(verificationUrl)
        );

        return response(true, 201, 'Registration success, Please verify your email address.');

    } catch (error) {
        return catchError(error);
    }
}
