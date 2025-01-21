import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BookRequest } from './schemas/book-request.schema';
import { CreateBookRequestDto } from './dtos/create-book-request.dto';
import { FilterBookRequestsDto } from './dtos/filter-book-requests.dto';
import { UpdateBookRequestDto } from './dtos/update-book-request.dto';
import { UploadService } from 'src/global/services/upload.service';
import { REQUEST } from '@nestjs/core';
import { UserRequest } from 'src/global/types';
import { CreateBookDto } from './dtos/create-book.dto';
import { BookService } from '../book/book.service';

@Injectable()
export class BookRequestsService {
  constructor(
    @InjectModel(BookRequest.name) private bookRequestModel: Model<BookRequest>,
    @Inject(REQUEST) private readonly request: UserRequest,
    private readonly bookService: BookService,
    //private readonly bookRequestModel: Model<BookRequest>,
    private readonly uploadService: UploadService,
  ) {}

  async createBookRequest(
    createDto: CreateBookRequestDto,
    pdfFile?: Express.Multer.File,
    coverImageFile?: Express.Multer.File,
  ): Promise<BookRequest> {
    const authorId = new Types.ObjectId(this.request.user._id);
  
    const coverImageUrl = coverImageFile
      ? await this.uploadService.uploadImage(coverImageFile)
      : '';
    const pdfUrl = pdfFile
      ? await this.uploadService.uploadPdf(pdfFile)
      : '';
  
    const bookRequest = new this.bookRequestModel({
      ...createDto,
      pdfUrl,
      coverImageUrl,
      authorId,
    });
  
    return bookRequest.save();
  }
  
  
  async getAllBookRequests(filterDto: FilterBookRequestsDto): Promise<BookRequest[]> {
    const { status, authorId } = filterDto;
    const filter = {};

    if (status) filter['status'] = status;
    if (authorId) filter['authorId'] = new Types.ObjectId(authorId);

    return this.bookRequestModel.find(filter).exec();
  }

  async updateBookRequest(id: string, updateDto: UpdateBookRequestDto): Promise<BookRequest> {

    const bookRequest = await this.bookRequestModel.findById(id);
  
    if (!bookRequest) {
      throw new NotFoundException('BookRequest not found');
    }
  
    Object.assign(bookRequest, updateDto);
  
    if (updateDto.status === 'approved') {
      bookRequest.approvalDate = new Date();
  
      const createBookDto: CreateBookDto = {
        title: bookRequest.title,
        genre: bookRequest.genre,
        isbn: bookRequest.isbn,
        description: bookRequest.description,
        minAgeRequirement: bookRequest.minimumAge,
        numberOfCopies: bookRequest.requestedCopies,
        coverImageUrl: bookRequest.coverImageUrl,
        pdfUrl: bookRequest.pdfUrl,
        authorId: bookRequest.authorId.toString(),
      };
  
      await this.bookService.createBook(createBookDto);
    }
  
    await bookRequest.save();
  
    return bookRequest;
  }
  
}
