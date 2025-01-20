import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { PaginatedDto } from 'src/global/dto/pagination.dto';
import { BookService } from './books.service';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async createBook(@Body() createBookDto: CreateBookDto) {
    const book = await this.bookService.createBook(createBookDto);
    return { message: 'Book created successfully', book };
  }

  @Get()
  async getAllBooks(@Query() paginationDto: PaginatedDto) {
    const books = await this.bookService.getAllBooks(
      paginationDto.page,
      paginationDto.limit,
    );
    return { books };
  }

  @Get(':id')
  async getBookById(@Param('id') bookId: string) {
    const book = await this.bookService.getBookById(bookId);
    return { book };
  }

  @Put(':id')
  async updateBook(
    @Param('id') bookId: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    const updatedBook = await this.bookService.updateBook(bookId, updateBookDto);
    return { message: 'Book updated successfully', updatedBook };
  }

  @Delete(':id')
  async deleteBook(@Param('id') bookId: string) {
    await this.bookService.deleteBook(bookId);
    return { message: 'Book deleted successfully' };
  }
}
