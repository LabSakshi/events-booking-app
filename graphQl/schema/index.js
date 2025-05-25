const { buildSchema } = require("graphql");

module.exports = buildSchema(`
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
            createUser(userInput: UserInput): User
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
        }`);
