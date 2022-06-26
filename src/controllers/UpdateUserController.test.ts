import createConnection from '../database'
import { getConnection } from "typeorm";
import { Request } from 'express';
import { makeMockResponse } from '../utils/mocks/mockResponse';
import { UpdateUserController } from "./UpdateUserController";
import { FakeData } from '../utils/fakeData'

describe('UpdateUserController', () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  })

  afterAll(async () => {
    const connection = getConnection()
    await connection.query('DELETE FROM usuarios')
    await connection.close()
  })

  const fakeData = new FakeData

  it('Deve retornar o status 204 quando usuário for editado', async () => {
    
    const mockUser = await fakeData.createUser()

    const updateUserController = new UpdateUserController

    const request = {
      body: {
        id: mockUser.id,
        nome: 'Outro nome',
        email: 'email@email.com.br'
      }
    } as Request
    
    const response = makeMockResponse()

    await updateUserController.handle(request, response)


    expect(response.state.status).toBe(204)
  })
  
})