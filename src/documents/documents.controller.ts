import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UnauthorizedException,
} from '@nestjs/common';
import { Auth } from 'src/auth/common/decorators/auth.decorator';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { FindPassportDto } from './dto/find-document.dto';

@Controller('pass')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  @Auth('manager')
  async create(@Body() dto: CreateDocumentDto) {
    return this.documentsService.create(dto);
  }

  @Post('allpass')
  @Auth('manager')
  findAll(@Body() dto: FindPassportDto) {
    return this.documentsService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.documentsService.findOne(id);
  }

  @Patch(':id')
  @Auth('manager')
  update(@Param('id') id: number, @Body() dto: UpdateDocumentDto) {
    return this.documentsService.update(id, dto);
  }

  @Delete(':id')
  @Auth('manager')
  remove(@Param('id') id: string) {
    return this.documentsService.remove(+id);
  }

  @Get('poisk/:text')
  async test(@Param('text') text: string) {
    return this.documentsService.test(text);
  }
}
