import { Length } from 'class-validator'
import { Field, Int, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm'
import { User } from './User'
import { Category } from './Category'
import { Comment } from './Comment'

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  public id: number

  @Field()
  @Length(1, 50)
  @Column()
  public title: string

  @Field(() => Int)
  @Column({ type: 'int', default: 0 })
  public views: number

  @Field()
  @Column({ type: 'text' })
  public context: string

  @Field()
  @CreateDateColumn()
  public createdAt: Date

  @Field()
  @Column({ nullable: true, default: null })
  public deletedAt: Date | null

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  @JoinColumn()
  public user: User

  @Column()
  public categoryId: number

  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.posts)
  @JoinColumn()
  public category: Category

  @Field(() => [Comment])
  @OneToMany(() => Comment, (target) => target.post)
  public comments: Comment[]
}
