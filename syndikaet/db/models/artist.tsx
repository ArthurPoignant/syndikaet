import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from './index';

interface ArtistAttributes {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

interface ArtistCreationAttributes extends Optional<ArtistAttributes, 'id'> {}

class Artist extends Model<ArtistAttributes, ArtistCreationAttributes> implements ArtistAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public imageUrl!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Artist.init(
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
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'artists',
  }
);

export default Artist;
