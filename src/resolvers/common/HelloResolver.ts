import { Query, Resolver, Authorized, Ctx } from 'type-graphql'
import { AppContext } from '../user/AuthChecker'
import { User } from '../../entities/User'

@Resolver()
export class HelloResolver {
  @Query(() => String)
  public async hello(): Promise<string> {
    return `world ${Date.now()}`
  }

  @Authorized()
  @Query(() => Boolean)
  public async authRequire(): Promise<boolean> {
    return true
  }

  @Authorized('admin')
  @Query(() => User)
  public async authInfo(@Ctx() ctx: AppContext): Promise<User> {
    return ctx.user
  }
}
