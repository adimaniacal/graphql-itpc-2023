const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const usersData = require("./MOCK_DATA.json");
const port = 4000;

// GraphQL Schema
const schema = buildSchema(`
    type Query {
        user(id: Int!): User
        userByLocation(location: String): [User]
        userByEmail(email: String): User
    }
    type Mutation {
        updateUserByLocation(id: Int!, location: String!): User
    }
    type User {
        id: Int
        firstName: String
        lastName: String
        email: String
        gender: String
        employer: String
        jobTitle: String
        ein: String
        location: String
    }
`);

const getUser = function (args) {
  const id = args.id;
  return usersData.filter((user) => {
    return user.id == id;
  })[0];
};

const getUsersByLocation = function (args) {
  if (args.location) {
    const location = args.location;
    return usersData.filter((user) => user.location === location);
  } else {
    return usersData;
  }
};

const getUserByEmail = function (args) {
  const email = args.email;
  return usersData.filter((user) => {
    return user.email == email;
  })[0];
};

const updateUserByLocation = function ({ id, location }) {
  usersData.map((user) => {
    if (user.id === id) {
      user.location = location;

      return user;
    }
  });
  return usersData.filter((user) => user.id === id)[0];
};

// Root resolver
/*
  Similar to REST API this is like creating two routes, one for getting all users
*/
const root = {
  user: getUser,
  userByEmail: getUserByEmail,
  userByLocation: getUsersByLocation,
  updateUserByLocation: updateUserByLocation,
};

// Create an express server and a GraphQL endpoint
const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
