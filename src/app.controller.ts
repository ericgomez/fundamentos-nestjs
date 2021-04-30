import { Controller, Get, Param, Query } from '@nestjs/common';
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

  // Notas: Las rutas estaticas siempre van primero para no chocar con las rutas dinamicas
  @Get('products/filter')
  getProductFilter() {
    return `yo soy un filter`;
  }

  // Example: http://localhost:3000/products/1
  @Get('products/:productId')
  // En @Param recibimos el nombre del atributo productId
  getProduct(@Param('productId') productId: string) {
    // Recibo el nombre renombrado con el mismo nombre productId
    return `product ${productId}`;
  }

  // Example: http://localhost:3000/categories/1/products/10
  @Get('categories/:id/products/:productId')
  getCategory(@Param('productId') productId: string, @Param('id') id: string) {
    return `product ${productId} and categorie ${id}`;
  }

  /*@Get('products')
  getProducts(@Query() params: any) {
    // utilizamos la funcion de desconstruccion EMC6
    const { limit, offset, brand } = params;
    return `products limit=> ${limit} offset=> ${offset} brand=> ${brand}`;
  }*/

  // Example: http://localhost:3000/products?limit=200&offset=10&brand='eric'
  @Get('products')
  getProducts(
    @Query('limit') limit = 100, // Enviamos atributos por defecto
    @Query('offset') offset = 0, // Enviamos atributos por defecto
    @Query('brand') brand: string,
  ) {
    return `products limit=> ${limit} offset=> ${offset} brand=> ${brand}`;
  }
}
