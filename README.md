# Tools installed
-  [Create React App](https://github.com/facebook/create-react-app).
-  [json-server](https://github.com/typicode/json-server)


# Setup
1. `npm install`
2. `npm run start` will start Create React App on 3000
3. `npm run server` will start json-server on 3001


# json server
We have loaded in the stock data into the server under 'stockPrices' and the empty portfolio under 'portfolio'.

- http://localhost:3001/stockPrices - will give you all the data
- http://localhost:3001/stockPrices?date=1/5/17 - will filter by date

It also supports full CRUD operations, see the json-server documentation for more options.
