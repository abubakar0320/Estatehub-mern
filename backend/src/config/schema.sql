-- EstateHub MERN Migration: Unified Schema
-- Optimized for Node.js + MySQL2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

-- 1. Users Table (Identity Core)
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL UNIQUE,
  `email` varchar(100) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','tenant','agent','user') DEFAULT 'user',
  `profile_image` varchar(255) DEFAULT 'default_user.png',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Property Categories
CREATE TABLE IF NOT EXISTS `property_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Agents Table
CREATE TABLE IF NOT EXISTS `agents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `cell_no` varchar(20) NOT NULL,
  `cnic` varchar(20) DEFAULT NULL,
  `operational_area` varchar(100) DEFAULT NULL,
  `office_address` text,
  `experience` int(11) DEFAULT '0',
  `rating` decimal(2,1) DEFAULT '5.0',
  `specialization` varchar(100) DEFAULT NULL,
  `commission` decimal(5,2) DEFAULT '2.00',
  `status` varchar(20) DEFAULT 'Available',
  `bio` text,
  `profile_image` varchar(255) DEFAULT 'default_agent.png',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Properties Table
CREATE TABLE IF NOT EXISTS `properties` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `price` decimal(15,2) NOT NULL,
  `type` enum('Rent','Sale') NOT NULL,
  `status` varchar(20) DEFAULT 'Available',
  `location_area` varchar(255) NOT NULL,
  `city` varchar(100) NOT NULL,
  `category_id` int(11),
  `bedrooms` int(11) DEFAULT '0',
  `area_size` varchar(50) DEFAULT NULL,
  `description` text,
  `agent_id` int(11),
  `main_image` varchar(255) DEFAULT 'default_property.png',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`category_id`) REFERENCES `property_categories`(`id`) ON DELETE SET NULL,
  FOREIGN KEY (`agent_id`) REFERENCES `agents`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Tenants Table
CREATE TABLE IF NOT EXISTS `tenants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `property_id` int(11) DEFAULT NULL,
  `lease_start` date DEFAULT NULL,
  `lease_end` date DEFAULT NULL,
  `monthly_rent` decimal(15,2) DEFAULT '0.00',
  `status` varchar(20) DEFAULT 'Active',
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Payments Table
CREATE TABLE IF NOT EXISTS `payments` (
  `payment_id` int(11) NOT NULL AUTO_INCREMENT,
  `tenant_id` int(11) NOT NULL,
  `invoice_number` varchar(50) NOT NULL UNIQUE,
  `amount_paid` decimal(15,2) NOT NULL,
  `payment_date` timestamp DEFAULT CURRENT_TIMESTAMP,
  `billing_month` varchar(50) NOT NULL,
  `payment_method` varchar(50) DEFAULT 'Cash',
  `notes` text,
  `payment_status` enum('Paid','Pending','Overdue','Partial') DEFAULT 'Pending',
  PRIMARY KEY (`payment_id`),
  FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. Visit Bookings
CREATE TABLE IF NOT EXISTS `visit_bookings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `property_id` int(11) NOT NULL,
  `agent_id` int(11) DEFAULT NULL,
  `visitor_name` varchar(100) NOT NULL,
  `visitor_email` varchar(100) NOT NULL,
  `visitor_phone` varchar(20) NOT NULL,
  `visit_date` date NOT NULL,
  `visit_time` time NOT NULL,
  `notes` text,
  `booking_status` varchar(50) DEFAULT 'Pending',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`agent_id`) REFERENCES `agents`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 8. Activity Logs
CREATE TABLE IF NOT EXISTS `activity_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `action` text NOT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
