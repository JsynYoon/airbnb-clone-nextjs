import bcrypt from "bcrypt";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  const body = await req.json();
  const { email, name, password } = body;
  
  //Todo: Hash the password.
  const hashedPassword = await bcrypt.hash(password, 12);

  //Todo: Create user.
  const user = await prisma.user.create({
    data: {
        email,
        name, 
        hashedPassword
    }
  })

  return NextResponse.json(user);
}
