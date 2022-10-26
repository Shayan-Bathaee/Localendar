
-- Populate user table with hardcoded values --
INSERT INTO users(email, pw, username) VALUES ('bob@ucsc.com', 'password', 'Bob');
INSERT INTO users(email, pw, username) VALUES ('ann@ucsc.com', 'password', 'Ann');
INSERT INTO users(email, pw, username) VALUES ('steve@ucsc.com', 'password', 'Steve');

-- Populate event table with hardcoded values --
INSERT INTO events(eventname, email, eventdate, eventtime, eventlocation, eventdescription) VALUES ("Bobs pie eating contest", "bob@ucsc.com", "2022-12-2", "95060", "eat pies");
INSERT INTO events(eventname, email, eventdate, eventtime, eventlocation, eventdescription) VALUES ("Ann's fundraiser", "ann@ucsc.com", "2023-2-01", "92115", "raising funds");