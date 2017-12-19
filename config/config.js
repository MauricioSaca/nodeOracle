var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'CRUD NodeJs and Oracle'
    },
    oracleCredentials: {
    	user: process.env.NODE_ORACLEDB_USER || 'LOCAL_SQUEME',
    	password: process.env.NODE_ORACLEDB_PASSWORD || 'oracle_12c',
    	connectString: process.env.NODE_ORACLEDB_CONNECTIONSTRING || 'localhost/XE',
    	// Max rows number when fetching data from Result Set
    	numRows: 20
    },
    messages: {
    	ERR_DB_GET_POOL: 'Can not connect to DB or get POOL fail.',
    	ERR_DB_GET_CONNECTION: 'Can not connect to DB or get CONNECTION fail.'
    },
    port: process.env.PORT || 3000,
  },

  test: {
    root: rootPath,
    app: {
      name: 'home-saca-documents-node-project'
    },
    port: process.env.PORT || 3000,
  },

  production: {
    root: rootPath,
    app: {
      name: 'home-saca-documents-node-project'
    },
    port: process.env.PORT || 3000,
  }
};

module.exports = config[env];
