# Modern Wallet

Implementation of a simple payment wallet.

## Features
- Payments
- Deposit cash
- Withdraws
- Daily yield - TODO

## Docs
- [TODO info](TODO.md)
- [Rest API Docs](api.md)

## Lets collaborate: Todo List
- Encrypt password
- Daily yield
- Implement the Payment service, using an external API
- Unit tests :(
- API Automation tests :(


# Stack
- SQLite
- Express.js
- Typescript :D
- Node.js
- React
- Create React App
- Axios (for React app)

# Running the project
Recommended NODE.js Version: v13.11.0


Create the .env file, just use the .env.sample

In the root of repository, run
```
$ npm install
```
or 
```
$ yarn
```


## Run the Rest API
Go to the `/api` folder, run
```
$ nodemon index.ts
# # or
$ npm run start
# or 
$ yarn run start
```

API will run at [http://localhost:8081](http://localhost:8081) (by default)

## Run the webapp
Go to the `/webapp` folder, run
```
$ npm run start
```

Open [http://localhost:3000](http://localhost:3000), or 3001 (by default)

That's all!
