import {
  Arg,
  Authorized,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql'
import { Category } from '../../entities/Category'
import { AppContext } from '../user/AuthChecker'

@Resolver()
export class CategoryResolver {
  @Authorized('admin')
  @Mutation(() => Boolean)
  public async categoryWrite(
    @Ctx() ctx: AppContext,
    @Arg('name') name: string
  ): Promise<boolean> {
    await Category.create({ name }).save()
    return true
  }

  @Query(() => [Category])
  public async categoryList(): Promise<Category[]> {
    const category = await Category.find()
    return category
  }

  @Query(() => String)
  public async categoryName(@Arg('id', () => Int) id: number): Promise<string> {
    const category = await Category.findOne(id)
    return category.name
  }
}
