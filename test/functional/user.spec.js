'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

const { test, trait } = use('Test/Suite')('UserController')

trait('Test/ApiClient')
trait('Auth/Client')

// STORE
test('It should be able to create user', async ({ client }) => {
  const response = await client.post('/user').send({
    name: 'daniel',
    email: 'daniel@gmail.com',
    password: '123123'
  }).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    name: 'daniel',
    email: 'daniel@gmail.com'
  })
})

test('Request body should have name, email and password to create user', async ({ client }) => {
  const response = await client.post('/user').send({
    name: 'daniel',
    password: '123123'
  }).end()

  const response2 = await client.post('/user').send({
    email: 'daniel@gmail.com',
    password: '123123'
  }).end()

  const response3 = await client.post('/user').send({
    name: 'daniel',
    email: 'daniel@gmail.com'
  }).end()

  response.assertStatus(400)
  response2.assertStatus(400)
  response3.assertStatus(400)
})

test('It should not be able to create existing user', async ({ client }) => {
  const response = await client.post('/user').send({
    name: 'daniel',
    email: 'daniel@gmail.com',
    password: '123123'
  }).end()

  response.assertStatus(400)
})

// UPDATE
test('It should not be able to update profile without password', async ({ client }) => {
  const user = await User.findBy('email', 'daniel@gmail.com')

  const response = await client.put('/user').send({
    name: 'daniel',
    email: 'daniel@gmail.com'
  }).loginVia(user, 'jwt').end()

  response.assertStatus(400)
})

test('It should not be able to update profile with wrong password', async ({ client }) => {
  const user = await User.findBy('email', 'daniel@gmail.com')

  const response = await client.put('/user').send({
    name: 'daniel',
    password: 'wrong-password'
  }).loginVia(user, 'jwt').end()

  response.assertStatus(400)
})