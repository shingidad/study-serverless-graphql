import { NonEmptyArray } from 'type-graphql'
import { CategoryResolver } from './category/CategoryResolver'
import { HelloResolver } from './common/HelloResolver'
import { CommentResolver } from './post/CommentResolver'
import { PostListResolver } from './post/PostListResolver'
import { PostUpdateResolver } from './post/PostUpdateResolver'
import { PostViewResolver } from './post/PostViewResolver'
import { PostWriteResolver } from './post/PostWriteResolver'
import { RegisterResolver } from './user'
import { LoginResolver } from './user/LoginResolver'

const resolvers: NonEmptyArray<Function> = [
  CategoryResolver,
  CommentResolver,
  HelloResolver,
  LoginResolver,
  PostListResolver,
  PostUpdateResolver,
  PostViewResolver,
  PostWriteResolver,
  RegisterResolver,
]

export default resolvers
