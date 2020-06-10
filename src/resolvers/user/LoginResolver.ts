import { User, UserRole } from '../../entities/User'
import { ObjectType, Field, Resolver, Mutation, Arg } from 'type-graphql'
import { LoginInput } from './LoginInput'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../../config'

@ObjectType()
class LoginResponse extends User {
  @Field()
  public token: string
}

@Resolver()
export class LoginResolver {
  @Mutation(() => LoginResponse)
  public async login(
    @Arg('data') loginInput: LoginInput
  ): Promise<LoginResponse> {
    const user = (await User.findOne({
      where: { email: loginInput.email },
    })) as LoginResponse

    if (!user) {
      throw new Error('아이디와 암호를 확인해주세요.')
    }
    const valid = await bcrypt.compare(loginInput.password, user.password)

    if (!valid) {
      throw new Error('아이디와 암호를 확인해주세요.')
    }

    user.token = this.makeToken(user.id, user.nickname, user.email, user.role)
    return user
  }

  /**
   * Json create
   * @param id
   * @param email
   * @param nickanme
   * @param role
   */
  private makeToken(
    id: number,
    email: string,
    nickanme: string,
    role: UserRole
  ): string {
    return jwt.sign({ id, email, nickanme, role }, config.jwtSecret, {
      expiresIn: '30d',
    })
  }
}
