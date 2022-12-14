INSERT INTO users (name, email, password)
VALUES 
('Rohan Dell', 'rohan.dell@myemail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Janine Hart', 'janine.hart@myemail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Rosalie Garza', 'rosalie.garza@myemail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Sue Luna', 'sue.luna@myemail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Mellisa Stanley', 'rohan.dell@myemail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES 
(1,'IT guy', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 500.25, 1, 1, 2, 'Canada', '536 Namsub Highway', 'Sotboske', 'Quebec', '28142', true ),

(4,'Accountant', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 750.50, 2, 1, 2, 'Canada', '651 Nami Road', 'Bohbatev', 'Alberta', '83680', true ),

(5,'Engineer', 'description', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&cs=tinysrgb&h=350', 550.81, 3, 5, 3, 'Canada', '1650 Hejto Center', 'Genwezuj', 'Newfoundland And Labrador', '44583', true ),

(2,'Business Guy', 'description', 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&h=35', 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&h=35', 650.25, 2, 1, 2, 'Canada', '513 Powov Grove', 'Jaebvap', 'Ontario', '38051', true ),

(3,'Developer', 'description', 'https://images.pexels.com/photos/1475938/pexels-photo-1475938.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/1475938/pexels-photo-1475938.jpeg?auto=compress&cs=tinysrgb&h=350', 850.25, 1, 2, 2, 'Canada', '1392 Gaza Junction', 'Upetafpuv', 'Nova Scotia', '81059', true );

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES
('2018-09-11', '2018-09-26', 2, 3),
('2019-01-04', '2019-02-01', 2, 2),
('2021-10-01', '2021-10-14', 1, 4),
('2014-10-21', '2014-10-21', 3, 5),
('2022-08-01', '2022-08-07', 4, 3);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES
(2, 5, 4, 3, 'message'),
(1, 4, 1, 4, 'message'),
(3, 1, 2, 4, 'message'),
(3, 5, 5, 4, 'message'),
(4, 2, 3, 5, 'message');