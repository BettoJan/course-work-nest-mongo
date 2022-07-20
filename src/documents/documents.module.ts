import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { DocumentModel } from './documents.model';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: DocumentModel,
        schemaOptions: {
          collection: 'documents',
        },
      },
    ]),
  ],
  controllers: [DocumentsController],
  providers: [DocumentsService],
})
export class DocumentsModule {}
