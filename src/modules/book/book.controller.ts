import { Controller, Get, Query, Param } from '@nestjs/common';
import { BookService } from './book.service';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getAllBooks(@Query('page') page = 1, @Query('limit') limit = 10) {
    const books = await this.bookService.getAllBooks(page, limit);
    return { books };
  }

  @Get(':id')
  async getBookById(@Param('id') bookId: string) {
    const book = await this.bookService.getBookById(bookId);
    return { book };
  }
}
