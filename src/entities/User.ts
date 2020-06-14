import { ObjectType, Field } from 'type-graphql'
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  OneToMany,
} from 'typeorm'
import { Post } from './Post'
import { Comment } from './Comment'
export enum UserRole {
  admin = 'admin',
  user = 'user',
}

@Entity()
@ObjectType({ description: '사용자 계정' })
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  public readonly id: number

  @Field()
  @Column({ type: 'varchar', length: 255, unique: true })
  public email: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  public nickname?: string

  @Column()
  public password: string

  @Field()
  @Column({ type: 'enum', enum: UserRole, default: UserRole.user })
  public role: UserRole

  @Field()
  @CreateDateColumn()
  public createAt: Date

  @OneToMany(() => Post, (post) => post.user)
  public posts: Post[]

  @OneToMany(() => Comment, (target) => target.user)
  public comments: Comment[]
}
