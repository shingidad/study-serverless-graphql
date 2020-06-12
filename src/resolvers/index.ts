import { NonEmptyArray } from 'type-graphql'
import { CategoryResolver } from './category/CategoryResolver'
import { HelloResolver } from './common/HelloResolver'
import { RegisterResolver } from './user'
import { LoginResolver } from './user/LoginResolver'

const resolvers: NonEmptyArray<Function> = [
  CategoryResolver,
  HelloResolver,
  LoginResolver,
  RegisterResolver,
]

export default resolvers
