import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `
type Book {
    id: ID
    title: String
    author: String
  }

  type Query {
    books: [Book]
    getBook(id: ID): Book
  }
    `;

const books = [
  {
    id: 1,
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling",
  },
  {
    id: 2,
    title: "Jurassic Park",
    author: "Michael Crichton",
  },
];

const resolvers = {
  Query: {
    books: () => books,
    getBook: (parent, args) => {
      const { id } = args;
      const book = books.find((book) => book.id === Number(id));
      return book;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
