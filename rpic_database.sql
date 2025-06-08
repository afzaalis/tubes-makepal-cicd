-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 06, 2025 at 01:06 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rpic_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `pc_id` int(11) DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `total_price` int(11) NOT NULL,
  `status` enum('pending','confirmed','cancelled') DEFAULT 'pending',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `type` varchar(50) DEFAULT NULL,
  `payment_method` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `user_id`, `pc_id`, `start_time`, `end_time`, `total_price`, `status`, `created_at`, `updated_at`, `type`, `payment_method`) VALUES
(25, 2, 1, '2025-06-06 18:02:00', '2025-06-06 21:02:00', 36000, 'confirmed', '2025-06-06 18:02:31', '2025-06-06 18:02:32', 'Beta', 'bca');

-- --------------------------------------------------------

--
-- Table structure for table `pcs`
--

CREATE TABLE `pcs` (
  `id` int(11) NOT NULL,
  `pc_number` varchar(100) NOT NULL,
  `pc_type_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pcs`
--

INSERT INTO `pcs` (`id`, `pc_number`, `pc_type_id`) VALUES
(1, 'Beta-01', 1),
(2, 'Beta-02', 1),
(3, 'Beta-03', 1),
(4, 'Beta-04', 1),
(5, 'Beta-05', 1),
(6, 'Beta-06', 1),
(7, 'Beta-07', 1),
(8, 'Beta-08', 1),
(9, 'Beta-09', 1),
(10, 'Beta-10', 1),
(11, 'Beta-11', 1),
(12, 'Beta-12', 1),
(13, 'Beta-13', 1),
(14, 'Beta-14', 1),
(15, 'Beta-15', 1),
(16, 'Beta-16', 1),
(17, 'Beta-17', 1),
(18, 'Beta-18', 1),
(19, 'Beta-19', 1),
(20, 'Beta-20', 1),
(21, 'Alpha-01', 2),
(22, 'Alpha-02', 2),
(23, 'Alpha-03', 2),
(24, 'Alpha-04', 2),
(25, 'Alpha-05', 2),
(26, 'Alpha-06', 2),
(27, 'Alpha-07', 2),
(28, 'Alpha-08', 2),
(29, 'Alpha-09', 2),
(30, 'Alpha-10', 2),
(31, 'Alpha-11', 2),
(32, 'Alpha-12', 2),
(33, 'Alpha-13', 2),
(34, 'Alpha-14', 2),
(35, 'Alpha-15', 2),
(36, 'Alpha-16', 2),
(37, 'Alpha-17', 2),
(38, 'Alpha-18', 2),
(39, 'Alpha-19', 2),
(40, 'Alpha-20', 2),
(41, 'Driving-01', 3),
(42, 'Driving-02', 3),
(43, 'Driving-03', 3),
(44, 'Driving-04', 3),
(45, 'Driving-05', 3),
(46, 'Driving-06', 3),
(47, 'Driving-07', 3),
(48, 'Driving-08', 3),
(49, 'Driving-09', 3),
(50, 'Driving-10', 3);

-- --------------------------------------------------------

--
-- Table structure for table `pc_types`
--

CREATE TABLE `pc_types` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pc_types`
--

INSERT INTO `pc_types` (`id`, `name`) VALUES
(1, 'Beta'),
(2, 'Alpha'),
(3, 'Driving');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('customer','admin') DEFAULT 'customer',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'demo', 'demo@gmail.com', '$2a$10$MCl.sPSpH63pSqk0RPCFPOHdloXB97tQz.r/LkcOLwwx3NZ89C0Sm', 'customer', '2025-06-03 04:22:30'),
(2, 'atyan', 'atyan@gmail.com', '$2a$10$2Y518dbv3r6rBt9ZwD0BuucQrAPFWfV..HA17EwgnszK5UFHCp5te', 'customer', '2025-06-06 11:01:40');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `pc_id` (`pc_id`);

--
-- Indexes for table `pcs`
--
ALTER TABLE `pcs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pc_type_id` (`pc_type_id`);

--
-- Indexes for table `pc_types`
--
ALTER TABLE `pc_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `pcs`
--
ALTER TABLE `pcs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `pc_types`
--
ALTER TABLE `pc_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`pc_id`) REFERENCES `pcs` (`id`);

--
-- Constraints for table `pcs`
--
ALTER TABLE `pcs`
  ADD CONSTRAINT `pcs_ibfk_1` FOREIGN KEY (`pc_type_id`) REFERENCES `pc_types` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
