
-- user profile table --
DROP TABLE IF EXISTS users;
CREATE TABLE users(email VARCHAR(255), pw VARCHAR(255), username VARCHAR(255));

-- event table -- 
DROP TABLE IF EXISTS events;
CREATE TABLE events(
    eventname VARCHAR(255),
    eventemail VARCHAR(255), -- email of the poster
    eventdate DATE, -- YYYY-MM-DD
    eventtime TIME, -- hh:mm:ss
    eventlocation VARCHAR(255), -- zip code for now, but may change later
    eventdescription VARCHAR(2000) -- allow for a long description
);