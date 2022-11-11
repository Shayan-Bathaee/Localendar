
-- user profile table --
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(email VARCHAR(255), pic VARCHAR(255), username VARCHAR(255), PRIMARY KEY (email));

-- event table -- 
DROP TABLE IF EXISTS events CASCADE;
CREATE TABLE events(
    eventname VARCHAR(255),
    email VARCHAR(255), -- email of the poster
    eventdate DATE, -- YYYY-MM-DD
    eventtime TIME, -- hh:mm:ss
    eventlocation VARCHAR(255), -- zip code for now, but may change later
    eventcoords FLOAT[], -- latitude, longitude 
    eventdescription VARCHAR(2000), -- allow for a long description
    FOREIGN KEY (email) REFERENCES users(email)
);