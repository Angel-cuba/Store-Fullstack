import request from 'supertest'

import Product  from '../../src/models/Product'
import app from '../../src/app'
import connect, { MongodHelper } from '../db-helper'
import { IProduct } from '../../src/types/product.type'

const nonExistingMovieId = '5e57b77b5744fa0b461c7906'

async function createProduct(override?: Partial<IProduct>) {
  let product = {
    name: 'test',
    description: 'some description',
    image: 'http://test.com',
    category: 'wood',
    rating: 3.5,
    price: 10,
  }

  if (override) {
product = { ...product, ...override }
  }

  return await request(app).post('/products/create').send(product)
}

describe('product controller', () => {
  let mongodHelper: MongodHelper

  beforeAll(async () => {
    mongodHelper = await connect()
  })

  afterEach(async () => {
    await mongodHelper.clearDatabase()
  })

  afterAll(async () => {
    await mongodHelper.closeDatabase()
  })

  it('should create a product', async () => {
    const res = await createProduct()
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('_id')
    expect(res.body.name).toBe('Angrybirds 2')
  })

  it('should not create a movie with wrong data', async () => {
    const res = await request(app)
      .post('/api/v1/movies')
      .send({
        name: 'Angrybirds 2',
        publishedYear: 2019,
        // These fields should be included
        // rating: 3.5,
        // duration: 120,
        genres: ['Animation', 'Game'],
        characters: ['Red', 'Chuck', 'Bomb'],
      })
    expect(res.status).toBe(400)
  })

  it('should get back an existing movie', async () => {
    let res = await createProduct()
    expect(res.status).toBe(200)

    const productId = res.body._id
    res = await request(app).get(`/api/v1/movies/${productId}`)

    expect(res.body._id).toEqual(productId)
  })

  it('should not get back a non-existing product', async () => {
    const res = await request(app).get(`/products/${nonExistingMovieId}`)
    expect(res.status).toBe(404)
  })

  it('should get back all products', async () => {
    const res1 = await createMovie({
      name: 'Angrybirds 1',
      publishedYear: 2016,
    })
    const res2 = await createMovie({
      name: 'Angrybirds 2',
      publishedYear: 2019,
    })

    const res3 = await request(app).get('/api/v1/movies')

    expect(res3.body.length).toEqual(2)
    expect(res3.body[0]._id).toEqual(res1.body._id)
    expect(res3.body[1]._id).toEqual(res2.body._id)
  })

  it('should update an existing movie', async () => {
    let res = await createProduct()
    expect(res.status).toBe(200)

    const productId = res.body._id
    const update = {
      name: 'Angrybirds 1',
      publishedYear: 2016,
    }

    res = await request(app).put(`/api/v1/movies/${productId}`).send(update)

    expect(res.status).toEqual(200)
    expect(res.body.name).toEqual('Angrybirds 1')
    expect(res.body.publishedYear).toEqual(2016)
  })

  it('should delete an existing movie', async () => {
    let res = await createProduct()
    expect(res.status).toBe(200)
    const productId = res.body._id

    res = await request(app).delete(`/api/v1/movies/${productId}`)

    expect(res.status).toEqual(204)

    res = await request(app).get(`/api/v1/movies/${productId}`)
    expect(res.status).toBe(404)
  })
})
