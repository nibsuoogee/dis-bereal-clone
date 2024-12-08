export const initDBQuery = `CREATE TABLE posts(
	postid SERIAL PRIMARY KEY,
	content BYTEA
);

CREATE TABLE users(
	userid SERIAL PRIMARY KEY,
	username VARCHAR(255) NOT NULL,
	fullname VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	passwordhash VARCHAR(255) NOT NULL,
	photo BYTEA,
	creationdate DATE NOT NULL,
	continent VARCHAR(255) NOT NULL
)
    
`;
