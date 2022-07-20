import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { InjectModel } from 'nestjs-typegoose';
import { DocumentModel } from './documents.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { USER_NOT_FOUND_ERROR } from './constants/user.constants';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectModel(DocumentModel)
    private readonly documentModel: ModelType<DocumentModel>,
  ) {}
  create(dto: CreateDocumentDto) {
    return this.documentModel.create(dto);
  }

  findAll() {
    return this.documentModel.find();
  }

  findOne(id: number) {
    return this.documentModel.findOne({ documentNumber: id });
  }

  update(id: number, dto: UpdateDocumentDto) {
    const user = this.documentModel.findOne({ documentNumber: id });
    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }
    return this.documentModel
      .findOneAndUpdate({ documentNumber: id }, dto, { new: true })
      .exec();
  }

  remove(id: number) {
    return this.documentModel.findOneAndDelete({ documentNumber: id });
  }
}
