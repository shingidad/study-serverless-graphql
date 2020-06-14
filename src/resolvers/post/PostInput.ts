import { Length } from 'class-validator'
import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class PostInput {
  @Field()
  public categoryId: number

  @Field()
  @Length(2, 255)
  public title: string

  @Field()
  public context: string
}

@InputType()
export class PostInputUpdate {
  @Field({ nullable: true })
  @Length(2, 255)
  public title?: string

  @Field({ nullable: true })
  public context?: string
}

@InputType()
export class CommentInput {
  @Field(() => Int)
  public postId: number

  @Field()
  public context: string
}
