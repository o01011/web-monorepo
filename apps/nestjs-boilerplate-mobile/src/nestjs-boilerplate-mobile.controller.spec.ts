import { Test, TestingModule } from '@nestjs/testing';
import { NestjsBoilerplateMobileController } from './nestjs-boilerplate-mobile.controller';
import { NestjsBoilerplateMobileService } from './nestjs-boilerplate-mobile.service';

describe('NestjsBoilerplateMobileController', () => {
  let nestjsBoilerplateMobileController: NestjsBoilerplateMobileController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NestjsBoilerplateMobileController],
      providers: [NestjsBoilerplateMobileService],
    }).compile();

    nestjsBoilerplateMobileController = app.get<NestjsBoilerplateMobileController>(NestjsBoilerplateMobileController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(nestjsBoilerplateMobileController.getHello()).toBe('Hello World!');
    });
  });
});
