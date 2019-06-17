const config = require('./config').config;
const { postgraphile } = require("postgraphile");
const express = require("express");
const app = express();



const start = (connInfo) => {
  let { host, port, name } = config.mint_data_db;
  let { mint_user, mint_password } = connInfo ;
  const connection = `postgres://${mint_user}:${mint_password}@${host}:${port}/${name}`;

  // console.log("postgraphile data", [
  //   connInfo,
  //   connection,
  //   host,
  //   port,
  //   name,
  //   mint_user,
  //   mint_password
  // ]);
  app.use(
    postgraphile(
      connection, {
      pgSettings: req => ({
        // 'ignoreRBAC': true,
        // 'extendedErrors': ['hint', 'detail', 'errcode'],
        // 'graphqlRoute': '/graphql',
        // 'graphiqlRoute': '/graphiql',
        // 'graphiql': true,
        // 'simpleCollections': 'only',
        // "jwtSecret": config.jwt_secret,
        // "jwtVerifyOptions": { algorithms: config.jwt_algorithm }
      }),
    })
  );
  app.listen(config.graphql_port, ()=>{
    console.log(`App listening on port ${config.graphql_port}`)
  })
};


module.exports.start = start;