-- MariaDB dump 10.19  Distrib 10.4.22-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: school
-- ------------------------------------------------------
-- Server version	10.4.22-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `classes`
--

DROP TABLE IF EXISTS `classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `classes` (
  `idClasse` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nomClasse` varchar(50) DEFAULT NULL,
  `groupe` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`idClasse`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes`
--

LOCK TABLES `classes` WRITE;
/*!40000 ALTER TABLE `classes` DISABLE KEYS */;
INSERT INTO `classes` VALUES (1,'X-BAC-DEV-1','1'),(2,'X-BAC-DEV-1','2'),(3,'X-BAC-CYB-1','1'),(4,'X-BAC-DEV-2','1'),(5,'X-BAC-DEV-2','2'),(6,'X-BAC-CYB-2','1'),(7,'X-BAC-CYB-2','2');
/*!40000 ALTER TABLE `classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cours`
--

DROP TABLE IF EXISTS `cours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cours` (
  `idCour` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idMatiere` int(10) unsigned DEFAULT NULL,
  `idSalle` int(10) unsigned DEFAULT NULL,
  `idClasse` int(10) unsigned DEFAULT NULL,
  `date` date DEFAULT NULL,
  `HeureDebut` time DEFAULT NULL,
  `HeureFin` time DEFAULT NULL,
  PRIMARY KEY (`idCour`),
  KEY `idMatiere` (`idMatiere`),
  KEY `idSalle` (`idSalle`),
  KEY `idClasse` (`idClasse`),
  CONSTRAINT `cours_ibfk_1` FOREIGN KEY (`idMatiere`) REFERENCES `matieres` (`idMatiere`),
  CONSTRAINT `cours_ibfk_2` FOREIGN KEY (`idSalle`) REFERENCES `salle` (`idSalle`),
  CONSTRAINT `cours_ibfk_3` FOREIGN KEY (`idClasse`) REFERENCES `classes` (`idClasse`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cours`
--

LOCK TABLES `cours` WRITE;
/*!40000 ALTER TABLE `cours` DISABLE KEYS */;
INSERT INTO `cours` VALUES (1,1,1,1,'2023-04-19','09:00:00','10:30:00'),(2,2,3,1,'2023-04-19','13:00:00','16:30:00'),(3,1,1,2,'2023-04-19','09:00:00','10:30:00'),(4,2,3,2,'2023-04-19','13:00:00','16:30:00'),(5,1,1,3,'2023-04-19','09:00:00','10:30:00'),(6,2,3,3,'2023-04-19','13:00:00','16:30:00'),(7,2,2,4,'2023-04-19','08:00:00','13:00:00'),(8,3,4,4,'2023-04-19','14:00:00','20:30:00'),(9,2,2,5,'2023-04-19','08:00:00','13:00:00'),(10,3,4,5,'2023-04-19','14:00:00','20:30:00'),(11,4,1,6,'2023-04-22','08:00:00','13:00:00'),(12,1,2,6,'2023-04-22','14:00:00','20:30:00'),(13,4,1,7,'2023-04-22','08:00:00','13:00:00'),(14,1,2,7,'2023-04-22','14:00:00','20:30:00');
/*!40000 ALTER TABLE `cours` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eleves`
--

DROP TABLE IF EXISTS `eleves`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `eleves` (
  `idEleves` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nomEleve` varchar(50) DEFAULT NULL,
  `prenomEleve` varchar(50) DEFAULT NULL,
  `idClasse` int(10) unsigned DEFAULT NULL,
  `ville` varchar(50) DEFAULT NULL,
  `telephone` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`idEleves`),
  KEY `idClasse` (`idClasse`),
  CONSTRAINT `eleves_ibfk_1` FOREIGN KEY (`idClasse`) REFERENCES `classes` (`idClasse`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eleves`
--

LOCK TABLES `eleves` WRITE;
/*!40000 ALTER TABLE `eleves` DISABLE KEYS */;
INSERT INTO `eleves` VALUES (1,'Skywalker','Anakin',1,'Paris','0612345678'),(2,'Harrington','Honor',1,'Evry','0631458621'),(3,'Bond','James',1,'Villejuif','0071423275'),(4,'Lebowski','Jeffrey',2,'Paris','0657892463'),(5,'Myers','Michael',2,'Rouen','0634028417'),(6,'Baggins','Bilbo',3,'Bagneux','0612479155'),(7,'De la Bath','Hubert-Bonisseur',3,'Neully','0635489164'),(8,'Simpson','Homer',4,'Saint-Nectaire','0635489164');
/*!40000 ALTER TABLE `eleves` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `matieres`
--

DROP TABLE IF EXISTS `matieres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `matieres` (
  `idMatiere` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nomMatiere` varchar(50) DEFAULT NULL,
  `idProf` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`idMatiere`),
  KEY `idProf` (`idProf`),
  CONSTRAINT `matieres_ibfk_1` FOREIGN KEY (`idProf`) REFERENCES `profs` (`idProf`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matieres`
--

LOCK TABLES `matieres` WRITE;
/*!40000 ALTER TABLE `matieres` DISABLE KEYS */;
INSERT INTO `matieres` VALUES (1,'SQL',1),(2,'Webservices',2),(3,'React',2),(4,'Cybersecurite',3);
/*!40000 ALTER TABLE `matieres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notes`
--

DROP TABLE IF EXISTS `notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notes` (
  `idNote` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idEleve` int(10) unsigned DEFAULT NULL,
  `idMatiere` int(10) unsigned DEFAULT NULL,
  `note` int(11) NOT NULL,
  PRIMARY KEY (`idNote`),
  KEY `idEleve` (`idEleve`),
  KEY `idMatiere` (`idMatiere`),
  CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`idEleve`) REFERENCES `eleves` (`idEleves`),
  CONSTRAINT `notes_ibfk_2` FOREIGN KEY (`idMatiere`) REFERENCES `matieres` (`idMatiere`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notes`
--

LOCK TABLES `notes` WRITE;
/*!40000 ALTER TABLE `notes` DISABLE KEYS */;
INSERT INTO `notes` VALUES (1,1,1,15),(2,1,2,12),(3,1,3,15),(4,1,4,14),(5,2,1,19),(6,2,2,20),(7,2,3,14),(8,2,4,17),(9,3,1,11),(10,3,2,11),(11,3,3,8),(12,3,4,20),(13,4,1,5),(14,4,2,4),(15,4,3,5),(16,4,4,0),(17,5,1,10),(18,5,2,6),(19,5,3,9),(20,5,4,15),(21,6,1,13),(22,6,2,11),(23,6,3,13),(24,6,4,14),(25,7,1,10),(26,7,2,12),(27,7,3,8),(28,7,4,2);
/*!40000 ALTER TABLE `notes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profs`
--

DROP TABLE IF EXISTS `profs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profs` (
  `idProf` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nomProf` varchar(50) DEFAULT NULL,
  `prenomProf` varchar(50) DEFAULT NULL,
  `ville` varchar(50) DEFAULT NULL,
  `telephone` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`idProf`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profs`
--

LOCK TABLES `profs` WRITE;
/*!40000 ALTER TABLE `profs` DISABLE KEYS */;
INSERT INTO `profs` VALUES (1,'Doe','John',NULL,NULL),(2,'Balboa','Rocky',NULL,NULL),(3,'Ripley','Ellen',NULL,NULL);
/*!40000 ALTER TABLE `profs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salle`
--

DROP TABLE IF EXISTS `salle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `salle` (
  `idSalle` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nomSalle` varchar(50) DEFAULT NULL,
  `Site` varchar(50) DEFAULT NULL,
  `capacite` int(11) DEFAULT NULL,
  PRIMARY KEY (`idSalle`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salle`
--

LOCK TABLES `salle` WRITE;
/*!40000 ALTER TABLE `salle` DISABLE KEYS */;
INSERT INTO `salle` VALUES (1,'Salle A','Campus Paris',50),(2,'Salle B','Campus Paris',100),(3,'Salle C','Campus Bordeaux',30),(4,'Salle D','Campus Bordeaux',40),(5,'Salle E','Campus Lyon',60);
/*!40000 ALTER TABLE `salle` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-30  0:21:20
