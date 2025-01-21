import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { CreateBookDto } from '../book-requests/dtos/create-book.dto';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private readonly bookModel: Model<BookDocument>) {}

  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const book = new this.bookModel(createBookDto);
    return book.save();
  }

  async getBookById(bookId: string): Promise<Book> {
    const book = await this.bookModel.findById(bookId);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async getAllBooks(page: number, limit: number): Promise<Book[]> {
    const skip = (page - 1) * limit;
    return this.bookModel.find().skip(skip).limit(limit).exec();
  }

 

  async deleteBook(bookId: string): Promise<void> {
    const result = await this.bookModel.findByIdAndDelete(bookId);
  }
}
