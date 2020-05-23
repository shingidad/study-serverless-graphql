import { HelloResolver } from './common/HelloResolver'
import { NonEmptyArray } from 'type-graphql'

const resolvers: NonEmptyArray<Function> = [HelloResolver]

export default resolvers
