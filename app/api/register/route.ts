import client from "@/libs/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password, name } = body;
  const emailRegex = new RegExp(
    /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
    "gm"
  );
  const passwordRegex = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
    "gm"
  );

  const isValidEmail = emailRegex.test(email);
  const isValidPassword = passwordRegex.test(password);

  if (!isValidEmail) {
    return NextResponse.json({ error: "Invalid Email" }, { status: 400 });
  }
  if (!isValidPassword) {
    return NextResponse.json(
      {
        error:
          "Password must contain minimum eight characters, at least one upper case letter, one lower case letter, one number and one special character",
      },
      { status: 400 }
    );
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await client.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });
  return NextResponse.json(user);
}
