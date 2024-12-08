export const initDBQuery = `

CREATE TABLE users(
	userid SERIAL PRIMARY KEY,
	username VARCHAR(255) NOT NULL,
	fullname VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	passwordhash VARCHAR(255) NOT NULL,
	photo BYTEA,
	creationdate DATE NOT NULL,
	continent VARCHAR(255) NOT NULL
);

CREATE TABLE posts(
	postid SERIAL PRIMARY KEY,
	content BYTEA
);

CREATE TABLE location(
	locationid SERIAL PRIMARY KEY, 
	latitude DECIMAL(9, 6) NOT NULL, -- Precision up to 6 decimal places
    longitude DECIMAL(9, 6) NOT NULL,
	postid INTEGER REFERENCES posts(postid) ON DELETE CASCADE
);


    
`;
/*
CREATE TYPE Continent AS ENUM (
    'Africa',
    'Antarctica',
    'Asia',
    'Europe',
    'North America',
    'Oceania',
    'South America'
);

CREATE TYPE ReactionType AS ENUM (
    'Like',
    'Love',
    'Haha',
    'Wow',
    'Sad',
    'Angry'
);

CREATE TABLE "User" (
    UserID SERIAL PRIMARY KEY,
    Username VARCHAR(50) NOT NULL,
    FullName VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    PasswordHash TEXT NOT NULL,
    Photo BYTEA,
    CreationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Continent Continent NOT NULL
);

CREATE TABLE Post (
    PostID SERIAL PRIMARY KEY,
    UserID INT NOT NULL,
    Video BYTEA,
    IsLate BOOLEAN NOT NULL DEFAULT FALSE,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  	LocationID INT,
    FOREIGN KEY (UserID) REFERENCES "User"(UserID) ON DELETE CASCADE
);

CREATE TABLE Location (
    LocationID SERIAL PRIMARY KEY,
    Latitude NUMERIC (9,6) NOT NULL,
    Longitude NUMERIC (9,6) NOT NULL,
    PostID INT NOT NULL,
    FOREIGN KEY (PostID) REFERENCES Post(PostID) ON DELETE CASCADE
);

ALTER TABLE Post
ADD CONSTRAINT fk_post_location
FOREIGN KEY (LocationID) REFERENCES Location(LocationID) ON DELETE SET NULL;

CREATE TABLE Friend (
    UserID1 INT NOT NULL,
    UserID2 INT NOT NULL,
    FriendSinceDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (UserID1, UserID2),
    FOREIGN KEY (UserID1) REFERENCES "User"(UserID) ON DELETE CASCADE,
    FOREIGN KEY (UserID2) REFERENCES "User"(UserID) ON DELETE CASCADE
);

CREATE TABLE Comment (
    CommentID SERIAL PRIMARY KEY,
    PostID INT NOT NULL,
    UserID INT NOT NULL,
    Text TEXT NOT NULL,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (PostID) REFERENCES Post(PostID) ON DELETE CASCADE,
    FOREIGN KEY (UserID) REFERENCES "User"(UserID) ON DELETE CASCADE
);

CREATE TABLE Reaction (
    ReactionID SERIAL PRIMARY KEY,
    PostID INT NOT NULL,
    UserID INT NOT NULL,
    Type ReactionType NOT NULL,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (PostID) REFERENCES Post(PostID) ON DELETE CASCADE,
    FOREIGN KEY (UserID) REFERENCES "User"(UserID) ON DELETE CASCADE
);

CREATE TABLE Notification (
    NotificationID SERIAL PRIMARY KEY,
    UserID INT NOT NULL,
    SentTimestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    WasDismissed BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (UserID) REFERENCES "User"(UserID) ON DELETE CASCADE
);
*/
