import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'

@ValidatorConstraint({ async: false })
class PasswordValidatorConstraint implements ValidatorConstraintInterface {
  public validate(password: string) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@!%*?&.])[A-Za-z\d$@!%*?&.]{6,}/
    return re.test(password)
  }
}

export function PasswordValidate(validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: PasswordValidatorConstraint,
    })
  }
}
