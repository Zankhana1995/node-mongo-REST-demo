
## REST demo with Node.JS and MongoDB

In particular folder,

```
npm init
```
```
sudo npm install -g nodemon (globally install)
```

Change in script ,
```
"scripts": {
    "start": "nodemon app.js"
  },
```

```
npm install —save express (for express app)
```

Install rest client from vscode extensions(if you are using visual studio- works like postman)

```
npm install —save mongoos
```

You have 2 options to connect mongoDB
1. Install mongoDB into your machine by downloading it locally.
2. Use mongoDB atlas to connect mongoDB cloud.

Next use mongoDB atlas for mongoDB in cloud
1. Create a free cluster
2. Go to database access: create a user -> choose password method -> create username and password (auto generated would be fine) -> use privilege -> read and write to any database -> Add. (Copy password somewhere)
3. Go to network acmes -> Add IP address -> you can choose default (allow access from anywhere) or specific (from which you can connect to cluster). After choosing it, the status will be active
4. Go to cluster -> click on connect -> connect your application -> driver select as node.js -> copy connection string. -> close. 
5. Paste the the connection string in node Application by roving all the things after ‘mongoldb.net/'  .In place of <password> paste your earlier created password.
6. Rest of things do as per code.

Before saving data into database, you should know.
1. Query Strings
2. Route Paramaters
3. Request Body

For API errors

```
npm install --save http-errors
```

DotENV package for environment variable:

```
npm install --save dotenv,
Yarn add dotenv 
```

