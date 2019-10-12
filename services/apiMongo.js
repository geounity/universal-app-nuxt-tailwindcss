import trae from 'trae'
import config from '~/config'

const apiMongo = trae.create({
  baseUrl: config.configService.apiUrl
})

export default apiMongo
