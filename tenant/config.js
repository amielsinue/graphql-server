
const config = {
  "tenant_key": process.argv[2],
  "graphql_port": 5001, // this should come from db (probably)
  "jwt_secret": process.env.JWT_SECRET || 'apostoles',
  "jwt_algorithm": process.env.JWT_ALGORITHM || 'HS256',
  "mint_access_db":{
    "host": process.env.MINT_DBHOST_AC || 'localhost',
    "name": process.env.MINT_DBNAME_AC || 'mint_access_control',
    "user": process.env.MINT_DBUSER_AC || 'mint',
    "password": process.env.MINT_DBPASS_AC || '123456', // This can be taken from pgpass if needed
    "port": process.env.MINT_DBPORT_AC || 5433
  },
  // TODO:
  // - DBs will be in the same server. so use the default values for (port)
  // - Use the standar ENV var names
  // - Test a read replica and see if auth is still working...
  "mint_data_db": {
    "host": process.env.MINT_DBHOST_SD || 'localhost',
    "name": process.env.MINT_DBNAME_SD || 'mint_structured_data',
    "port": process.env.MINT_DBPORT_SD || 5434
  },
  "mint_password_key": process.env.MINT_PASSWORD_KEY || 'apostoles'
};


module.exports.config = config;