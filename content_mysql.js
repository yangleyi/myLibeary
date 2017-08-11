var mysql = require('mysql');
var connection = mysql.createConnection({
	host 		: 'localhost',
	port 		: 3306,
	database 	: 'myjob',
	user  		: 'root',
	password 	: 'root'
});
var pool = mysql.createPool({
	host 		: 'localhost',
	port 		: 3306,
	database 	: 'myjob',
	user  		: 'root',
	password 	: 'root'
});
function handleDisconnect(){
	connection.connect(function(err){
		if(err) console.log('与MySQL数据库建立连接失败。');
		else{
			console.log('与MySQL数据库建立连接成功~~。');
			var userAddSql = 'INSERT INTO recruit(job_name,job_addr)values(?,?)';
			var userAddSql_Params = ['HTML5开发','河南开封'];
			connection.query(userAddSql,userAddSql_Params,function(err,result){
				if(err){
					console.log(err);
					return;
				}
				console.log('----------------------------');
				console.log(result);
				console.log('--------------------');
			})
		}
	});
}
connection.on('error',function(err){
	if(err.code === 'PROTOCOL_CONNECTION_LOST'){
		console.log('与MySQL数据库之间的连接丢失。');
		setTimeout(function(){
			handleDisconnect();
		},10000);
	}
	else{
		throw err;
	}
});
handleDisconnect();


// connection.connect(function(err){
// 	if(err) console.log('与MySQL数据库建立连接失败。');
// 	else {
// 		console.log('与MySQL数据库建立连接成功~~。');
// 		connection.end(function(err){
// 			if(err) console.log('关闭MySQL数据库失败。');
// 			else {
// 				console.log('关闭MySQL数据库成功。')
// 			}
// 		})
// 	}
// })