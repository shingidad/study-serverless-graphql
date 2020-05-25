import { getConnection, createConnection } from 'typeorm'
import entities from '../entities'

const url = `mysql://${process.env.MYSQL_USER}:${process.env.MYSQL_PASS}@${process.env.MYSQL_HOST}:${process.env.MYSQL_PORT}/${process.env.MYSQL_DATABASE}`
export default async function database() {
  try {
    await getConnection()
  } catch (e) {
    await createConnection({
      name: 'default',
      type: 'mysql',
      url,
      database: process.env.MYSQL_DATABASE,
      entities,
      synchronize: Boolean(process.env.MYSQL_SYNC),
      logger: 'advanced-console',
      logging: 'all',
    })
  }
}
