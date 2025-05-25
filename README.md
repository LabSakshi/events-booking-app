# 🎉 GraphQL Event Booking API

A backend GraphQL API built with Node.js, Express, MongoDB, and Mongoose that allows users to create events, sign up, and book events. This project demonstrates handling nested relationships using MongoDB, authentication logic (with `bcryptjs`), and GraphQL's powerful schema/resolver design.

---

## 🚀 Tech Stack

| Tech / Package      | Purpose                                                    |
|---------------------|------------------------------------------------------------|
| **Node.js**         | JavaScript runtime for building the backend                |
| **Express.js**      | Web framework to handle routing and middleware             |
| **GraphQL**         | Query language and runtime for APIs                        |
| **express-graphql** | Middleware to integrate GraphQL with Express               |
| **MongoDB**         | NoSQL database to store users and events                   |
| **Mongoose**        | ODM to define schemas and interact with MongoDB            |
| **bcryptjs**        | Password hashing for user security                         |
| **dotenv**          | Manage environment variables securely                      |
| **nodemon**         | Auto-restarts server on code changes (dev only)            |

---

## 📁 Folder Structure

project-root/
│
├── models/ # Mongoose models (User, Event, Booking)
│ ├── user.js
│ ├── event.js
│ └── booking.js
│
├── graphql/ # GraphQL schema and resolvers
│ ├── schema/index.js
│ └── resolvers/index.js
│
├── app.js # Entry point of the application
├── .env # MongoDB connection string
└── README.md # Project documentation



└──└──└──└──└──└──└──└──└──└──└──└──└──└──└──└──└──└──└──└──└──└──└──└──└──

📚 Learning Takeaways
✅ GraphQL Concepts

Queries and Mutations

Input types

Resolvers and Schema

Nested object relationships

✅ Mongoose Basics

Defining Models and Schemas

Using ref to connect related documents

Populating referenced fields

✅ Security

Password hashing with bcryptjs

Avoid storing plain text passwords

✅ Code Structure

Separation of concerns with models, resolvers, and schema files

✅ Environment Setup

Managing secrets using nodemon.json

👩‍💻 Author
Built with ❤️ by Sakshi Gupta

