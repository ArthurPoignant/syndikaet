import sequelize from '../../../../db/models/index';
import { NextRequest, NextResponse } from 'next/server';
import User from '../../../../db/models/user';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
    await sequelize.sync();
  try {
    const { name, email, password } = await req.json();

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'user',
    });

    // Respond with success
    return NextResponse.json({ message: 'User created successfully', userId: newUser.id }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ message: 'Error registering user' }, { status: 500 });
  }
}
