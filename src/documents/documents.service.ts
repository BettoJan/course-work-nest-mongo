import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { InjectModel } from 'nestjs-typegoose';
import { DocumentModel } from './documents.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { USER_NOT_FOUND_ERROR } from './constants/user.constants';
import { FindPassportDto } from './dto/find-document.dto';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectModel(DocumentModel)
    private readonly documentModel: ModelType<DocumentModel>,
  ) {}
  create(dto: CreateDocumentDto) {
    return this.documentModel.create(dto);
  }

  findAll(dto: FindPassportDto) {
    return this.documentModel
      .aggregate([
        {
          $sort: {
            [dto.sortType]: 1,
          },
        },
        {
          $limit: dto.limit,
        },
      ])
      .exec();
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

  async test(text: string) {
    return this.documentModel
      .find({
        $text: { $search: text, $caseSensitive: false },
      })
      .exec();
  }
}
