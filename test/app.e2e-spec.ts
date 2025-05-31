import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async() => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: []
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  })

  afterAll(async() => {
    await app.close()
  })


  describe('TEST REGISTER POST /user/register', () => {
    it('Should can register', async() => {
      const user = {
        first_name: "amba ganzz",
        last_name: "ali",
        email: "wuwuk@gmail.com",
        password: "12314324"
      }

      const response = await request(app.getHttpServer()).post("/user/register?type=BUYER").send(user);
      console.log(response.body)
      expect(response.status).toBe(HttpStatus.CREATED)
    })
  });


});
