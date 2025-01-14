import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `
type Book {
    id: ID
    title: String
    author: String
  }

  #! Query for GET
  type Query {
    books: [Book]
    getBook(id: ID): Book
  }

  input BookInput {
    title: String
    author: String
  }

  #! Mutation for POST, PUT, DELETE, PATCH
  type Mutation {
    addBook(newBook: BookInput): Book
    updateBook(id:ID, newBook: BookInput): Book
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
    getBook: (_, args) => {
      const { id } = args;
      const book = books.find((book) => book.id === Number(id));
      return book;
    },
  },

  Mutation: {
    addBook: (_, args) => {
      const { title, author } = args;
      const newBook = {
        id: books.length + 1,
        title,
        author,
      };
      books.push(newBook);
      return newBook;
    },
    updateBook: (_, args) => {
      const { id, newBook } = args;
      const bookIndex = books.findIndex((book) => book.id === Number(id));
      books[bookIndex] = { ...books[bookIndex], ...newBook };
      return books[bookIndex];
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
