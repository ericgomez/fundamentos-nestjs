import { Controller, Get, Param } from '@nestjs/common';

// NO necesitamos agregar la ruta de categories en nuestros @Gets por que ya esta definido en el @Controller
// y cualquier metodo que este dentro de @Controller('categories') se le asignara por defecto
@Controller('categories')
export class CategoriesController {
  // Example: http://localhost:3000/categories/1/products/10
  @Get(':id/products/:productId')
  getCategory(@Param('productId') productId: string, @Param('id') id: string) {
    return `product ${productId} and categorie ${id}`;
  }
}
