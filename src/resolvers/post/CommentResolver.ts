import {
  Ctx,
  Arg,
  Resolver,
  Mutation,
  Authorized,
  Query,
  Int,
} from 'type-graphql'
import { AppContext } from '../user/AuthChecker'
import { CommentInput } from './PostInput'
import { Comment } from '../../entities/Comment'
import { IsNull } from 'typeorm'

@Resolver()
export class CommentResolver {
  @Authorized()
  @Mutation(() => Boolean)
  public async commentWrite(
    @Ctx() ctx: AppContext,
    @Arg('data', () => CommentInput) data: CommentInput
  ) {
    const user = ctx.user!

    try {
      await Comment.create({
        userId: user.id,
        ...data,
      }).save()
    } catch (e) {
      console.log(e)
      return false
    }
    return true
  }

  @Query(() => [Comment])
  public async commentList(@Arg('postId', () => Int) postId: number) {
    const comments = await Comment.find({
      where: { postId, deletedAt: IsNull() },
      relations: ['user'],
      order: { id: 'ASC' },
    })
    return comments
  }

  @Authorized()
  @Mutation(() => Boolean)
  public async commentDelete(
    @Ctx() ctx: AppContext,
    @Arg('id', () => Int) id: number
  ) {
    const user = ctx.user!

    const comment = await Comment.findOne({
      where: { id },
      relations: ['user'],
    })

    if (!comment) {
      return false
    }

    if (comment.user.id !== user.id) {
      return false
    }

    comment.deletedAt = new Date()

    await comment.save()

    return true
  }
}
