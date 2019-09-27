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
  `Bidder_ID` varchar(50) NOT NULL,
  `Time` varchar(50) NOT NULL,
  `BidID` varchar(50) NOT NULL,
  `Amount` varchar(50) NOT NULL,
  `ItemID` varchar(50) NOT NULL,
  KEY `Index` (`BidID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table auction_db.bid: ~0 rows (approximately)
/*!40000 ALTER TABLE `bid` DISABLE KEYS */;
/*!40000 ALTER TABLE `bid` ENABLE KEYS */;

-- Dumping structure for table auction_db.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `CategoryID` int(11) NOT NULL,
  `Name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table auction_db.categories: ~0 rows (approximately)
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;

-- Dumping structure for table auction_db.item
CREATE TABLE IF NOT EXISTS `item` (
  `Item_ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `Category` varchar(50) NOT NULL,
  `Currently` double DEFAULT NULL,
  `Buy_Price` double NOT NULL,
  `First_Bid` double DEFAULT NULL,
  `Number_of_Bids` int(11) DEFAULT NULL,
  `Bids` varchar(50) DEFAULT NULL,
  `Location` varchar(50) NOT NULL,
  `Country` varchar(50) NOT NULL,
  `Started` varchar(50) DEFAULT NULL,
  `Ends` varchar(50) DEFAULT NULL,
  `Seller_ID` varchar(50) NOT NULL,
  `Sold` varchar(50) NOT NULL,
  `Description` varchar(150) DEFAULT NULL,
  KEY `Index 1` (`Item_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Dumping data for table auction_db.item: ~2 rows (approximately)
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` (`Item_ID`, `Name`, `Category`, `Currently`, `Buy_Price`, `First_Bid`, `Number_of_Bids`, `Bids`, `Location`, `Country`, `Started`, `Ends`, `Seller_ID`, `Sold`, `Description`) VALUES
	(1, 'Harry Potter', 'Books', NULL, 2, NULL, NULL, NULL, 'here', 'Greece', NULL, NULL, 'test', 'No', NULL),
	(2, 'Harry Potter 2\r\n', 'Books', NULL, 2, NULL, NULL, NULL, 'here', 'Greece', NULL, NULL, 'test', 'No', NULL);
/*!40000 ALTER TABLE `item` ENABLE KEYS */;

-- Dumping structure for table auction_db.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `UserID` varchar(80) NOT NULL,
  `token` varchar(200) DEFAULT NULL,
  `rtoken` varchar(200) DEFAULT NULL,
  `UserTYPE` varchar(80) NOT NULL,
  `Password` varchar(80) NOT NULL,
  `First_Name` varchar(80) NOT NULL,
  `Last_Name` varchar(80) NOT NULL,
  `Email` varchar(80) NOT NULL,
  `Phone` varchar(50) NOT NULL,
  `Address` varchar(80) NOT NULL,
  `Location` varchar(80) NOT NULL,
  `Seller_Rating` varchar(80) DEFAULT NULL,
  `Bidder_Rating` varchar(80) DEFAULT NULL,
  `GPS` varchar(80) DEFAULT NULL,
  `VAT` varchar(80) NOT NULL,
  `Approved` varchar(80) DEFAULT NULL,
  KEY `Index 1` (`id`),
  KEY `Index 2` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

-- Dumping data for table auction_db.user: ~2 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `UserID`, `token`, `rtoken`, `UserTYPE`, `Password`, `First_Name`, `Last_Name`, `Email`, `Phone`, `Address`, `Location`, `Seller_Rating`, `Bidder_Rating`, `GPS`, `VAT`, `Approved`) VALUES
	(1, 'test', '', '', '1', 'blabla', 'Konstantinos', 'Koukaksi', 'kkoukakis@windowslive.com', '', 'Salamina', '', '5', '4', '1234123', '012345567', NULL),
	(17, 'kouk', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtvdWsiLCJwYXNzd29yZCI6IjEyMyIsImlhdCI6MTU2OTYwNDgzNiwiZXhwIjoxNTY5NjA1NzM2fQ.maa6U2HHI42gDPOQBxtZjd2XgUHudfhW_ouhS4IYdNI', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtvdWsiLCJwYXNzd29yZCI6IjEyMyIsImlhdCI6MTU2OTYwNDgzNiwiZXhwIjoxNTY5NjkxMjM2fQ.4W2i8orgyGoqc9aSDQH42eOSrq1z1kdENA494-eBFQE', '0', '123', 'Konstantinos', 'Koukakis', 'kkoukakis@hotmail.com', '+306988394011', 'Telamonos 82', 'here', 'null', 'null', 'null', '012345678', '0');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
