import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from './index'; // Import the Sequelize instance

// Define the attributes for the Merch model
interface MerchAttributes {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
}

// Define creation attributes for Merch (id is optional when creating new merch)
interface MerchCreationAttributes extends Optional<MerchAttributes, 'id'> {}

// Define the Merch model class
class Merch extends Model<MerchAttributes, MerchCreationAttributes> implements MerchAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public stock!: number;
  public imageUrl!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the Merch model
Merch.init(
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2), // Price can be represented as a decimal
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // Use the Sequelize instance
    tableName: 'merch',
  }
);

export default Merch;
