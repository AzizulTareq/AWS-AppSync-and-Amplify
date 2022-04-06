import graphql from "graphql";
import _ from "lodash";

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
} = graphql;

// dummy data
let usersData = [
  {
    id: "1",
    name: "Tareq",
    age: 25,
    profession: "Teacher",
  },
  {
    id: "22",
    name: "Rakib",
    age: "29",
    profession: "Programmer",
  },
  {
    id: "13",
    name: "Karim",
    age: "28",
    profession: "Driver",
  },
];

let hobbiesData = [
  {
    id: "1",
    title: "Programming",
    description: "excellent hobby, no doubt",
    userId: "1",
  },
  {
    id: "2",
    title: "Cycling",
    description: "excellent hobby, no doubt",
    userId: "22",
  },
  {
    id: "13",
    title: "Gardening",
    description: "excellent hobby, no doubt",
    userId: "333",
  },
];

let postsData = [
  {
    id: "1",
    comment: "This is a test comment 1",
    userId: "13",
  },
  {
    id: "2",
    comment: "This is a test comment 2",
    userId: "13",
  },
  {
    id: "3",
    comment: "This is a test comment 3",
    userId: "22",
  },
  {
    id: "4",
    comment: "This is a test comment 11111",
    userId: "1",
  },
];

//create types
const UserType = new GraphQLObjectType({
  name: "User",
  description: "Documentation for user...",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    profession: { type: GraphQLString },
  }),
});

const HobbyType = new GraphQLObjectType({
  name: "Hobby",
  description: "Hobby description",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return _.find(usersData, { id: parent.userId });
      },
    },
  }),
});

const postType = new GraphQLObjectType({
  name: "Post",
  comment: "Post description",
  fields: () => ({
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return _.find(usersData, { id: parent.userId });
      },
    },
  }),
});

//RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Description",

  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },

      resolve(parent, args) {
        return _.find(usersData, { id: args.id });
      },
    },

    hobby: {
      type: HobbyType,
      args: { id: { type: GraphQLString } },

      resolve(parent, args) {
        return _.find(hobbiesData, { id: args.id });
      },
    },

    post: {
      type: postType,
      args: { id: { type: GraphQLString } },

      resolve(parent, args) {
        return _.find(postsData, { id: args.id });
      },
    },
  },
});

console.log(arguments);

export default new GraphQLSchema({
  query: RootQuery,
});
