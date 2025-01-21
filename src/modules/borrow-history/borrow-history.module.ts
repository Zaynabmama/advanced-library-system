import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BorrowHistory, BorrowHistorySchema } from './schemas/borrow-history.schema';
import { Branch, BranchSchema } from '../branches/schemas/branch.schema';
import { Member, MemberSchema } from '../users/schemas/member.schema';
import { BorrowHistoryService } from './borrow-history.service';
import { BorrowHistoryController } from './borrow-history.controller';
import { BranchModule } from '../branches/branches.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BorrowHistory.name, schema: BorrowHistorySchema },
      { name: Branch.name, schema: BranchSchema },
      { name: Member.name, schema: MemberSchema },
    ]),
    BranchModule,
    UsersModule
  ],
  controllers: [BorrowHistoryController],
  providers: [BorrowHistoryService],
})
export class BorrowHistoryModule {}
