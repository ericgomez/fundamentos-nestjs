import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'Hola Mundo!';
  }

  // http://localhost:3000/nuevo
  @Get('nuevo') // 👈 Without slashes
  newEndpoint() {
    return 'yo soy nuevo';
  }

  // http://localhost:3000/ruta
  @Get('/ruta/') // 👈 With slashes
  hello() {
    return 'con /sas/';
  }
}
