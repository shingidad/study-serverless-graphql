import { IsEmail, Length, MinLength } from 'class-validator'
import { Field, InputType } from 'type-graphql'
import { PasswordValidate } from './PasswordValidate'
import { IsEmailExist, isNicknameExist } from './RegisterValidate'
import {
  ERROR_MSG_EXIST_EMAIL,
  ERROR_MSG_EXIST_NICKNAME,
  ERROR_MSG_PASSWORD_VALIDATE,
} from '../../language'

@InputType()
export class RegisterInput {
  @Field()
  @IsEmail()
  @Length(5, 255)
  @IsEmailExist({ message: ERROR_MSG_EXIST_EMAIL })
  public email: string

  @Field()
  @Length(1, 255)
  @isNicknameExist({ message: ERROR_MSG_EXIST_NICKNAME })
  public nickname: string

  @Field()
  @MinLength(6)
  @PasswordValidate({
    message: ERROR_MSG_PASSWORD_VALIDATE,
  })
  public password: string
}
