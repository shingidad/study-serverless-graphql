import { Post } from '../../entities/Post'
import { Field, Int, ObjectType, Arg, Resolver, Query } from 'type-graphql'
import { IsNull, Like, FindOneOptions } from 'typeorm'

@ObjectType()
class ListResult {
  @Field(() => [Post])
  public posts: Post[]

  @Field(() => Int)
  public count: number
}

@Resolver()
export class PostListResolver {
  @Query(() => ListResult)
  public async postList(
    @Arg('categoryId', () => Int) categoryId: number,
    @Arg('skip', () => Int) skip: number,
    @Arg('take', () => Int) take: number,
    @Arg('search', { nullable: true }) search?: string
  ) {
    let where: FindOneOptions<Post>['where'] = {
      deletedAt: IsNull(),
      categoryId,
    }

    if (search) {
      where = [
        { title: Like(`%${search}%`), ...where },
        { context: Like(`%${search}%`), ...where },
      ]
    }

    const [posts, count] = await Post.findAndCount({
      where,
      skip,
      take,
      relations: ['user'],
      order: { id: 'DESC' },
    })

    const listResult = new ListResult()
    listResult.posts = posts
    listResult.count = count

    return listResult
  }
}
