import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { PrismaClient } from "@prisma/client";

//apollo server takes in 2props typeDef(type defination or schema) and resolver
//resolver handles request and response

export const prisma = new PrismaClient();
async function bootstrap() {
  const server = new ApolloServer({ typeDefs, resolvers });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  //startStandaloneServer with prisma?

  console.log(`🚀  Server ready at: ${url}`);

  // database report
  prisma
    .$connect()
    .then(() => {
      console.log("🚀 Database Connected==🔗🔗🔗🔗==>");
    })
    .catch((error) => {
      console.log(error.message);
    });
}
bootstrap();
