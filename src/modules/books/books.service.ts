import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const book = new this.bookModel(createBookDto);
    return book.save();
  }

  async getAllBooks(page: number, limit: number): Promise<Book[]> {
    const skip = (page - 1) * limit;
    return this.bookModel.find().skip(skip).limit(limit).exec();
  }

  async getBookById(bookId: string): Promise<Book> {
    const book = await this.bookModel.findById(bookId);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async updateBook(bookId: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.bookModel.findByIdAndUpdate(
      bookId,
      updateBookDto,
      { new: true },
    );
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async deleteBook(bookId: string): Promise<void> {
    const result = await this.bookModel.findByIdAndDelete(bookId);
    if (!result) {
      throw new NotFoundException('Book not found');
    }
  }
}
