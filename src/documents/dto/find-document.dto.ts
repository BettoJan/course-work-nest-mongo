import { IsNumber, IsString } from 'class-validator';

export class FindPassportDto {
  @IsString()
  sortType: string;

  @IsNumber()
  sortTypeDa: number;

  @IsNumber()
  limit: number;
}
