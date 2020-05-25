import { ApolloServer } from 'apollo-server-lambda'
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from 'aws-lambda'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import resolvers from './resolvers'
import database from './util/database'

async function createHandler() {
  ;(global as any).schema =
    (global as any).schema || (await buildSchema({ resolvers, validate: true }))
  const schema = (global as any).schema

  await database()

  const server = new ApolloServer({
    schema,
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
