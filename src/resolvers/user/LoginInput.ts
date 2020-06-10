import { InputType, Field } from 'type-graphql'
import { MinLength, IsEmail, Length } from 'class-validator'
import { PasswordValidate } from './PasswordValidate'
import { ERROR_MSG_PASSWORD_VALIDATE } from '../../language'

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  @Length(5, 255)
  public email: string

  @Field()
  @MinLength(6)
  @PasswordValidate({
    message: ERROR_MSG_PASSWORD_VALIDATE,
  })
  public password: string
}
