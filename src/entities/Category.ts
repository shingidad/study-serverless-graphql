import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { ObjectType, Field, Int } from 'type-graphql'

@Entity()
@ObjectType({ description: '포스트 카테고리' })
export class Category extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  public readonly id: number

  @Field()
  @Column({ type: 'varchar', length: 255, unique: true })
  public name: string
}
