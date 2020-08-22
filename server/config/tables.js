'use strict';

var tables = {
	users : (
		"CREATE TABLE `users` (" +
		" `id` int(11) NOT NULL AUTO_INCREMENT," +
		" `username` varchar(20) NOT NULL," +
		" `first_name` varchar(25) NOT NULL," +
		" `last_name` varchar(25) NOT NULL," + 
		" `email` varchar(60) NOT NULL," +
		" `password` varchar(100) NOT NULL," +
		" `pro_pic` varchar(250)," +
		" `verified` int(2) NOT NULL DEFAULT 0," +
		" `admin` int (1) NOT NULL DEFAULT 0," +
		" PRIMARY KEY (`id`)" +
		") ENGINE=InnoDB"
	)
}	
module.exports = tables;
