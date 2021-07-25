# PL-Employee-App
Simple/barebones employee directory web app with create/update/delete functionality. Built using react, node js and mysql.

## Running the project on your local machine
- Run `npm install` in both the 'server' and 'client' directory

- In the 'server' directory start the server with the command: `node index.js` 
- In the 'client' directory run the react app with the command: `npm start` 

The client will run on port 3000 and the server will run on port 3001

- For the app to be functional you will need a mysql database instance running on your local machine with a schema called `plemployeedb` with password `password` and table called `employees`
- Below is an example for the `employee` table schema

![image](https://user-images.githubusercontent.com/22066170/126904164-95018994-5e71-4986-9ac6-9e7f9ffc11d7.png)
