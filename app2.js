const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const { schema } = require("./models/event");

const app = express();

app.use(bodyParser.json());
app.use(
  "/graphql/v2",
  graphqlHTTP({
    schema: buildSchema(`
      type Event {
            _id: ID
            title: String!
            description: String!
            price: Float
            date: String
            }
      input eventInputType {
            title: String!
            description: String!
            price: Float
            date: String
          }
      
      type RootQuery{
      events: [Events!]!
      }
      type RootMutation{
        createEvents(eventInput:eventInputType): Event!
      }
      schema{
      query: RootQuery
      mutation: RootMutation}`),
  })
);
app.get("/", (req, res) => {
  res.send("Hello from the server");
});

app.listen(3002);

// i want to create events api
// create event
// book event and delete event in graphQL
// Query: events, event
// mutation: createEvent
// schema for events
// schema for creation of event input
