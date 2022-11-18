
-- Populate user table with hardcoded values --
INSERT INTO users(email, pic, username) VALUES ('bob@ucsc.com', 'https://lh3.googleusercontent.com/a/ALm5wu1BNu38NDJUK7MgGRRr8KQYLZN_PtqAiE9MXRrFJg=s96-c', 'Bob');
INSERT INTO users(email, pic, username) VALUES ('steve@ucsc.com', 'https://lh3.googleusercontent.com/a/ALm5wu2LYxyLQVPRYjO2SJEuz-wYzOulc7Vil4iWVu85=s96-c', 'Steve');

-- Populate event table with hardcoded values --
INSERT INTO events(eventname, email, eventdate, eventtime, eventlocation, latitude, longitude, eventdescription) VALUES ('Bobs pie eating contest', 'bob@ucsc.com', '2022-12-02', '04:20:00', '95060', 36.9741171, -122.03079630000002, 'eat pies');
INSERT INTO events(eventname, email, eventdate, eventtime, eventlocation, latitude, longitude, eventdescription) VALUES ('Steves fundraiser', 'steve@ucsc.com', '2023-02-01', '06:30:00', '95060', 36.9741171, -122.03079630000002, 'raising funds');
INSERT INTO events(eventname, email, eventdate, eventtime, eventlocation, latitude, longitude, eventdescription) VALUES ('TestEvent 1', 'steve@ucsc.com', '2021-02-01', '06:30:00', '6313 Evergreen Ave, Las Vegas, NV 89107', 36.162119, -115.2312065, 'This is a test event in Las Vegas');
INSERT INTO events(eventname, email, eventdate, eventtime, eventlocation, latitude, longitude, eventdescription) VALUES ('TestEvent 4', 'steve@ucsc.com', '2023-04-01', '06:30:00', '717 State St, Albany, NY 12203', 42.6639721, -73.7779027, 'This is a test event in Albany');
INSERT INTO events(eventname, email, eventdate, eventtime, eventlocation, latitude, longitude, eventdescription) VALUES ('TestEvent 2', 'steve@ucsc.com', '2023-02-01', '06:30:00', '26803 Co Rd 312, Buena Vista, CO 81211', 38.807594, -106.107703, 'This is a test event in Colorado');
INSERT INTO events(eventname, email, eventdate, eventtime, eventlocation, latitude, longitude, eventdescription) VALUES ('TestEvent 3', 'steve@ucsc.com', '2023-02-01', '18:30:00', '9150 W Church St, Des Plaines, IL 60016', 42.046932, -87.853613, 'This is a test event next to chicago');
INSERT INTO events(eventname, email, eventdate, eventtime, eventlocation, latitude, longitude, eventdescription) VALUES ('TestEvent 5', 'steve@ucsc.com', '2024-02-01', '06:30:00', '193 Parkway N, Brewer, ME 04412', 44.791541, -68.75037, 'This is a test event in Maine');