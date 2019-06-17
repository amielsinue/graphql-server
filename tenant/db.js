
const config = require('./config').config;

const Pool = require('pg').Pool;

const dbConfig = {
  'user': config.mint_access_db.user,
  'host': config.mint_access_db.host,
  'database': config.mint_access_db.name,
  'password': config.mint_access_db.password,
  'port': config.mint_access_db.port
};
// console.log("dbConfig", dbConfig);

const MintAccessDBConnection =  new Pool(dbConfig);

const getDefaultUserInfo = function(){
  const query =  `
  SELECT 
    default_db_user_for_graphql as mint_user,
    pgp_sym_decrypt(db_password_for_graphql::BYTEA, $1) AS mint_password,
    pgp_sym_decrypt(graphql_jwt_secret::BYTEA, $2) as mint_jwt
  FROM 
    tenants    
  WHERE tenant_key = $3`;

  const onSuccess = (result, resolve, reject) => {
    if(result.rowCount == 0){
      message = `Mint Default User not found on our DB`;
      console.log(message)
      reject(message)
    }else{
      resolve(result.rows[0])
    }
  };

  const onFailure = (errors, reject) => {
    let message = `Something went wrong while trying to connect to the db`;
    console.log(message, errors);
    reject(message);
  };

  return new Promise(function(resolve, reject){

    MintAccessDBConnection.query(query, [config.mint_password_key, config.mint_password_key, config.tenant_key])
      .then(res => onSuccess(res, resolve, reject))
      .catch(errors => onFailure(errors, reject))
  });

};

const getUserInfo = function(mint_user_id){
  const query =  `
  SELECT
    mint_user_id as mint_user,
    pgp_sym_decrypt(mint_structured_data_password::BYTEA, $1) AS mint_password,
    pgp_sym_decrypt(graphql_jwt_secret::BYTEA, $2) as mint_jwt
  FROM 
    mint_users 
    left join tenants on tenants.tenant_key = mint_users.tenant_key    
  WHERE mint_user_id = $3`;

  // probably change this and use a different table

  const onSuccess = (result, resolve, reject) => {
    if(result.rowCount == 0){
      let message = `Mint User ${mint_user_id} does not exists on our DB`
      console.log(message)
      reject(message)
    }else{
      resolve(result.rows[0])
    }
  };

  const onFailure = (errors, reject) => {
    let message = `Something went wrong while trying to connect to the db`;
    console.log(message, errors);
    reject(message);
  };

  return new Promise(function(resolve, reject){

    MintAccessDBConnection.query(query, [config.mint_password_key, config.mint_password_key, mint_user_id])
      .then(res => onSuccess(res, resolve, reject))
      .catch(errors => onFailure(errors, reject))
  });

};

module.exports.getUserInfo = getUserInfo;
module.exports.getDefaultUserInfo = getDefaultUserInfo;