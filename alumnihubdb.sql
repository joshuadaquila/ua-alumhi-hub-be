-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Host: sql7.freesqldatabase.com
-- Generation Time: Jul 29, 2024 at 01:02 AM
-- Server version: 5.5.62-0ubuntu0.14.04.1
-- PHP Version: 7.0.33-0ubuntu0.16.04.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sql7720595`
--
CREATE DATABASE IF NOT EXISTS `sql7720595` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `sql7720595`;

-- --------------------------------------------------------

--
-- Table structure for table `alumni`
--

CREATE TABLE `alumni` (
  `alumniid` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `graduationyear` int(11) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `photourl` varchar(1000) NOT NULL,
  `datecreated` datetime NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `alumni`
--

INSERT INTO `alumni` (`alumniid`, `name`, `address`, `birthday`, `graduationyear`, `email`, `password`, `photourl`, `datecreated`, `status`) VALUES
(14, 'Joshua Daquila', 'Bontol, Sibalom, Antique', '2002-01-25', 2025, 'joshuadaquila@gmail.com', '$2b$10$PSA6H/Bwtfu88m7pl3nEVu5SuTeQZqw5jEn5epFWr7EVCd9WrjnY.', 'https://firebasestorage.googleapis.com/v0/b/ua-alumni-hub.appspot.com/o/images%2F1721178488322_0.jpg?alt=media&token=953895dc-37a1-463f-ae9e-1b3bdeaf7359', '2024-07-06 22:41:50', 'active'),
(15, 'Juan dela Cruz', 'San Jose, Antique', '2024-07-03', 1989, 'jdc@gmail.com', '$2b$10$PSA6H/Bwtfu88m7pl3nEVu5SuTeQZqw5jEn5epFWr7EVCd9WrjnY.', 'https://firebasestorage.googleapis.com/v0/b/ua-alumni-hub.appspot.com/o/images%2Fimages.jfif?alt=media&token=2f218ba2-5fbd-48ff-b884-4a8386990fe4', '2024-07-17 03:14:27', 'active'),
(16, 'Jay Bryan Venegas', 'San Jose, Antique', '2024-07-03', 1989, 'jbv@gmail.com', '$2b$10$PSA6H/Bwtfu88m7pl3nEVu5SuTeQZqw5jEn5epFWr7EVCd9WrjnY.', 'https://firebasestorage.googleapis.com/v0/b/ua-alumni-hub.appspot.com/o/images%2Fimages.jfif?alt=media&token=2f218ba2-5fbd-48ff-b884-4a8386990fe4', '2024-07-17 03:14:27', 'active'),
(17, 'Susan Padilla', 'Sibalom Antique ', '2016-12-23', 2017, 'susana@mail.com', '$2b$10$xHufMV7CvigD8CBnBnqOWeeJvhLORhPIiMS2K.jgD7a2monwcFTKC', '', '2024-07-21 14:12:40', 'active'),
(18, 'alson', 'sibalom', '0000-00-00', 2019, 'b0kdotdev@gmail.com', '$2b$10$6ZXPbTuKPWO/v4TlvM8FRuvjbyLUta.xGe5TOiUiBMRDAXOjqtoha', '', '2024-07-25 08:02:56', 'active'),
(19, 'Sarah Mae Silva ', 'San Jose Antique', '1989-03-01', 2010, 'silvasarahmae@gmail.com', '$2b$10$1MUcmkh7twT8O0ywXQPH8eajuX06BVrRbr/CsH1it/SZqseBBWcBK', '', '2024-07-25 13:58:45', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `contributionprofile`
--

CREATE TABLE `contributionprofile` (
  `contributionid` int(11) NOT NULL,
  `awardname` varchar(100) NOT NULL,
  `awardbody` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `certificate` varchar(1000) NOT NULL,
  `alumniid` int(11) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contributionprofile`
--

INSERT INTO `contributionprofile` (`contributionid`, `awardname`, `awardbody`, `date`, `certificate`, `alumniid`, `status`) VALUES
(165, '', '', '0000-00-00', '[]', 15, 'active'),
(166, '', '', '0000-00-00', '[]', 15, 'active'),
(167, '', '', '0000-00-00', '[]', 15, 'active'),
(168, '', '', '0000-00-00', '[]', 14, 'active'),
(169, '', '', '0000-00-00', '[]', 14, 'active'),
(170, '', '', '0000-00-00', '[]', 14, 'active');

