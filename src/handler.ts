import { ApolloServer } from 'apollo-server-lambda'
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from 'aws-lambda'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import resolvers from './resolvers'
import { userAuthChecker } from './resolvers/user/AuthChecker'
import database from './util/database'

async function createHandler() {
  ;(global as any).schema =
    (global as any).schema ||
    (await buildSchema({
      resolvers,
      validate: true,
      authChecker: userAuthChecker,
    }))
  const schema = (global as any).schema

  await database()

  const server = new ApolloServer({
    schema,
    playground: true,
    context: ({ event, context }) => {
      context.callbackWaitsForEmptyEventLoop = false
      const con = {
        headers: event.headers,
        event,
        context,
      }
      return con
    },
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
