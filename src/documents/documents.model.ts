import { index, prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export class registerAddress {
  @prop()
  region: string;
  @prop()
  city: string;
  @prop()
  street: string;
  @prop()
  house: string;
}
enum gender {
  woman = 'woman',
  man = 'man',
}
// extends Base( +id )
export interface DocumentModel extends Base {}
// extends TimeStamps( +createdAt, +updatedAt )
@index({ '$**': 'text' })
export class DocumentModel extends TimeStamps {
  @prop()
  surname: string;

  @prop()
  name: string;

  @prop()
  patronymic: string;

  @prop({ enum: gender })
  gender: gender;

  @prop()
  nationality: string;

  @prop()
  dateOfBirth: string;

  @prop()
  register: registerAddress;

  @prop()
  dateOfExpiry: string;

  @prop({ unique: true })
  documentNumber: number;

  @prop()
  placeOfBirth: string;

  @prop({ unique: true })
  rntrc: string;

  @prop()
  img: string;
}
