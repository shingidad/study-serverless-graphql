import { ApolloServer, gql } from 'apollo-server-lambda'
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from 'aws-lambda'

async function createHandler() {
  const typeDefs = gql`
    type Query {
      hello: String
    }
  `

  const resolvers = {
    Query: {
      hello: () => 'hello world',
    },
  }

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
  })
  return server.createHandler({ cors: { origin: '*', credentials: true } })
}

export const graphql: Handler<APIGatewayProxyEvent, APIGatewayProxyResult> = (
  event,
  context,
  callback
) => {
  createHandler().then((handler) => {
    context.callbackWaitsForEmptyEventLoop = false
    return handler(event, context, callback)
  })
}
