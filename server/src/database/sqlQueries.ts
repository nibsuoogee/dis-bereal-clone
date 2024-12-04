export const initDBQuery = `

CREATE TABLE users(
	userid SERIAL PRIMARY KEY,
	username VARCHAR(255) NOT NULL,
	fullname VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	passwordHash VARCHAR(255) NOT NULL,
	photo BYTEA,
	creationDate DATE NOT NULL,
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
