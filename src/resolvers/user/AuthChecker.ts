import { Context } from 'aws-lambda'
import { User } from '../../entities/User'
import { AuthChecker } from 'type-graphql'
import { get } from 'lodash'
import jwt from 'jsonwebtoken'
import config from '../../config'

const getHeaderToken = (header: any) => {
  if (typeof header !== 'object') {
    return undefined
  }

  const token =
    get(header, 'authorization', undefined) ||
    get(header, 'Authorization', undefined)

  if (typeof token === 'string') {
    if (token.indexOf('Bearer') <= -1) {
      return undefined
    }
    return token.replace('Bearer ', '')
  }
  return undefined
}

export interface AppContext extends Context {
  headers: any
  event: any
  context: any
  user?: User
}

export const userAuthChecker: AuthChecker<AppContext> = (
  resolverData,
  role?
) => {
  const { context } = resolverData

  const token = getHeaderToken(context.headers)

  if (!token) {
    return false
  }

  let authData: User
  try {
    authData = jwt.verify(token, config.jwtSecret) as User
  } catch (e) {
    return false
  }

  if (role && role.length > 0) {
    console.log('role', role)
    console.log('authData.role', authData.role)
    if (role.indexOf(authData.role) === -1) {
      throw new Error('권한이 없습니다.')
    }
  }
  context.user = authData as User
  return true
}
