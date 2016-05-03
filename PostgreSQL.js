/*! uw-db-postgresql - v0.0.2 - 2016-05-03 */function Connection(a,b){this.results=[],this.Client=a,this.end=function(){a.end(),b()},this.addResult=function(a){this.results.push(a)},this.getLastResult=function(){return this.results[this.results.length-1]}}function PostgresSQL(a){var b=this;b.connection=null;var c=function(a,c,d){LOG.debug(d||a);var e=Q.defer();return b.connection.Client.query(a,c,function(a,c){a?(LOG.error(a),e.reject(a)):(b.connection.addResult(c),e.resolve(b.connection))}),e.promise};b.open=function(){var c=UTIL.format("postgres://%s:%s@%s/%s",a.user,a.password,a.ip,a.dbname),d=Q.defer();return PG.connect(c,function(a,e,f){a?(LOG.error("Error creating connection ->"+a.message+" at "+c),d.reject(a)):(b.connection=new Connection(e,f),d.resolve(b.connection))}),d.promise},b.begin=function(){return c("BEGIN",null,"BEGIN")},b.commit=function(){return c("COMMIT",null,"COMMIT")},b.rollback=function(){return c("ROLLBACK",null,"ROLLBACK")},b.rollbackAndRelease=function(){return c("ROLLBACK",null,"ROLLBACK").then(function(a){b.end()})},b.end=function(){LOG.debug("END"),b.connection.end()},b.query=function(a,b){return c(a,b)},b.showLastResult=function(){return function(a){return LOG.info("RESULTS"),a}}}var UTIL=require("util"),PG=require("pg"),Q=require("q"),MODULE="PostgreSQL",LOG=require("uw-log").newInstance(MODULE);exports.newInstance=function(a){return new PostgresSQL(a)};