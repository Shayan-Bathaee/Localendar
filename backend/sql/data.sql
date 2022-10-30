
-- Populate user table with hardcoded values --
INSERT INTO users(email, pw, username) VALUES ('bob@ucsc.com', 'password', 'Bob');
INSERT INTO users(email, pw, username) VALUES ('ann@ucsc.com', 'password', 'Ann');
INSERT INTO users(email, pw, username) VALUES ('steve@ucsc.com', 'password', 'Steve');

-- Populate event table with hardcoded values --
INSERT INTO events(eventname, email, eventdate, eventtime, eventlocation, eventdescription) VALUES ('Bobs pie eating contest', 'bob@ucsc.com', '2022-12-02', '04:20:00', '95060', 'eat pies');
INSERT INTO events(eventname, email, eventdate, eventtime, eventlocation, eventdescription) VALUES ('Anns fundraiser', 'ann@ucsc.com', '2023-02-01', '06:30:00', '92115', 'raising funds');