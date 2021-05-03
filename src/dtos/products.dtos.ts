import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';

import { PartialType } from '@nestjs/mapped-types';

export class CreateProductDto {
  // Creamos atributos de solo lectura y son requeridos
  @IsString() // Decorador para validar String
  @IsNotEmpty() // Decorador para validar campos no vacios
  readonly name: string;

  @IsString() // Decorador para validar String
  @IsNotEmpty() // Decorador para validar campos no vacios
  readonly description: string;

  @IsNumber() // Decorador para validar numeros
  @IsNotEmpty() // Decorador para validar campos no vacios
  @IsPositive() // Decorador para validar numeros positivos
  readonly price: number;

  @IsNumber() // Decorador para validar numeros
  @IsNotEmpty() // Decorador para validar campos no vacios
  @IsPositive() // Decorador para validar numeros positivos
  readonly stock: number;

  @IsUrl() // Decorador para validar Url
  @IsNotEmpty() // Decorador para validar campos no vacios
  readonly image: string;
}

// PartialType permite reutilizar codigo utilizarndo las mismas validaciones y caracteristicas del clase que se extiende (CreateProductDto)
// y simplemente los atributos los hace opcionales
export class UpdateProductDto extends PartialType(CreateProductDto) {}
