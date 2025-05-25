const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const event = require("./models/event");
const schema = require("./graphQl/schema/index");
const resolver = require("./graphQl/resolver/index");
const app = express();
app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: resolver,
    graphiql: true,
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.s0pvymm.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(3001);
  })
  .catch((err) => {
    console.log(err);
  });

// 👉 Mongoose takes that ID (682ff4affc6aef88a98951aa) and fetches the full User document from the users collection where _id == 682ff4affc6aef88a98951aa.
// events: creator full info
// user: created event id==>> created event full info
