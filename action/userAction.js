"use server"
import User from "@/models/User"
import { connectDB } from "@/db/connectDB"
import bcrypt from "bcryptjs";



export const createAccount=async(data)=>{
    await connectDB()
    try {
      data.password= await bcrypt.hash(data.password,12)
      console.log(data.password)
      await User.create(data);
      return JSON.parse(JSON.stringify({status:'success'}))
        
    } catch (error) {
        return JSON.parse(JSON.stringify({status:'failed',error}))
    }
   
}