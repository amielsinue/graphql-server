const { postgraphile } = require("postgraphile");
const express = require("express");
const app = express();


/*

1. Receive the mint_user_id + tenant_key
2. Get user/pass for the mint_structured_data db connection
2.1 Decrypt the password
3. Get the jwt_token from mint_access_control.tenants table
3.1 Decrypt the jwt_token



 */

let connection = 'postgres://tenant_one__mdd:123456@localhost:5434/mint_structured_data';

app.use(
  postgraphile(
    connection, {
      pgSettings: req => ({
        'ignoreRBAC': true,
        'extendedErrors': ['hint', 'detail', 'errcode'],
        'graphqlRoute': '/graphql',
        'graphiqlRoute': '/graphiql',
        'graphiql': true,
        'simpleCollections': 'only',
      }),
    })
);

app.listen(5001, ()=>{
  console.log(`App listening on port 5001`)
})