-- --------------------------------------------------------

--
-- Table structure for table `educationalattainment`
--

CREATE TABLE `educationalattainment` (
  `educattainid` int(11) NOT NULL,
  `alumniid` int(11) NOT NULL,
  `degree` varchar(100) NOT NULL,
  `college` varchar(100) NOT NULL,
  `year` year(4) NOT NULL,
  `honor` varchar(100) NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `educationalattainment`
--

INSERT INTO `educationalattainment` (`educattainid`, `alumniid`, `degree`, `college`, `year`, `honor`, `status`) VALUES
(1, 14, 'BS in Computer Science', 'University of Antique', 2025, '', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `educationalbackground`
--

CREATE TABLE `educationalbackground` (
  `educbackid` int(11) NOT NULL,
  `alumniid` int(11) NOT NULL,
  `educattain` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `exampassed` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `reasonundergrad` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `reasongrad` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `educationalbackground`
--

INSERT INTO `educationalbackground` (`educbackid`, `alumniid`, `educattain`, `exampassed`, `reasonundergrad`, `reasongrad`, `status`) VALUES
(2, 15, '[{\"degree\":\"\",\"college\":\"\",\"yearGrad\":\"\",\"honor\":\"\"}]', '[{\"name\":\"\",\"date\":\"\",\"rating\":\"\"}]', '{\"highGrades\":true,\"goodGradesHS\":false,\"parentInfluence\":false,\"peerInfluence\":false,\"roleModel\":false,\"passionProfession\":false,\"immediateEmployment\":false,\"statusPrestige\":false,\"courseAvailability\":false,\"careerAdvancement\":false,\"affordableFamily\":false,\"attractiveCompensation\":false,\"employmentAbroad\":false,\"noParticularChoice\":false,\"others\":false}', '{\"highGrades\":false,\"goodGradesHS\":false,\"parentInfluence\":false,\"peerInfluence\":false,\"roleModel\":false,\"passionProfession\":false,\"immediateEmployment\":false,\"statusPrestige\":false,\"courseAvailability\":false,\"careerAdvancement\":false,\"affordableFamily\":false,\"attractiveCompensation\":false,\"employmentAbroad\":false,\"noParticularChoice\":false,\"others\":false}', 'active'),
(3, 15, '[{\"degree\":\"\",\"college\":\"\",\"yearGrad\":\"\",\"honor\":\"\"}]', '[{\"name\":\"\",\"date\":\"\",\"rating\":\"\"}]', '{\"highGrades\":true,\"goodGradesHS\":false,\"parentInfluence\":false,\"peerInfluence\":false,\"roleModel\":false,\"passionProfession\":false,\"immediateEmployment\":false,\"statusPrestige\":false,\"courseAvailability\":false,\"careerAdvancement\":false,\"affordableFamily\":false,\"attractiveCompensation\":false,\"employmentAbroad\":false,\"noParticularChoice\":false,\"others\":false}', '{\"highGrades\":false,\"goodGradesHS\":false,\"parentInfluence\":false,\"peerInfluence\":false,\"roleModel\":false,\"passionProfession\":false,\"immediateEmployment\":false,\"statusPrestige\":false,\"courseAvailability\":false,\"careerAdvancement\":false,\"affordableFamily\":false,\"attractiveCompensation\":false,\"employmentAbroad\":false,\"noParticularChoice\":false,\"others\":false}', 'active'),
(4, 15, '[{\"degree\":\"\",\"college\":\"\",\"yearGrad\":\"\",\"honor\":\"\"}]', '[{\"name\":\"\",\"date\":\"\",\"rating\":\"\"}]', '{\"highGrades\":false,\"goodGradesHS\":false,\"parentInfluence\":false,\"peerInfluence\":false,\"roleModel\":false,\"passionProfession\":false,\"immediateEmployment\":false,\"statusPrestige\":false,\"courseAvailability\":false,\"careerAdvancement\":false,\"affordableFamily\":false,\"attractiveCompensation\":false,\"employmentAbroad\":false,\"noParticularChoice\":false,\"others\":false}', '{\"highGrades\":false,\"goodGradesHS\":false,\"parentInfluence\":false,\"peerInfluence\":false,\"roleModel\":false,\"passionProfession\":false,\"immediateEmployment\":false,\"statusPrestige\":false,\"courseAvailability\":false,\"careerAdvancement\":false,\"affordableFamily\":false,\"attractiveCompensation\":false,\"employmentAbroad\":false,\"noParticularChoice\":false,\"others\":false}', 'active'),
(5, 15, '[{\"degree\":\"\",\"college\":\"\",\"yearGrad\":\"\",\"honor\":\"\"}]', '[{\"name\":\"\",\"date\":\"\",\"rating\":\"\"}]', '{\"highGrades\":false,\"goodGradesHS\":false,\"parentInfluence\":false,\"peerInfluence\":false,\"roleModel\":false,\"passionProfession\":false,\"immediateEmployment\":false,\"statusPrestige\":false,\"courseAvailability\":false,\"careerAdvancement\":false,\"affordableFamily\":false,\"attractiveCompensation\":false,\"employmentAbroad\":false,\"noParticularChoice\":false,\"others\":false}', '{\"highGrades\":false,\"goodGradesHS\":false,\"parentInfluence\":false,\"peerInfluence\":false,\"roleModel\":false,\"passionProfession\":false,\"immediateEmployment\":false,\"statusPrestige\":false,\"courseAvailability\":false,\"careerAdvancement\":false,\"affordableFamily\":false,\"attractiveCompensation\":false,\"employmentAbroad\":false,\"noParticularChoice\":false,\"others\":false}', 'active'),
(6, 14, '[{\"degree\":\"\",\"college\":\"\",\"yearGrad\":\"\",\"honor\":\"\"}]', '[{\"name\":\"\",\"date\":\"\",\"rating\":\"\"}]', '{\"highGrades\":false,\"goodGradesHS\":false,\"parentInfluence\":false,\"peerInfluence\":false,\"roleModel\":false,\"passionProfession\":false,\"immediateEmployment\":false,\"statusPrestige\":false,\"courseAvailability\":false,\"careerAdvancement\":false,\"affordableFamily\":false,\"attractiveCompensation\":false,\"employmentAbroad\":false,\"noParticularChoice\":false,\"others\":false}', '{\"highGrades\":false,\"goodGradesHS\":false,\"parentInfluence\":false,\"peerInfluence\":false,\"roleModel\":false,\"passionProfession\":false,\"immediateEmployment\":false,\"statusPrestige\":false,\"courseAvailability\":false,\"careerAdvancement\":false,\"affordableFamily\":false,\"attractiveCompensation\":false,\"employmentAbroad\":false,\"noParticularChoice\":false,\"others\":false}', 'active'),
(7, 14, '[{\"degree\":\"\",\"college\":\"\",\"yearGrad\":\"\",\"honor\":\"\"}]', '[{\"name\":\"\",\"date\":\"\",\"rating\":\"\"}]', '{\"highGrades\":false,\"goodGradesHS\":false,\"parentInfluence\":false,\"peerInfluence\":false,\"roleModel\":false,\"passionProfession\":false,\"immediateEmployment\":false,\"statusPrestige\":false,\"courseAvailability\":false,\"careerAdvancement\":false,\"affordableFamily\":false,\"attractiveCompensation\":false,\"employmentAbroad\":false,\"noParticularChoice\":false,\"others\":false}', '{\"highGrades\":false,\"goodGradesHS\":false,\"parentInfluence\":false,\"peerInfluence\":false,\"roleModel\":false,\"passionProfession\":false,\"immediateEmployment\":false,\"statusPrestige\":false,\"courseAvailability\":false,\"careerAdvancement\":false,\"affordableFamily\":false,\"attractiveCompensation\":false,\"employmentAbroad\":false,\"noParticularChoice\":false,\"others\":false}', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `employmentdata`
--

CREATE TABLE `employmentdata` (
  `employmentdataid` int(11) NOT NULL,
  `alumniid` int(11) NOT NULL,
  `presentlyemployed` varchar(10) DEFAULT NULL,
  `reasonnotemployed` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `presentemploystatus` varchar(50) DEFAULT NULL,
  `skillsaquiredincollege` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `presentoccupation` varchar(50) DEFAULT NULL,
  `lineofbusiness` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `placeofwork` varchar(50) DEFAULT NULL,
  `firstjob` varchar(10) DEFAULT NULL,
  `reasonstayingonjob` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `firstjobrelatedtocourse` varchar(10) DEFAULT NULL,
  `reasonacceptingthejob` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `reasonchangingjob` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `firstjobduration` varchar(50) DEFAULT NULL,
  `howfoundfirstjob` varchar(100) DEFAULT NULL,
  `howlongfoundfirstjob` varchar(50) DEFAULT NULL,
  `joblvlposfirstjob` varchar(50) DEFAULT NULL,
  `joblvlposcurrentjob` varchar(50) DEFAULT NULL,
  `firstjobearning` varchar(50) DEFAULT NULL,
  `curriculumrelevance` varchar(10) DEFAULT NULL,
  `competencies` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `suggestions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `status` varchar(10) NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employmentdata`
--

INSERT INTO `employmentdata` (`employmentdataid`, `alumniid`, `presentlyemployed`, `reasonnotemployed`, `presentemploystatus`, `skillsaquiredincollege`, `presentoccupation`, `lineofbusiness`, `placeofwork`, `firstjob`, `reasonstayingonjob`, `firstjobrelatedtocourse`, `reasonacceptingthejob`, `reasonchangingjob`, `firstjobduration`, `howfoundfirstjob`, `howlongfoundfirstjob`, `joblvlposfirstjob`, `joblvlposcurrentjob`, `firstjobearning`, `curriculumrelevance`, `competencies`, `suggestions`, `status`) VALUES
(1, 14, 'Yes', '', 'Contractual', '', 'Software Developer', 'Fishing', 'Local', 'Yes', '{\"reason\": [\"Career challenge\", \"Salaries and benefits\"]}', 'Yes', '{\"reason\": [\"Salaries and benefits\", \"Career challenge\"]}', '{\"reason\": [\"Salaries and benefits\", \"Career challenge\"]}', '1 to 6 months', 'Recommended by someone', 'Less than a month', 'Rank or clerical', 'Self-employed', 'below P5,000.00', 'Yes', '{\"competencies\": [\"Communication skills\", \"Human Relations skills\"]}', '', 'active'),
(2, 15, 'Yes', '{\"advanceStudy\":false,\"familyConcern\":false,\"health\":false,\"lackWorkExp\":false,\"noJobOp\":false,\"notLookJob\":false}', 'Regular of Permanent', NULL, '', 'Health and Social Work', 'Local', 'Yes', '{\"salaries\":false,\"careerChallenge\":false,\"specialSkill\":false,\"relatedToCourse\":false,\"proximityToResidence\":false,\"peerInfluence\":false,\"familyInfluence\":false}', 'No', '{\"salaries\":false,\"careerChallenge\":false,\"specialSkill\":false,\"relatedToCourse\":false,\"proximityToResidence\":false,\"peerInfluence\":false,\"familyInfluence\":false}', '{\"salaries\":false,\"careerChallenge\":false,\"relatedToCourse\":false,\"proximityToResidence\":false}', 'Less than a month', '{\"advertisment\":false,\"schoolplacement\":false,\"walkin\":false,\"familybusiness\":false,\"reco\":false,\"jo', 'Less than a month', 'Rank or Clerical', 'Rank or Clerical', 'Below P5,000.00', 'Yes', '{\"communication\":false,\"humanrelation\":false,\"entrepreneurial\":false,\"informationtech\":false,\"problemsolving\":false,\"criticalthinking\":false}', '', 'active'),
(3, 15, 'Yes', '{\"advanceStudy\":false,\"familyConcern\":false,\"health\":false,\"lackWorkExp\":false,\"noJobOp\":false,\"notLookJob\":false}', 'Regular of Permanent', '', '', 'Health and Social Work', 'Local', 'Yes', '{\"salaries\":false,\"careerChallenge\":false,\"specialSkill\":false,\"relatedToCourse\":false,\"proximityToResidence\":false,\"peerInfluence\":false,\"familyInfluence\":false}', 'No', '{\"salaries\":false,\"careerChallenge\":false,\"relatedToCourse\":false,\"proximityToResidence\":false}', '{\"salaries\":false,\"careerChallenge\":false,\"relatedToCourse\":false,\"proximityToResidence\":false}', 'Less than a month', '{\"advertisment\":false,\"schoolplacement\":false,\"walkin\":false,\"familybusiness\":false,\"reco\":false,\"jo', 'Less than a month', 'Rank or Clerical', 'Rank or Clerical', 'Below P5,000.00', 'Yes', '{\"communication\":false,\"humanrelation\":false,\"entrepreneurial\":false,\"informationtech\":false,\"problemsolving\":false,\"criticalthinking\":false}', '', 'active'),
(4, 14, 'Yes', '{\"advanceStudy\":false,\"familyConcern\":false,\"health\":false,\"lackWorkExp\":false,\"noJobOp\":false,\"notLookJob\":false}', 'Regular of Permanent', NULL, '', 'Health and Social Work', 'Local', 'Yes', '{\"salaries\":false,\"careerChallenge\":false,\"specialSkill\":false,\"relatedToCourse\":false,\"proximityToResidence\":false,\"peerInfluence\":false,\"familyInfluence\":false}', 'No', '{\"salaries\":false,\"careerChallenge\":false,\"specialSkill\":false,\"relatedToCourse\":false,\"proximityToResidence\":false,\"peerInfluence\":false,\"familyInfluence\":false}', '{\"salaries\":false,\"careerChallenge\":false,\"relatedToCourse\":false,\"proximityToResidence\":false}', 'Less than a month', '{\"advertisment\":false,\"schoolplacement\":false,\"walkin\":false,\"familybusiness\":false,\"reco\":false,\"jo', 'Less than a month', 'Rank or Clerical', 'Rank or Clerical', 'Below P5,000.00', 'Yes', '{\"communication\":false,\"humanrelation\":false,\"entrepreneurial\":false,\"informationtech\":false,\"problemsolving\":false,\"criticalthinking\":false}', '', 'active'),
(5, 14, 'Yes', '{\"advanceStudy\":false,\"familyConcern\":false,\"health\":false,\"lackWorkExp\":false,\"noJobOp\":false,\"notLookJob\":false}', 'Regular of Permanent', NULL, '', 'Health and Social Work', 'Local', 'Yes', '{\"salaries\":false,\"careerChallenge\":false,\"specialSkill\":false,\"relatedToCourse\":false,\"proximityToResidence\":false,\"peerInfluence\":false,\"familyInfluence\":false}', 'No', '{\"salaries\":false,\"careerChallenge\":false,\"relatedToCourse\":false,\"proximityToResidence\":false}', '{\"salaries\":false,\"careerChallenge\":false,\"relatedToCourse\":false,\"proximityToResidence\":false}', 'Less than a month', '{\"advertisment\":false,\"schoolplacement\":false,\"walkin\":false,\"familybusiness\":false,\"reco\":false,\"jo', 'Less than a month', 'Rank or Clerical', 'Rank or Clerical', 'Below P5,000.00', 'Yes', '{\"communication\":false,\"humanrelation\":false,\"entrepreneurial\":false,\"informationtech\":false,\"problemsolving\":false,\"criticalthinking\":false}', '', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `eventid` int(11) NOT NULL,
  `title` varchar(50) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  `endtime` time NOT NULL,
  `location` varchar(50) DEFAULT NULL,
  `capacity` int(11) DEFAULT NULL,
  `registrationdeadline` date DEFAULT NULL,
  `eventstatus` varchar(20) NOT NULL,
  `status` varchar(10) DEFAULT 'active',
  `staffid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`eventid`, `title`, `description`, `date`, `time`, `endtime`, `location`, `capacity`, `registrationdeadline`, `eventstatus`, `status`, `staffid`) VALUES
(42, 'Sample Upcoming Event', 'Upcoming event test', '2024-07-09', '12:00:00', '00:00:00', 'Sibalom, Antique', 45, '2024-07-07', '', 'active', 1),
(44, 'Sample Event 3', 'Not Registered Event', '2024-07-09', '14:59:00', '00:00:00', 'UA', 34, '2024-07-09', '', 'active', 1),
(45, 'Upcoming Event', 'asasd', '2024-07-18', '19:11:00', '00:00:00', 'UA', 34, '2024-07-17', '', 'active', 1),
(46, 'Sample Event', 'adaasdasd', '2024-07-14', '14:27:00', '00:00:00', 'UA', 34, '2024-07-14', '', 'active', 1),
(47, 'asdasd', 'asdasd', '2024-07-15', '21:01:00', '21:01:00', 'asdasd', 45, '2024-07-15', '', 'active', 1);

-- --------------------------------------------------------

--
-- Table structure for table `generalinformation`
--

CREATE TABLE `generalinformation` (
  `geninfoid` int(11) NOT NULL,
  `alumniid` int(11) NOT NULL,
  `telnumber` varchar(50) DEFAULT NULL,
  `mobilenum` varchar(20) DEFAULT NULL,
  `civilstatus` varchar(20) DEFAULT NULL,
  `sex` varchar(10) DEFAULT NULL,
  `region` varchar(20) DEFAULT NULL,
  `province` varchar(20) DEFAULT NULL,
  `residence` varchar(20) DEFAULT NULL,
  `status` varchar(10) DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `generalinformation`
--

INSERT INTO `generalinformation` (`geninfoid`, `alumniid`, `telnumber`, `mobilenum`, `civilstatus`, `sex`, `region`, `province`, `residence`, `status`) VALUES
(1, 14, '', '09357901126', 'Single', 'Male', 'Region 6', 'Antique', 'Municipality', 'active'),
(2, 15, '', '', 'Single', '', 'Region 1', '', '', 'active'),
(3, 15, '', '', 'Single', '', 'Region 1', '', '', 'active'),
(4, 15, '', '', 'Single', '', 'Region 1', '', '', 'active'),
(5, 15, '', '', 'Single', '', 'Region 1', '', '', 'active'),
(6, 14, '', '', 'Single', '', 'Region 1', '', '', 'active'),
(7, 14, '', '', 'Single', '', 'Region 1', '', '', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `messageid` int(11) NOT NULL,
  `content` varchar(1000) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `status` varchar(15) NOT NULL DEFAULT 'active',
  `userid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`messageid`, `content`, `date`, `status`, `userid`) VALUES
(0, 'Hi', '2024-07-21 14:04:33', 'active', 15),
(2, 'Sample Conytent', '2024-07-04 02:22:20', 'active', 1),
(3, 'Sample Conytent', '2024-07-04 02:25:59', 'active', 1),
(4, 'hey there!', '2024-07-04 02:39:13', 'active', 1),
(5, 'asdasdascasc', '2024-07-04 02:43:13', 'active', 1),
(6, 'wdqwdqwwdqwdqwdqwd', '2024-07-04 02:46:11', 'active', 1),
(7, 'asdasdasd', '2024-07-04 02:46:40', 'active', 1),
(8, 'ssfsdsdv', '2024-07-04 02:50:00', 'active', 1),
(9, 'scascascasc', '2024-07-04 02:52:25', 'active', 1),
(10, 'scascascasc', '2024-07-04 02:52:27', 'active', 1),
(11, 'scascascasc', '2024-07-04 02:52:28', 'active', 1),
(12, 'asdas', '2024-07-04 02:53:38', 'active', 1),
(13, 'Hello Philippines!', '2024-07-04 03:27:57', 'active', 1),
(14, 'Hello', '2024-07-07 08:27:46', 'active', NULL),
(15, 'asasd', '2024-07-07 08:29:05', 'active', 1),
(16, 'Hey', '2024-07-07 08:47:05', 'active', 1),
(17, 'Ssample Message', '2024-07-07 08:48:38', 'active', 1),
(18, 'Try enw', '2024-07-07 08:49:26', 'active', 1),
(19, 'hhe', '2024-07-07 08:51:17', 'active', 1),
(20, 'asasd', '2024-07-07 08:56:05', 'hidden', 1),
(21, 'ascascasc', '2024-07-07 08:57:05', 'hidden', 1),
(22, 'Sample 1', '2024-07-21 09:08:31', 'active', 1),
(25, 'Message try', '2024-07-21 09:50:09', 'active', 14),
(26, 'Sample Message ', '2024-07-21 09:52:02', 'active', 14),
(27, 'Sample 2', '2024-07-21 09:55:57', 'active', 15),
(28, 'Sample Message ', '2024-07-21 09:56:54', 'active', 14),
(29, 'Hi', '2024-07-21 10:17:31', 'active', 14),
(30, 'Hello', '2024-07-21 10:18:11', 'active', 14),
(31, 'Hello there!', '2024-07-21 10:20:53', 'active', 15);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `notificationid` int(11) NOT NULL,
  `title` varchar(50) DEFAULT NULL,
  `message` varchar(100) DEFAULT NULL,
  `sentdate` datetime DEFAULT NULL,
  `type` varchar(10) NOT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`notificationid`, `title`, `message`, `sentdate`, `type`, `status`) VALUES
(1, 'New Event', 'New Event: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt', '2024-07-02 07:30:17', 'event', ''),
(3, 'Another one', 'New Event: Another one', '2024-07-06 13:14:20', 'event', ''),
(4, 'Another two', 'New Event: Another two', '2024-07-06 13:16:59', 'event', ''),
(5, 'Smaple 3', 'New Event: Smaple 3', '2024-07-06 13:18:43', 'event', ''),
(6, 'UA CSS', 'New Event: UA CSS', '2024-07-07 00:16:51', 'event', ''),
(7, 'Future Event', 'New Event: Future Event', '2024-07-07 02:33:56', 'event', ''),
(8, 'Sample of Happening Event', 'New Event: Sample of Happening Event', '2024-07-07 02:35:22', 'event', ''),
(9, 'cascasc', 'New Event: cascasc', '2024-07-07 04:11:43', 'event', ''),
(10, 'Sample Upcoming Event', 'New Event: Sample Upcoming Event', '2024-07-07 04:24:10', 'event', ''),
(11, 'Sample Upcoming Event', 'New Event: Sample Upcoming Event', '2024-07-07 04:24:10', 'event', ''),
(12, NULL, 'New Message: undefined', '2024-07-07 08:47:05', 'message', ''),
(13, 'Ssample Message', 'New Message: Ssample Message', '2024-07-07 08:48:39', 'message', ''),
(14, 'Try enw', 'New Message: Try enw', '2024-07-07 08:49:26', 'message', ''),
(15, 'hhe', 'New Message: hhe', '2024-07-07 08:51:17', 'message', ''),
(16, 'asasd', 'New Message: asasd', '2024-07-07 08:56:05', 'message', ''),
(17, 'ascascasc', 'New Message: ascascasc', '2024-07-07 08:57:05', 'message', ''),
(18, 'Sample Event 3', 'New Event: Sample Event 3', '2024-07-09 06:59:51', 'event', ''),
(19, 'Upcoming Event', 'New Event: Upcoming Event', '2024-07-13 11:11:45', 'event', ''),
(20, 'Sample Event', 'New Event: Sample Event', '2024-07-14 06:27:35', 'event', ''),
(21, 'asdasd', 'New Event: asdasd', '2024-07-15 13:01:21', 'event', ''),
(22, 'Sample 1', 'New Message: Sample 1', '2024-07-21 09:08:31', 'message', '');

-- --------------------------------------------------------

--
-- Table structure for table `registration`
--

CREATE TABLE `registration` (
  `registrationid` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `alumniid` int(11) NOT NULL,
  `eventid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `registration`
--

INSERT INTO `registration` (`registrationid`, `date`, `alumniid`, `eventid`) VALUES
(0, '2024-07-21 14:05:14', 15, 42),
(12, '2024-07-09 09:18:10', 14, 42),
(16, '2024-07-15 13:21:15', 14, 47),
(17, '2024-07-18 08:05:05', 15, 47);

-- --------------------------------------------------------

--
-- Table structure for table `training`
--

CREATE TABLE `training` (
  `trainingid` int(11) NOT NULL,
  `alumniid` int(11) NOT NULL,
  `trainingtitle` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `reason` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `training`
--

INSERT INTO `training` (`trainingid`, `alumniid`, `trainingtitle`, `reason`, `status`) VALUES
(1, 14, '[{\"title\": \"NCIII Training\", \"duration\": \"2 months\", \"units\": 5, \"institution\": \"TESDA\"}, {\"title\": \"NCIII JAVA Training\", \"duration\": \"5 months\", \"units\": 5, \"institution\": \"DICT\"}]', '{\"reason\": [\"For promotion\", \"For professional development\"]}', 'active'),
(0, 15, '[{\"title\":\"\",\"duration\":\"\",\"institution\":\"\"}]', '\"For promotion\"', 'active'),
(0, 15, '[{\"title\":\"\",\"duration\":\"\",\"institution\":\"\"}]', '\"For promotion\"', 'active'),
(0, 14, '[{\"title\":\"\",\"duration\":\"\",\"institution\":\"\"}]', '\"For promotion\"', 'active'),
(0, 14, '[{\"title\":\"aujaja\",\"duration\":\"jsjjsjshsh\",\"institution\":\"\"}]', '\"For promotion\"', 'active'),
(0, 14, '[{\"title\":\"aujaja\",\"duration\":\"jsjjsjshsh\",\"institution\":\"\"}]', '\"For promotion\"', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userid` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `usertype` varchar(20) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userid`, `username`, `password`, `usertype`, `status`) VALUES
(1, 'joshuadaq', '$2b$10$Hy7/6e2PknepI3dD5zRSC.O37t62334KwyGLfgwiAGjuy.rljXerm', 'admin', 'active'),
(2, 'joshua123', '$2b$10$dQw4CwCU3qIGdakM5qa3yuLCeZU3IFsrBLmbNWmUBGrtiYsHdzOr2', 'admin', 'active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alumni`
--
ALTER TABLE `alumni`
  ADD PRIMARY KEY (`alumniid`);

--
-- Indexes for table `contributionprofile`
--
ALTER TABLE `contributionprofile`
  ADD PRIMARY KEY (`contributionid`),
  ADD KEY `alumniid` (`alumniid`);

--
-- Indexes for table `educationalattainment`
--
ALTER TABLE `educationalattainment`
  ADD PRIMARY KEY (`educattainid`),
  ADD KEY `alumniid` (`alumniid`);

--
-- Indexes for table `educationalbackground`
--
ALTER TABLE `educationalbackground`
  ADD PRIMARY KEY (`educbackid`),
  ADD KEY `alumniid` (`alumniid`);

--
-- Indexes for table `employmentdata`
--
ALTER TABLE `employmentdata`
  ADD PRIMARY KEY (`employmentdataid`),
  ADD KEY `alumniid` (`alumniid`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`eventid`),
  ADD KEY `staffid` (`staffid`);

--
-- Indexes for table `generalinformation`
--
ALTER TABLE `generalinformation`
  ADD PRIMARY KEY (`geninfoid`),
  ADD KEY `alumniid` (`alumniid`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`messageid`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notificationid`);

--
-- Indexes for table `registration`
--
ALTER TABLE `registration`
  ADD PRIMARY KEY (`registrationid`),
  ADD KEY `eventid` (`eventid`),
  ADD KEY `alumniid` (`alumniid`);

--
-- Indexes for table `training`
--
ALTER TABLE `training`
  ADD KEY `alumniid` (`alumniid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `alumni`
--
ALTER TABLE `alumni`
  MODIFY `alumniid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `contributionprofile`
--
ALTER TABLE `contributionprofile`
  MODIFY `contributionid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=171;
--
-- AUTO_INCREMENT for table `educationalattainment`
--
ALTER TABLE `educationalattainment`
  MODIFY `educattainid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `educationalbackground`
--
ALTER TABLE `educationalbackground`
  MODIFY `educbackid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `employmentdata`
--
ALTER TABLE `employmentdata`
  MODIFY `employmentdataid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
