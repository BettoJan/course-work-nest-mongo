import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsObject,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { prop } from '@typegoose/typegoose';

enum gender {
  woman,
  man,
}

export class registerAddress {
  @IsString()
  region: string;
  @IsString()
  city: string;
  @IsString()
  street: string;
  @IsString()
  house: string;
}

export class CreateDocumentDto {
  @IsString()
  surname: string;

  @IsString()
  name: string;

  @IsString()
  patronymic: string;

  @IsEnum(gender)
  gender: gender;

  @IsString()
  nationality: string;

  @IsObject()
  register: registerAddress;

  @IsDateString()
  dateOfBirth: string;

  @IsDateString()
  dateOfExpiry: string;

  @IsNumber()
  @Min(100000000, {
    message: 'Passport cannot be less than 9 characters',
  })
  @Max(999999999, { message: 'Passport cannot be more than 9 characters' })
  documentNumber: number;

  @IsString()
  placeOfBirth: string;

  @IsString()
  rntrc: string;

  @IsString()
  img: string;
}
