const oracledb = require('oracledb')
const config = require('../../config/config')
var pool = null
var openConnections = []

function createPool (cb) {
  if (pool) return cb()
  console.log('Created pool');
    var authInfo = {
    user: config.oracleCredentials.user,
    password: config.oracleCredentials.password,
    connectString: config.oracleCredentials.connectString
  }
  oracledb.createPool(authInfo, function (err, _pool) {
    if (err) {
      console.log(config.messages.ERR_DB_GET_POOL)
      return cb(err)
    }
    pool = _pool
    cb()
  })
}

function terminatePool (cb) {
  if (pool) {
    releaseOpenConnections(function () {
      pool.terminate(function (err) {
        if (err) console.log(err)
        pool = null
        console.log('Pool is terminated')
        cb()
      })
    })
  } else {
    cb()
  }
}

function releaseOpenConnections (cb) {
  var counter = openConnections.length
  if (counter === 0) return cb()
  openConnections.forEach(function (connection) {
    connection.release(function (err) {
      if (err) console.log(err)
      counter--
      if (counter === 0) return cb()
    })
  })
}

function execute (query, params, cb) {
  getConnection(function (err, connection) {
    if (err) return cb(err)
    console.log('・query:', query, '\n・params:', params)
    connection.execute(query, params, { autoCommit: true }, function (err, result) {
      if (err) {
        return cb(err.message)
      } else {
       releaseConnection(connection)
        return cb(true)
      }
    })
  })
}

function getConnection (cb) {
  createPool(function (err) {
    if (err)  return cb(err)
    pool.getConnection(function (err, connection) {
      if (err) {
        console.log(config.messages.ERR_DB_GET_CONNECTION)
        return cb(err)
      }
      openConnections.push(connection)
      cb(null, connection)
    })
  })
}

function releaseConnection (connection) {
  var index = openConnections.indexOf(connection)
  if (index >= 0) {
    openConnections.splice(index, 1)
  }
  connection.release(function (err) {
    if (err) console.log(err)
  })
}

function simpleExecute (query, params, cb) {
  execute(query, params, function (err, isSuccess) {
    if (err) {
      console.log(err)
      return cb([])
    }
    if (isSuccess) {
      cb(true)
    } else {
      cb(false);
    }
  })
}

exports = module.exports = simpleExecute
exports.execute = execute
exports.createPool = createPool
exports.terminatePool = terminatePool
exports.getConnection = getConnection
exports.releaseConnection = releaseConnection