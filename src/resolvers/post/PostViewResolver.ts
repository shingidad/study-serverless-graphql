import { Resolver, Arg, Int } from 'type-graphql'
import { Post } from '../../entities/Post'
import { getRepository } from 'typeorm'

@Resolver()
export class PostViewResolver {
  public async postView(
    @Arg('id', () => Int) id: number
  ): Promise<Post | null> {
    await getRepository(Post)
      .createQueryBuilder()
      .update(Post)
      .set({
        views: () => '`views`+1',
      })
      .where('id = :id', { id })
      .execute()

    const post = await getRepository(Post)
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.category', 'category')
      .where('post.id = :id', { id })
      .andWhere('post.deletedAt IS NULL')
      .getOne()

    return post
  }
}
