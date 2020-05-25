import { HelloResolver } from './common/HelloResolver'
import { RegisterResolver } from './user'
import { NonEmptyArray } from 'type-graphql'

const resolvers: NonEmptyArray<Function> = [HelloResolver, RegisterResolver]

export default resolvers
