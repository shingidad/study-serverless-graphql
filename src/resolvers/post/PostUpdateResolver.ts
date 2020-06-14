import { Arg, Authorized, Ctx, Int, Mutation, Resolver } from 'type-graphql'
import { IsNull } from 'typeorm'
import { Post } from '../../entities/Post'
import { AppContext } from '../user/AuthChecker'
import { PostInputUpdate } from './PostInput'

@Resolver()
export class PostUpdateResolver {
  @Authorized()
  @Mutation(() => Post, { nullable: true })
  public async postUpdate(
    @Ctx() ctx: AppContext,
    @Arg('id', () => Int) id: number,
    @Arg('data') data: PostInputUpdate
  ) {
    const user = ctx.user!

    const post = await Post.findOne({
      relations: ['user', 'category'],
      where: { id, deletedAt: IsNull() },
    })
    if (!post) {
      throw new Error('글을 찾을 수 없습니다.')
    }

    if (post.user.id !== user.id) {
      throw new Error('글쓴이와 다릅니다.')
    }

    if (data.title) {
      post.title = data.title
    }
    if (data.context) {
      post.context = data.context
    }

    await post.save()

    return post
  }
}
