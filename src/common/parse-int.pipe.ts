import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException, //BadRequestException permite retornar una exception
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10); // Convertir a numero el string siempre y cuando sea un string con un numero dentro
    // La función isNaN() determina cuando el valor es NaN o no.
    // En caso que el val de string no sea un numero validamos si pudo parsearlo a un entero
    if (isNaN(val)) {
      // Si el valor es indefinido mostramos el mensaje con el valor original
      throw new BadRequestException(`${value} is not an number`);
    }
    // Si el valor si se parsea a entero lo retornamos
    return val;
  }
}
