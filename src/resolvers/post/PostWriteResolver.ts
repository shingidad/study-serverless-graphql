import { Arg, Ctx, Resolver, Authorized, Mutation } from 'type-graphql'
import { Category } from '../../entities/Category'
import { Post } from '../../entities/Post'
import { AppContext } from '../user/AuthChecker'
import { PostInput } from './PostInput'

@Resolver()
export class PostWriteResolver {
  @Authorized()
  @Mutation(() => Post)
  public async postWrite(
    @Ctx() ctx: AppContext,
    @Arg('data') data: PostInput
  ): Promise<Post> {
    const user = ctx.user!

    const category = await Category.findOne(data.categoryId)

    const post = await Post.create({
      category,
      title: data.title,
      context: data.context,
      user,
    }).save()

    return post
  }

  
}
