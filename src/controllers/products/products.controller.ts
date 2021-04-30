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

// NO necesitamos agregar la ruta de products en nuestros @Gets por que ya esta definido en el @Controller
@Controller('products')
export class ProductsController {
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
  getProduct(@Res() response: Response, @Param('productId') productId: string) {
    response.status(200).send({
      // 👈 Using express directly
      product: `${productId}`,
    });
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
    return {
      message: `products limit=> ${limit} offset=> ${offset} brand=> ${brand}`,
    };
  }

  @Post() // 👈 New decorator
  create(@Body() payload: any) {
    // Con @Body recibimos los datos del cuerpo y lo renombramos a payload
    return {
      message: 'accion de crear',
      payload,
    };
  }

  @Put(':id') // 👈 New decorator
  update(@Param('id') id: number, @Body() payload: any) {
    // recibimos el id como parametro y los datos a modificar desde el @Body
    return {
      id,
      payload,
    };
  }

  @Delete(':id') // 👈 New decorator
  delete(@Param('id') id: number) {
    return id;
  }
}
