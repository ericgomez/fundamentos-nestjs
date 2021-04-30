import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './../../entities/product.entity';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'bla bla',
      price: 122,
      image: '',
      stock: 12,
    },
  ];

  // Devolver todos
  findAll() {
    return this.products;
  }

  // Devolver uno
  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);
    // Como buena practica siempre debemos validar primero los errores
    if (!product) {
      // Lanzamos un mensaje de error
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  // Crear un producto
  create(payload: any) {
    // incrementamos el contador
    this.counterId = this.counterId + 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  // Actualizar un producto
  update(id: number, payload: any) {
    const product = this.findOne(id);
    if (product) {
      const index = this.products.findIndex((item) => item.id === id);
      this.products[index] = {
        ...product,
        ...payload,
      };
      return this.products[index];
    }
    return null;
  }

  // Eliminar un producto
  remove(id: number) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    this.products.splice(index, 1);
    return true;
  }
}
