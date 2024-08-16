import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string): number {
    const intValue = parseInt(value, 10);
    if (isNaN(intValue)) {
      throw new BadRequestException('Validation failed: id must be a number');
    }
    return intValue;
  }
}
