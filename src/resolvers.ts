import { prisma } from "./main";

export const resolvers = {
  Query: {
    //default argument is parent,arg,context
    async games() {
      const allgames = await prisma.game.findMany({});
      return allgames;
    },
    // destructure id from arg
    async game(_, { id }) {
      const singleGame = await prisma.game.findUnique({
        where: {
          id,
        },
      });
      return singleGame;
    },
    async authors() {
      const allAuthors = await prisma.author.findMany({});
      return allAuthors;
    },
    async author(_, { id }) {
      const singleAuthor = await prisma.author.findUnique({
        where: {
          id,
        },
      });

      return singleAuthor;
    },
    async reviews() {
      const reviews = await prisma.reviews.findMany({});
      return reviews;
    },
    async review(_, { id }) {
      const singleReview = await prisma.reviews.findUnique({
        where: {
          id,
        },
        include: {
          game: true,
          author: true,
        },
      });
      return singleReview;
    },
  },
  // Game: {
  //   reviews(parent) {
  //     return reviews.filter((x) => x.game_id === parent.id);
  //   },
  // },
  // Author: {
  //   reviews(parent) {
  //     return reviews.filter((x) => x.author_id === parent.id);
  //   },
  // },
  // Review: {
  //   game(parent) {
  //     return games.find((x) => x.id === parent.id);
  //   },
  //   author(parent) {
  //     return authors.find((x) => x.id === parent.id);
  //   },
  // },
  Mutation: {
    async deleteGame(_, { id }) {
      console.log(id);
      const deletedGame = await prisma.game.delete({
        where: {
          id,
        },
      });

      if (!deletedGame) return { statusCode: 404, msg: "Not Found" };
      return deletedGame;
    },
    async addGame(_, arg) {
      const { game } = arg;

      const newGame = await prisma.game.create({
        data: {
          ...game,
        },
      });

      return newGame;
    },
    updateGame(_, arg: any) {
      const updatedGame = prisma.game.update({
        where: {
          id: arg.id,
        },
        data: {
          title: arg.title,
          platform: arg.platform,
        },
      });

      return updatedGame;
    },
  },
};
