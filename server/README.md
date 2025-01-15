# isntagram

Imitate of instagram using React Native and Expo

API DOCS

# Follow Schema

This module defines the GraphQL schema and resolvers for the follow functionality in the application. It allows users to follow and unfollow other users, as well as retrieve followers and following lists.

## Schema

The GraphQL schema defines the following types, queries, and mutations:

### Types

- `Follow`: Represents a follow relationship between two users.

  - `_id`: ID of the follow relationship.
  - `followerId`: ID of the user who is following.
  - `followingId`: ID of the user who is being followed.

- `User`: Represents a user in the application.
  - `_id`: ID of the user.
  - `name`: Name of the user.
  - `username`: Username of the user.
  - `email`: Email of the user.
  - `followers`: List of users who follow this user.
  - `following`: List of users this user is following.

### Queries

- `getFollowers(userId: ID!): [User]`: Retrieves the list of followers for a given user.

  - `userId`: ID of the user whose followers are to be retrieved.

- `getFollowing(userId: ID!): [User]`: Retrieves the list of users that a given user is following.
  - `userId`: ID of the user whose following list is to be retrieved.

### Mutations

- `followUser(newFollow: FollowInput): Follow`: Allows a user to follow or unfollow another user.
  - `newFollow`: Input object containing the following fields:
    - `followerId`: ID of the user who is following (automatically set to the authenticated user's ID).
    - `followingId`: ID of the user to be followed.

## Resolvers

The resolvers handle the logic for the queries and mutations defined in the schema.

### Query Resolvers

- `getFollowers`: Retrieves the list of followers for a given user by calling `FollowModel.getFollowers`.
- `getFollowing`: Retrieves the list of users that a given user is following by calling `FollowModel.getFollowing`.

### Mutation Resolvers

- `followUser`: Allows a user to follow or unfollow another user. It performs the following steps:
  1. Authenticates the user using `contextValue.authN()`.
  2. Checks if the user is trying to follow themselves and throws an error if true.
  3. Sets the `followerId` to the authenticated user's ID.
  4. Checks if the user is already following the target user using `FollowModel.isFollowing`.
  5. If the user is already following, it calls `FollowModel.unfollow` to unfollow the user and returns the result.
  6. If the user is not following, it calls `FollowModel.follow` to follow the user and returns the result.

## Example Usage

### Query: Get Followers

```graphql
query GetFollowers($userId: ID!) {
  getFollowers(userId: $userId) {
    _id
    name
    username
    email
  }
}
query GetFollowing($userId: ID!) {
  getFollowing(userId: $userId) {
    _id
    name
    username
    email
  }
}
mutation FollowUser($newFollow: FollowInput!) {
  followUser(newFollow: $newFollow) {
    _id
    followerId
    followingId
  }
}
```

# Post Schema

This module defines the GraphQL schema and resolvers for the post functionality in the application. It allows users to create, delete, like, and comment on posts, as well as retrieve posts.

## Schema

The GraphQL schema defines the following types, queries, and mutations:

### Types

- `Post`: Represents a post in the application.

  - `_id`: ID of the post.
  - `authorId`: ID of the user who created the post.
  - `content`: Content of the post.
  - `imgUrl`: Image URL of the post.
  - `tags`: List of tags associated with the post.
  - `comments`: List of comments on the post.
  - `likes`: List of likes on the post.
  - `createdAt`: Timestamp when the post was created.
  - `updatedAt`: Timestamp when the post was last updated.

- `Comment`: Represents a comment on a post.

  - `comment`: Content of the comment.
  - `username`: Username of the user who made the comment.
  - `createdAt`: Timestamp when the comment was created.
  - `updatedAt`: Timestamp when the comment was last updated.

- `Like`: Represents a like on a post.
  - `username`: Username of the user who liked the post.
  - `createdAt`: Timestamp when the like was created.
  - `updatedAt`: Timestamp when the like was last updated.

### Queries

- `getPosts: [Post]`: Retrieves the list of all posts.
- `getPost(id: ID!): Post`: Retrieves a single post by its ID.
  - `id`: ID of the post to be retrieved.
- `getPostsByUser(userId: ID!): [Post]`: Retrieves the list of posts created by a specific user.
  - `userId`: ID of the user whose posts are to be retrieved.

### Mutations

- `createPost(newPost: PostInput): Post`: Allows a user to create a new post.

  - `newPost`: Input object containing the following fields:
    - `content`: Content of the post.
    - `imgUrl`: Image URL of the post.
    - `tags`: List of tags associated with the post.

- `deletePost(id: ID!): Post`: Allows a user to delete a post.

  - `id`: ID of the post to be deleted.

- `addCommentToPost(postId: ID!, comment: String!): Post`: Allows a user to add a comment to a post.

  - `postId`: ID of the post to be commented on.
  - `comment`: Content of the comment.

- `deleteCommentFromPost(postId: ID!, commentId: ID!): Post`: Allows a user to delete a comment from a post.

  - `postId`: ID of the post from which the comment is to be deleted.
  - `commentId`: ID of the comment to be deleted.

- `likePost(postId: ID!): Post`: Allows a user to like or unlike a post.
  - `postId`: ID of the post to be liked or unliked.

## Resolvers

The resolvers handle the logic for the queries and mutations defined in the schema.

### Query Resolvers

- `getPosts`: Retrieves the list of all posts by calling `PostModel.getPosts`.
- `getPost`: Retrieves a single post by its ID by calling `PostModel.findPostById`.
- `getPostsByUser`: Retrieves the list of posts created by a specific user by calling `PostModel.findPostByUserId`.

### Mutation Resolvers

- `createPost`: Allows a user to create a new post. It performs the following steps:

  1. Authenticates the user using `contextValue.authN()`.
  2. Sets the `authorId` to the authenticated user's ID.
  3. Calls `PostModel.createPost` to create the post and returns the result.

- `deletePost`: Allows a user to delete a post. It performs the following steps:

  1. Authenticates the user using `contextValue.authN()`.
  2. Sets the `userId` to the authenticated user's ID.
  3. Calls `PostModel.deletePostById` to delete the post.
  4. Returns the deleted post and a message indicating that the post was deleted.

- `addCommentToPost`: Allows a user to add a comment to a post. It performs the following steps:

  1. Authenticates the user using `contextValue.authN()`.
  2. Sets the `username` to the authenticated user's username.
  3. Calls `PostModel.addCommentToPost` to add the comment.
  4. Returns the updated post and a message indicating that the comment was added.

- `deleteCommentFromPost`: Allows a user to delete a comment from a post. It performs the following steps:

  1. Authenticates the user using `contextValue.authN()`.
  2. Sets the `username` to the authenticated user's username.
  3. Calls `PostModel.deleteCommentFromPost` to delete the comment.
  4. Returns the updated post and a message indicating that the comment was deleted.

- `likePost`: Allows a user to like or unlike a post. It performs the following steps:
  1. Authenticates the user using `contextValue.authN()`.
  2. Sets the `username` to the authenticated user's username.
  3. Checks if the user has already liked the post.
  4. If the user has liked the post, calls `PostModel.unlikePost` to unlike the post and returns the updated post and a message indicating that the post was unliked.
  5. If the user has not liked the post, calls `PostModel.likePost` to like the post and returns the updated post and a message indicating that the post was liked.

## Example Usage

### Query: Get Posts

```graphql
query GetPosts {
  getPosts {
    _id
    authorId
    content
    imgUrl
    tags
    comments {
      comment
      username
      createdAt
    }
    likes {
      username
      createdAt
    }
    createdAt
    updatedAt
  }
}

mutation CreatePost($newPost: PostInput!) {
  createPost(newPost: $newPost) {
    _id
    authorId
    content
    imgUrl
    tags
    createdAt
    updatedAt
  }
}
```

# User Schema

This module defines the GraphQL schema and resolvers for the user functionality in the application. It allows users to register, login, and retrieve user information.

## Schema

The GraphQL schema defines the following types, queries, and mutations:

### Types

- `User`: Represents a user in the application.

  - `_id`: ID of the user.
  - `name`: Name of the user.
  - `username`: Username of the user.
  - `email`: Email of the user.
  - `followers`: List of users who follow this user.
  - `following`: List of users this user is following.

- `Login`: Represents the login response.
  - `accessToken`: Access token for the user.
  - `userId`: ID of the user.
  - `username`: Username of the user.

### Queries

- `getUsers: [User]`: Retrieves the list of all users.
- `getUser(id: ID): User`: Retrieves a single user by their ID.
  - `id`: ID of the user to be retrieved.
- `searchUser(search: String): [User]`: Searches for users by a search string.
  - `search`: Search string to find users.
- `getUserByUsername(username: String): User`: Retrieves a single user by their username.
  - `username`: Username of the user to be retrieved.

### Mutations

- `register(newUser: UserInput): User`: Allows a new user to register.

  - `newUser`: Input object containing the following fields:
    - `username`: Username of the user.
    - `email`: Email of the user.
    - `password`: Password of the user.
    - `name`: Name of the user.

- `login(login: LoginInput): Login`: Allows a user to login.
  - `login`: Input object containing the following fields:
    - `email`: Email of the user.
    - `password`: Password of the user.

## Resolvers

The resolvers handle the logic for the queries and mutations defined in the schema.

### Query Resolvers

- `getUsers`: Retrieves the list of all users by calling `UserModel.getUsers`.
- `getUser`: Retrieves a single user by their ID by calling `UserModel.findUserById`.
- `searchUser`: Searches for users by a search string by calling `UserModel.searchUser`.
- `getUserByUsername`: Retrieves a single user by their username by calling `UserModel.findUserByUsername`.

### Mutation Resolvers

- `register`: Allows a new user to register. It performs the following steps:

  1. Extracts the `newUser` input from the arguments.
  2. Calls `UserModel.create` to create the new user and returns the result.

- `login`: Allows a user to login. It performs the following steps:
  1. Extracts the `login` input from the arguments.
  2. Calls `UserModel.login` to authenticate the user and returns the result.

## Example Usage

### Query: Get Users

```graphql
query GetUsers {
  getUsers {
    _id
    name
    username
    email
  }
}

mutation Register($newUser: UserInput!) {
  register(newUser: $newUser) {
    _id
    name
    username
    email
  }
}

mutation Login($login: LoginInput!) {
  login(login: $login) {
    accessToken
    userId
    username
  }
}
```
