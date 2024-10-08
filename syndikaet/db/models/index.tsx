import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('syndikaet', 'root', 'root', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  logging: console.log,
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
