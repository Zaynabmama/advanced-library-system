import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BorrowHistory, BorrowHistoryDocument } from './schemas/borrow-history.schema';
import { BorrowBookDto } from './dtos/borrow-book.dto';
import { BranchService } from '../branches/branches.service';
import { UsersService } from '../users/services/users.service';
import { REQUEST } from '@nestjs/core';
import { UserRequest } from 'src/global/types';

@Injectable()
export class BorrowHistoryService {
  constructor(
    @InjectModel(BorrowHistory.name) private borrowHistoryModel: Model<BorrowHistoryDocument>,
    @Inject(REQUEST) private readonly request: UserRequest,
    private readonly branchService: BranchService,
    private readonly usersService: UsersService,
  ) {}

  async borrowBook(borrowBookDto: BorrowBookDto): Promise<BorrowHistory> {
    const memberId = this.request.user._id as any;
    const { branchId, bookId, returnDate } = borrowBookDto;
  
    await this.branchService.getBranchById(branchId);
  
    await this.usersService.validateMemberForBorrowing(memberId, bookId);
  
    await this.branchService.updateInventory(branchId, bookId, -1);
  
    const borrowHistory = new this.borrowHistoryModel({
      ...borrowBookDto,
      memberId, 
      borrowDate: new Date(),
      returnDate: new Date(returnDate), 
    });
  
    return borrowHistory.save();
  }
  
//   private calculateReturnDate(borrowDays: number): Date {
//     const returnDate = new Date();
//     returnDate.setDate(returnDate.getDate() + borrowDays);
//     return returnDate;
//   }
}
