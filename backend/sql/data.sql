
-- Populate user table with hardcoded values --
INSERT INTO users(email, pic, username) VALUES ('bob@ucsc.com', 'https://lh3.googleusercontent.com/a/ALm5wu1BNu38NDJUK7MgGRRr8KQYLZN_PtqAiE9MXRrFJg=s96-c', 'Bob');
INSERT INTO users(email, pic, username) VALUES ('steve@ucsc.com', 'https://lh3.googleusercontent.com/a/ALm5wu2LYxyLQVPRYjO2SJEuz-wYzOulc7Vil4iWVu85=s96-c', 'Steve');

-- Populate event table with hardcoded values --
INSERT INTO events(eventname, email, eventdate, eventtime, eventlocation, latitude, longitude, eventdescription) VALUES ('Bobs pie eating contest', 'bob@ucsc.com', '2022-12-02', '04:20:00', '95060', 36.9741171, -122.03079630000002, 'eat pies');
INSERT INTO events(eventname, email, eventdate, eventtime, eventlocation, latitude, longitude, eventdescription) VALUES ('Steves fundraiser', 'steve@ucsc.com', '2023-02-01', '06:30:00', '92115', 36.9741171, -122.03079630000002, 'raising funds');
