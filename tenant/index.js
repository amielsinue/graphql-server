/*

1. Receive the mint_user_id + tenant_key
2. Get user/pass for the mint_structured_data db connection
2.1 Decrypt the password
3. Get the jwt_token from mint_access_control.tenants table
3.1 Decrypt the jwt_token
*/
const { tenant_key } = require('./config').config
const getUserInfo = require('./db').getUserInfo;
const startServer = require('./server').start;
// const getDefaultUserInfo = require('./db').getDefaultUserInfo;



let mint_user_id = tenant_key + '__mdd'; // remove __mdd
// throw exception if we don't have tenant_key???

getUserInfo(mint_user_id).then(info => {
  // instantiate postgraphfile
  startServer(info);
  console.log("starting postgraphfile");
}).catch(error => {
  console.log("we could not start server due to:", error);
})