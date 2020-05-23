import { Query, Resolver } from 'type-graphql'

@Resolver()
export class HelloResolver {
  @Query(() => String)
  public async hello(): Promise<string> {
    return `world ${Date.now()}`
  }
}
