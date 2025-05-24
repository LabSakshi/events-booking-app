const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Event = require("./models/event");
const User = require("./models/user");
const user = require("./models/user");
const app = express();
app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
        type Event {
            _id: ID
            title: String!
            description: String!
            price: Float
            date: String
            creator: User!
            }

        type RootQuery{
            events: [Event!]!
            users: [User!]!
        }

        input EventInput {
            title: String!
            description: String!
            price: Float
            date: String
            }

        type RootMutation{
            createEvent(eventInput:EventInput): Event!
            createUser(userInput: UserInput): User!
        }

        input UserInput{
        email: String!
        password: String!}

        type User {
        _id: ID!
        email: String!
        password: String!
        createdEvents:[Event!]
        }

        schema{
            query:RootQuery
            mutation:RootMutation
        }`),
    rootValue: {
      events: () => {
        return Event.find()
          .populate("creator")
          .then((events) => {
            return events.map((event) => {
              return {
                ...event._doc,
                _id: event.id,
                creator: {
                  ...event._doc.creator._doc,
                  _id: event._doc.creator.id,
                },
              };
            });
          })
          .catch((err) => {
            throw err;
          });
      },
      createEvent: (args) => {
        const event = new Event({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: args.eventInput.price,
          date: new Date(args.eventInput.date),
          creator: "682ff4affc6aef88a98951aa",
        });

        let createdEvent;

        return event
          .save()
          .then((result) => {
            createdEvent = { ...result._doc, _id: result.id };
            return User.findById("682ff4affc6aef88a98951aa");
          })
          .then((user) => {
            if (!user) {
              throw new Error("User not found");
            }
            user.createdEvents.push(event);
            return user.save();
          })
          .then(() => {
            return createdEvent;
          })
          .catch((err) => {
            throw err;
          });
      },
      createUser: (args) => {
        return User.findOne({ email: args.userInput.email })
          .then((user) => {
            if (user) {
              throw new Error("User exist already");
            }
            return bcrypt.hash(args.userInput.password, 12);
          })
          .then((hashedPassword) => {
            const user = new User({
              email: args.userInput.email,
              password: hashedPassword,
            });

            return user.save();
          })
          .then((result) => {
            return { ...result._doc, password: null, _id: result.id };
          })
          .catch((err) => {
            throw err;
          });
      },
    },
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
