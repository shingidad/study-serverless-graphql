import { HelloResolver } from './common/HelloResolver'
import { LoginResolver } from './user/LoginResolver'
import { NonEmptyArray } from 'type-graphql'
import { RegisterResolver } from './user'

const resolvers: NonEmptyArray<Function> = [
  HelloResolver,
  LoginResolver,
  RegisterResolver,
]

export default resolvers
