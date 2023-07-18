# Bitespeed Backend Task
identity_reconcilation

# URL For The APPLICATION

https://identity-reconcilation-awzw.vercel.app/identify




# Steps To Follow TO start the application Locally

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
 PORT=3000

 ~ Mysql Creds
 MYSQL_HOST=127.0.0.1
 MYSQL_PORT=3306
 MYSQL_USER=root
 MYSQL_PASSWORD=password$ 
 MYSQL_DATABASE=bitespeed
  ```
3. For installing dependencies
  ```
  npm install
  ```

4. For npm in watch mode
  ```
  npm run start:dev   
  ```

5. Endpoint   e.g. {{base_url}}/identify : Here base_url is the url

6. Body For Endpoint e.g 

    {
      email : "akshay.d@gmail.com",
      phoneNumber : "7424882645"
    }

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## License

Nest is [MIT licensed](LICENSE).
