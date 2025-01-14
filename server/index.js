// import { ApolloServer } from "@apollo/server";
// import { startStandaloneServer } from "@apollo/server/standalone";

// const typeDefs = `
// type Book {
//     id: ID
//     title: String
//     author: String
//   }

//   #! Query for GET
//   type Query {
//     books: [Book]
//     getBook(id: ID): Book
//   }

//   input BookInput {
//     title: String
//     author: String
//   }

//   #! Mutation for POST, PUT, DELETE, PATCH
//   type Mutation {
//     addBook(newBook: BookInput): Book
//     updateBook(id:ID, newBook: BookInput): Book
//   }
//     `;

// const books = [
//   {
//     id: 1,
//     title: "Harry Potter and the Chamber of Secrets",
//     author: "J.K. Rowling",
//   },
//   {
//     id: 2,
//     title: "Jurassic Park",
//     author: "Michael Crichton",
//   },
// ];

// const resolvers = {
//   Query: {
//     books: () => books,
//     getBook: (_, args) => {
//       const { id } = args;
//       const book = books.find((book) => book.id === Number(id));
//       return book;
//     },
//   },

//   Mutation: {
//     addBook: (_, args) => {
//       // const { title, author } = args;
//       // const newBook = {
//       //   id: books.length + 1,
//       //   title,
//       //   author,
//       // };
//       // books.push(newBook);
//       // return newBook;
//       const { newBook } = args;
//       const book = { ...newBook, id: books.length + 1 };
//       books.push(book);
//       return book;
//     },
//     updateBook: (_, args) => {
//       const { id, newBook } = args;
//       const bookIndex = books.findIndex((book) => book.id === Number(id));
//       books[bookIndex] = { ...books[bookIndex], ...newBook, id: Number(id) };
//       return books[bookIndex];
//     },
//   },
// };

// const server = new ApolloServer({ typeDefs, resolvers });

// const { url } = await startStandaloneServer(server, {
//   listen: { port: 4000 },
//   context: async function ({ req, res }) {
//     return {
//       authentication: "ini adalah contoh authentication",
//       authorization: "ini adalah contoh authorization",
//     };
//   },
// });

// console.log(`🚀  Server ready at: ${url}`);
// if (process.env.NODE_ENV !== "production") {
//   await import("dotenv/config");
// }

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import {
  typeDefs as userTypeDefs,
  resolvers as userResolever,
} from "./schemas/userSchema.js";

const server = new ApolloServer({
  typeDefs: userTypeDefs,
  resolvers: userResolever,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
