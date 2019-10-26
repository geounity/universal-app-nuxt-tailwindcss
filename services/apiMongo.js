import trae from 'trae'

const apiMongo = trae.create({
  baseUrl: process.env.apiUrl
})

export default apiMongo
