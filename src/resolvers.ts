import { authors, games, reviews } from "./db";

export const resolvers = {
  Query: {
    //default argument is parent,arg,context
    games() {
      return games;
    },
    // destructure id from arg
    game(_, { id }) {
      return games.find((x) => x.id == id);
    },
    authors() {
      return authors;
    },
    author(_, { id }) {
      return authors.find((x) => x.id == id);
    },
    reviews() {
      return reviews;
    },
    review(_, { id }) {
      return reviews.find((x) => x.id == id);
    },
  },
  Game: {
    reviews(parent) {
      return reviews.filter((x) => x.game_id === parent.id);
    },
  },
  Author: {
    reviews(parent) {
      return reviews.filter((x) => x.author_id === parent.id);
    },
  },
  Review: {
    game(parent) {
      return games.find((x) => x.id === parent.id);
    },
    author(parent) {
      return authors.find((x) => x.id === parent.id);
    },
  },
};
