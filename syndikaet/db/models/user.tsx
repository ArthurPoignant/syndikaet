import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from './index';
import bcrypt from 'bcrypt';

// Define the attributes for the User model
interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string; // In practice, you should store a hashed password
  address?: string; // Optional
  phoneNumber?: string; // Optional
  isPremium: boolean; // Whether the user has a premium subscription
  role: 'user' | 'admin'; // Role of the user (either 'user' or 'admin')
}

// Define creation attributes for User (id is optional when creating new users)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Define the User model class
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public address?: string;
  public phoneNumber?: string;
  public isPremium!: boolean;
  public role!: 'user' | 'admin';

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the User model
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure email is unique
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isPremium: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Default to false
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'), // Enum type to define possible roles
      allowNull: false,
      defaultValue: 'user', // Default to 'user'
    },
  },
  {
    sequelize, // Use the Sequelize instance
    tableName: 'users',
  }
);

// Password hashing hook for security
User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});

export default User;
