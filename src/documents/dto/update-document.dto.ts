import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

enum gender {
  woman,
  man,
}

export class UpdateDocumentDto {
  @IsOptional()
  @IsString()
  surname: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  patronymic: string;

  @IsOptional()
  @IsEnum(gender)
  gender: gender;

  @IsOptional()
  @IsString()
  nationality: string;
  @IsOptional()
  @IsDateString()
  dateOfBirth: string;

  @IsOptional()
  @IsDateString()
  dateOfExpiry: string;

  @IsOptional()
  @IsString()
  register: string;

  @IsOptional()
  @IsNumber()
  @Min(100000000, {
    message: 'Passport cannot be less than 9 characters',
  })
  @Max(999999999, { message: 'Passport cannot be more than 9 characters' })
  documentNumber: number;

  @IsOptional()
  @IsString()
  placeOfBirth: string;

  @IsOptional()
  @IsString()
  rntrc: string;

  @IsOptional()
  @IsString()
  img: string;
}
