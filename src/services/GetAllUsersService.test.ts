import { getConnection } from "typeorm";
import createConnection from '../database'
import { GetAllUserService } from './GetAllUsersService'
import { FakeData } from '../utils/fakeData'

describe('GetAllUserService', () => {
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

  it('Deve retornar todos os usuários cadastrados', async () => {

    await fakeData.execute()
    
    const expectedResponse = [ 
      {
        nome: 'Algum usuário',
        email: 'algumusuario@gmail.com'
      },
      {
        nome: 'Outro usuário',
        email: ''

      }
    ]
    const getAllUserService = new GetAllUserService

    const result = await getAllUserService.execute()

    expect(result).toMatchObject(expectedResponse)
  })
})