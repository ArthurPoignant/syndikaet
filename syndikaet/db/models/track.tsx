import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from './index';
import Artist from './artist';

interface TrackAttributes {
  id: number;
  title: string;
  artistId: number;
  price: number;
  releaseDate: Date;
  url: string;
}

interface TrackCreationAttributes extends Optional<TrackAttributes, 'id'> {}

class Track extends Model<TrackAttributes, TrackCreationAttributes> implements TrackAttributes {
  public id!: number;
  public title!: string;
  public artistId!: number;
  public price!: number;
  public releaseDate!: Date;
  public url!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Track.init(
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
    artistId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    releaseDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'tracks',
  }
);

Track.belongsTo(Artist, {
  foreignKey: 'artistId',
  as: 'artist',
});

export default Track;
