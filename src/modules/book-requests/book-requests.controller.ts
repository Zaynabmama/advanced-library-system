import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Param,
  UseGuards,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { PermissionsGuard } from 'src/global/guard/permissions.guard';
import { Permissions } from 'src/global/decorators/permissions.decorator';
import { BookRequestsService } from './book-requests.service';
import { PermissionsEnum, UserType } from 'src/global/enums';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/global/decorators/user-types.decorator';
import { CreateBookRequestDto } from './dtos/create-book-request.dto';
import { FilterBookRequestsDto } from './dtos/filter-book-requests.dto';
import { UpdateBookRequestDto } from './dtos/update-book-request.dto';
import { Messages } from 'src/global/message';

@Controller('book-requests')
@UseGuards(PermissionsGuard)
export class BookRequestsController {
  constructor(private readonly bookRequestsService: BookRequestsService) {}

  @Post()
  @Roles(UserType.Author)
  @UseInterceptors(FilesInterceptor('files', 2))
  async createBookRequest(
    @Body() createBookRequestDto: CreateBookRequestDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const pdfFile = files.find((file) => file.mimetype === 'application/pdf');
    const coverImageFile = files.find((file) =>
      file.mimetype.startsWith('image/'),
    );

    if (!pdfFile || !coverImageFile) {
      throw new BadRequestException('Both PDF and image files are required.');
    }

    await this.bookRequestsService.createBookRequest(
      createBookRequestDto,
      pdfFile,
      coverImageFile,
    );

    return { message: Messages.REQUEST_CREATED };
  }

  @Get()
  @Permissions(PermissionsEnum.MANAGE_BOOKS)
  async getBookRequests(@Query() filterDto: FilterBookRequestsDto) {
    const bookRequests = await this.bookRequestsService.getAllBookRequests(filterDto);
    return { data: bookRequests };
  }

  @Put(':id')
  @Permissions(PermissionsEnum.MANAGE_BOOKS)
  async updateBookRequestStatus(
    @Param('id') id: string,
    @Body() updateBookRequestDto: UpdateBookRequestDto,
  ) {
    await this.bookRequestsService.updateBookRequest(id, updateBookRequestDto);
    return { message:'updated' };
  }
}
