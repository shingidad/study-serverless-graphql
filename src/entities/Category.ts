import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm'
import { ObjectType, Field, Int } from 'type-graphql'
import { Post } from './Post'

@Entity()
@ObjectType({ description: '포스트 카테고리' })
export class Category extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  public readonly id: number

  @Field()
  @Column({ type: 'varchar', length: 255, unique: true })
  public name: string

  @OneToMany(() => Post, (post) => post.user)
  public posts: Post[]
}
