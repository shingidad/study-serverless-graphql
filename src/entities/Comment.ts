import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm'
import { ObjectType, Field, Int } from 'type-graphql'
import { User } from './User'
import { Post } from './Post'

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  public id: number

  @Field()
  @Column()
  public context: string

  @Field()
  @CreateDateColumn()
  public createAt: Date

  @Field()
  @Column({ nullable: true, default: null })
  public deletedAt: Date | null

  // ----------------
  // JSON
  @Column()
  public userId: number

  @Field(() => User)
  @ManyToOne(() => User, (target) => target.comments)
  public user: User

  @Column()
  public postId: number

  @Field(() => Post)
  @ManyToOne(() => Post, (target) => target.comments)
  public post: Post
}
