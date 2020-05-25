import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'
import { User } from '../../entities/User'

@ValidatorConstraint({ async: true })
class IsEmailAlreadyExistConstraint implements ValidatorConstraintInterface {
  public async validate(email: string) {
    const userCount = await User.count({ where: { email } })
    if (userCount >= 1) {
      return false
    }
    return true
  }
}

export function IsEmailExist(validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      propertyName,
      constraints: [],
      options: validationOptions,
      target: object.constructor,
      validator: IsEmailAlreadyExistConstraint,
    })
  }
}

@ValidatorConstraint({ async: true })
class InNickNameAlreadyExistConstraint implements ValidatorConstraintInterface {
  public async validate(nickname: string) {
    const userCount = await User.count({ where: { nickname } })
    if (userCount >= 1) {
      return false
    }
    return true
  }
}

export function isNicknameExist(validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      propertyName,
      constraints: [],
      options: validationOptions,
      target: object.constructor,
      validator: InNickNameAlreadyExistConstraint,
    })
  }
}
