const Sequelize = require('sequelize');
const _  = require('lodash');
const Faker = require('faker');
var Conn = null;

if (process.env.HEROKU_POSTGRESQL_BRONZE_URL) {
  // the application is executed on Heroku ... use the postgres database
  Conn = new Sequelize(process.env.HEROKU_POSTGRESQL_BRONZE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    port: match[4],
    host: match[3],
    logging: true //false
  });
} else {
  Conn = new Sequelize(
    'relay',
    'postgres',
    'postgres',
    {
      dialect: 'postgres',
      host: 'localhost'
    }
  );
}
const Person = Conn.define('person', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName:{
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }

  }
});

const Post = Conn.define('post', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

Person.hasMany(Post)
Post.belongsTo(Person)

Conn.sync({force: true}).then(() => {

  _.times(10, () => {
    return Person.create({
      firstName: Faker.name.firstName(),
      lastName: Faker.name.lastName(),
      email: Faker.internet.email()
    }).then(person => {
      return person.createPost({
        title: `Sample title by ${person.firstName}`,
        content: `This is a sample article`
      })
    });
  });
});

module.exports = Conn