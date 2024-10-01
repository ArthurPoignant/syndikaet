import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from './index'; // Import the Sequelize instance

// Define the attributes for the News model
interface NewsAttributes {
  id: number;
  title: string;
  content: string;
  author: string;
  publishedDate: Date;
  imageUrl: string;
}

// Define creation attributes for News (id is optional when creating new news)
interface NewsCreationAttributes extends Optional<NewsAttributes, 'id'> {}

// Define the News model class
class News extends Model<NewsAttributes, NewsCreationAttributes> implements NewsAttributes {
  public id!: number;
  public title!: string;
  public content!: string;
  public author!: string;
  public publishedDate!: Date;
  public imageUrl!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the News model
News.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publishedDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // Use the Sequelize instance
    tableName: 'news',
  }
);

export default News;
