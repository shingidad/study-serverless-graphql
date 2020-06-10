import { Query, Resolver, Authorized } from 'type-graphql'

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
}
