import { Controller, Get, Param, Query } from '@nestjs/common';

// NO necesitamos agregar la ruta de products en nuestros @Gets por que ya esta definido en el @Controller
@Controller('products')
export class ProductsController {
  // Notas: Las rutas estaticas siempre van primero para no chocar con las rutas dinamicas
  @Get('filter')
  getProductFilter() {
    return `yo soy un filter`;
  }

  // Example: http://localhost:3000/products/1
  @Get(':productId')
  // En @Param recibimos el nombre del atributo productId
  getProduct(@Param('productId') productId: string) {
    // Recibo el nombre renombrado con el mismo nombre productId
    return `product ${productId}`;
  }

  /*@Get('products')
  getProducts(@Query() params: any) {
    // utilizamos la funcion de desconstruccion EMC6
    const { limit, offset, brand } = params;
    return `products limit=> ${limit} offset=> ${offset} brand=> ${brand}`;
  }*/

  // Example: http://localhost:3000/products?limit=200&offset=10&brand='eric'
  @Get()
  getProducts(
    @Query('limit') limit = 100, // Enviamos atributos por defecto
    @Query('offset') offset = 0, // Enviamos atributos por defecto
    @Query('brand') brand: string,
  ) {
    return `products limit=> ${limit} offset=> ${offset} brand=> ${brand}`;
  }
}
