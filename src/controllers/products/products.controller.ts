import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  Res,
} from '@nestjs/common';

import { Response } from 'express';

import { ProductsService } from './../../services/products/products.service';

// NO necesitamos agregar la ruta de products en nuestros @Gets por que ya esta definido en el @Controller
@Controller('products')
export class ProductsController {
  // Para incluir un servicio en un controlador usas el patrón de inyección de dependencias
  constructor(private productsService: ProductsService) {}

  // Notas: Las rutas estaticas siempre van primero para no chocar con las rutas dinamicas
  @Get('filter')
  getProductFilter() {
    return {
      message: `yo soy un filter`,
    };
  }

  // Example: http://localhost:3000/products/1
  /*@Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED) // 👈 Using decorator
  // En @Param recibimos el nombre del atributo productId
  getProduct(@Param('productId') productId: string) {
    // Recibo el nombre renombrado con el mismo nombre productId
    return {
      product: `${productId}`,
    };
  }*/

  // Recuperando respuesta desde express
  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED) // 👈 Using decorator
  // En @Param recibimos el nombre del atributo productId
  getProduct(@Param('productId') productId: string) {
    return this.productsService.findOne(+productId); // El signo '+' convierte un string a un entero
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
    // return {
    //   message: `products limit=> ${limit} offset=> ${offset} brand=> ${brand}`,
    // };
    return this.productsService.findAll();
  }

  @Post() // 👈 New decorator
  create(@Body() payload: any) {
    // Con @Body recibimos los datos del cuerpo y lo renombramos a payload
    // return {
    //   message: 'accion de crear',
    //   payload,
    // };
    return this.productsService.create(payload);
  }

  @Put(':id') // 👈 New decorator
  update(@Param('id') id: string, @Body() payload: any) {
    // recibimos el id como parametro y los datos a modificar desde el @Body
    // return {
    //   id,
    //   payload,
    // };
    return this.productsService.update(+id, payload); // El signo '+' convierte un string a un entero
  }

  @Delete(':id') // 👈 New decorator
  delete(@Param('id') id: number) {
    return this.productsService.remove(+id);
  }
}
