const { postgraphile } = require("postgraphile");
const express = require("express");
const app = express();

app.use(
  postgraphile(process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost/relay', 'public', {
    pgSettings: req => ({
      'ignoreRBAC': true,
      'extendedErrors': ['hint', 'detail', 'errcode'],
      'graphqlRoute': '/graphql',
      'graphiqlRoute': '/graphiql',
      'graphiql': true,
      'simpleCollections': 'only'
    }),
  })
);
app.listen(process.env.PORT || 3000);
