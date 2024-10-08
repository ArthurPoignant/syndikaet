import sequelize from '../../../../db/models/index';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import User from '../../../../db/models/user'; // Assurez-vous que le chemin vers votre modèle est correct

export async function POST(req: Request) {
    await sequelize.sync();
  try {
    const { email, password } = await req.json(); // Remplacer "username" par "email"

    console.log('Email:', email, 'Password:', password); // Log pour déboguer

    // Recherche de l'utilisateur avec l'email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log('Utilisateur non trouvé');
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Vérification du mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(isPasswordValid)

    if (!isPasswordValid) {
      console.log('Mot de passe incorrect');
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    if (!isPasswordValid) {
      console.log('Mot de passe incorrect');
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Si la connexion est réussie
    console.log('Connexion réussie');
    return NextResponse.json({ message: 'Login successful', user: { id: user.id, email: user.email } }, { status: 200 });
   
  } catch (error) {
    console.error('Erreur de connexion:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
