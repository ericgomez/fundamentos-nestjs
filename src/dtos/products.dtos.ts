export class CreateProductDto {
  // Creamos atributos de solo lectura y son requeridos
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly stock: number;
  readonly image: string;
}

export class UpdateProductDto {
  // Creamos atributos de solo lectura y pueden ser opcionales con  el signo ?
  readonly name?: string;
  readonly description?: string;
  readonly price?: number;
  readonly stock?: number;
  readonly image?: string;
}
