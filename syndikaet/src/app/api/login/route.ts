import sequelize from '../../../../db/models/index';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import User from '../../../../db/models/user'; // Ensure the path to your model is correct

export async function POST(req: Request) {
  await sequelize.sync();
  try {
    const { email, password } = await req.json();
    
    // Find the user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log('User not found');
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const isPasswordValid = bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log('Incorrect password');
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // If the login is successful
    console.log('Login successful from the backend');
    return NextResponse.json(
      { message: 'Login successful', user: { id: user.id, email: user.email } },
      { status: 200 }
    );

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
