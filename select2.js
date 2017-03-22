var oracledb = require('oracledb');
var dbConfig = require('./dbconfig.js');
var promise = require('promise');
module.exports = {
	getEnvs : function(env, name){
		var selectQuery, selectAll = "SELECT id, env, name FROM config";
		var selectOne = "SELECT id, env, name FROM config where name = :name";
		if(name){
			param=[];
			param.push(name);
			selectQuery = selectOne;
		} else {
			selectQuery = selectAll;
			param=[];
		}
	return new Promise(function(resolve, reject){oracledb.getConnection(
	  {
		user          : dbConfig.user,
		password      : dbConfig.password,
		connectString : dbConfig.connectString
	  }).then(function(connection) {
		return connection.execute(selectQuery, param)
		  .then(function(result) {
			console.log(result.metaData);
			console.log(result.rows);
			resolve(result);
			return connection.close();
		  })
		  .catch(function(err) {
			console.log(err.message);
			reject(err);
			connection.close();
		  });
	  })
	  .catch(function(err) {
		reject(err);
		console.error(err.message);
		connection.close();
	})});
	  }

	/*function doRelease(connection)
	{
	  connection.close(
		function(err) {
		  if (err) {
			console.error(err.message);
		  }
		});
	}*/
}