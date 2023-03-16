const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = graphql;
const userData = require("../MOCK_DATA.json");

const UserType = require("./TypeDefs/UserType");

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    getAllUsers: {
      type: new GraphQLList(UserType),
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return userData;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        id: { type: GraphQLInt },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        gender: { type: GraphQLString },
        employer: { type: GraphQLString },
        jobTitle: { type: GraphQLString },
        ein: { type: GraphQLString },
        location: { type: GraphQLString },
      },
      resolve(parent, args) {
        userData.push({
          id: userData.length + 1,
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          gender: args.gender,
          employer: args.employer,
          jobTitle: args.jobTitle,
          ein: args.ein,
          location: args.location,
        });
        return args;
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: Query, mutation: Mutation });

