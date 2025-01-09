import { NextResponse } from "next/server";
import db from '../../../libs/db'
import bcrypt from 'bcrypt';

export async function POST(request){
    try{

        const data = await request.json();

        const userFound = await db.user.findUnique({
            where: {
                email: data.email
            }
        })
    
        if(userFound){
            return NextResponse.json({message: "Email already exists"}, {status: 400});
        }
    
        const usernameFound = await db.user.findUnique({
            where: {
                username: data.username
            }
        })
    
        if(usernameFound){
            return NextResponse.json({message: "Username already exists"}, {status: 400});
        }
    
        console.log(data);
    
        // Contraseña encriptada
        const hashedPassword = await bcrypt.hash(data.password, 10);
    
        const newUser = await db.user.create({
            data: {
                username: data.username,
                email: data.email,
                password: hashedPassword
            }
        });
    
        const { password, ...user } = newUser;
    
        return NextResponse.json(user);

    }catch (error){
        return NextResponse.json(
            {
                message: error.message
            }, 
            {
                status: 500
            });
    }
}