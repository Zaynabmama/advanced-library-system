import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { BorrowHistoryService } from './borrow-history.service';
import { BorrowBookDto } from './dtos/borrow-book.dto';
import { ReturnBookDto } from './dtos/return-book.dto';
import { Roles } from 'src/global/decorators/user-types.decorator';
import { UserType } from 'src/global/enums';

@Controller('borrow-history')
export class BorrowHistoryController {
  constructor(private readonly borrowHistoryService: BorrowHistoryService) {}

  @Post('borrow')
  @Roles(UserType.Member)
  async borrowBook(@Body() borrowBookDto: BorrowBookDto) {
    return await this.borrowHistoryService.borrowBook(borrowBookDto);
  }

  // @Put('return')
  // @Roles(UserType.Member)
  // async returnBook(@Body() returnBookDto: ReturnBookDto) {
  //   return await this.borrowHistoryService.returnBook(returnBookDto);
  // }
}
