-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.16 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             10.1.0.5464
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for auction_db
CREATE DATABASE IF NOT EXISTS `auction_db` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `auction_db`;

-- Dumping structure for table auction_db.bid
CREATE TABLE IF NOT EXISTS `bid` (
  `Bidder_ID` int(11) NOT NULL,
  `Time` int(11) NOT NULL,
  `Amount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table auction_db.bid: ~0 rows (approximately)
/*!40000 ALTER TABLE `bid` DISABLE KEYS */;
/*!40000 ALTER TABLE `bid` ENABLE KEYS */;

-- Dumping structure for table auction_db.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `UserID` varchar(80) NOT NULL,
  `token` varchar(80) NOT NULL,
  `UserTYPE` varchar(80) NOT NULL,
  `Password` varchar(80) NOT NULL,
  `First_Name` varchar(80) NOT NULL,
  `Last_Name` varchar(80) NOT NULL,
  `Seller_Rating` varchar(80) NOT NULL,
  `Bidder_Rating` varchar(80) NOT NULL,
  `Email` varchar(80) NOT NULL,
  `Address` varchar(80) NOT NULL,
  `GPS` varchar(80) NOT NULL,
  `VAT` varchar(80) NOT NULL,
  KEY `Index 1` (`id`),
  KEY `Index 2` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Dumping data for table auction_db.user: ~1 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `UserID`, `token`, `UserTYPE`, `Password`, `First_Name`, `Last_Name`, `Seller_Rating`, `Bidder_Rating`, `Email`, `Address`, `GPS`, `VAT`) VALUES
	(1, 'test', '', '1', 'blabla', 'Konstantinos', 'Koukaksi', '5', '4', 'kkoukakis@windowslive.com', 'Salamina', '1234123', '012345567');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

-- Dumping structure for table auction_db.users
CREATE TABLE IF NOT EXISTS `users` (
  `UserID` varchar(50) NOT NULL,
  `Approved` int(11) NOT NULL,
  `Admin` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table auction_db.users: ~0 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
