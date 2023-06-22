# identity_reconcilation
Backend Task Bitespeed

# Steps To Follow TO start the application

1. Create Mysql DB

  $ Query :
  ```
  CREATE TABLE Contact (
    id INT PRIMARY KEY AUTO_INCREMENT,
    phoneNumber VARCHAR(255) NULL,
    email VARCHAR(255) NULL,
    linkPrecedence ENUM('secondary', 'primary') NOT NULL,
    linkedId INT,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    deletedAt DATETIME
  );
  ```

2. ADD ENV Variables in .env file
  ```
  $ PORT=3000

  $ ~ Mysql Creds
  $ MYSQL_HOST=127.0.0.1
  $ MYSQL_PORT=3306
  $ MYSQL_USER=root
  $ MYSQL_PASSWORD=password
  $ MYSQL_DATABASE=bitespeed
  ```
3. npm install   <!-- For installing dependencies -->

4. npm run start:dev   <!-- For npm in watch mode -->

5. Endpoint   e.g. {{base_url}}/identify : Here base_url is the url

6. Body For Endpoint e.g 

    {
      email : "akshay.d@gmail.com",
      phoneNumber : "7424882645"
    }

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

# For creating Sql Table

CREATE TABLE Contact (
  id INT PRIMARY KEY AUTO_INCREMENT,
  phoneNumber VARCHAR(255) NULL,
  email VARCHAR(255) NULL,
  linkPrecedence ENUM('secondary', 'primary') NOT NULL,
  linkedId INT,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  deletedAt DATETIME
);


## License

Nest is [MIT licensed](LICENSE).
