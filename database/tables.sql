CREATE TABLE `business_dev`.`topics` ( `to_id` SERIAL NOT NULL , `to_name` VARCHAR(255) NOT NULL , `to_create_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , `to_update_at` DATETIME NOT NULL , `to_delete_at` DATETIME NOT NULL ) ENGINE = InnoDB; 