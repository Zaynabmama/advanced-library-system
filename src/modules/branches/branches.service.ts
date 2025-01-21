import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Branch, BranchDocument } from './schemas/branch.schema';
import { DistributeBookDto } from './dtos/update-inventory.dto';
import { CreateBranchDto } from './dtos/creaate-branch.dto';

@Injectable()
export class BranchService {
  constructor(@InjectModel(Branch.name) private branchModel: Model<BranchDocument>) {}

  async createBranch(createBranchDto: CreateBranchDto): Promise<BranchDocument> {
    const branch = new this.branchModel(createBranchDto);
    return branch.save();
  }

  async getBranchById(branchId: string): Promise<BranchDocument> {
    const branch = await this.branchModel.findById(branchId);
    if (!branch) {
      throw new NotFoundException('Branch not found');
    }
    return branch;
  }

  async getAllBranches(page: number, limit: number): Promise<BranchDocument[]> {
    const skip = (page - 1) * limit;
    return this.branchModel.find().skip(skip).limit(limit).exec();
  }

  async distributeBooks(
    branchId: string,
    distributeBookDto: DistributeBookDto,
  ): Promise<void> {
    const branch = await this.branchModel.findById(branchId);
    if (!branch) {
      throw new NotFoundException('Branch not found');
    }

    const { bookId, numberOfCopies, borrowableDays } = distributeBookDto;
    if (numberOfCopies <= 0) {
      throw new BadRequestException('Number of copies must be greater than zero.');
    }

    const inventoryItem = branch.inventory.find(
      (item) => item.bookId.toString() === bookId,
    );

    if (inventoryItem) {
      inventoryItem.availableCopies += numberOfCopies;
      inventoryItem.borrowableDays = borrowableDays;
    } else {
      branch.inventory.push({
        bookId: bookId as any, 
        availableCopies: numberOfCopies,
        borrowableDays,
      });
    }

    branch.totalBooks += numberOfCopies;
    await branch.save();
  }

  async updateInventory(branchId: string, bookId: string, delta: number): Promise<void> {
    const branch = await this.getBranchById(branchId);

    const inventoryItem = branch.inventory.find(
      (item) => item.bookId.toString() === bookId,
    );

    if (inventoryItem) {
      inventoryItem.availableCopies += delta;

      if (inventoryItem.availableCopies < 0) {
        throw new BadRequestException('Cannot have negative available copies.');
      }
    } else {
      if (delta < 0) {
        throw new BadRequestException('Book not found in inventory.');
      }

      branch.inventory.push({
        bookId: bookId as any,
        availableCopies: delta,
        borrowableDays: 14,
      });
    }

    branch.totalBooks += delta;
    if (branch.totalBooks < 0) {
      throw new BadRequestException('Total books cannot be negative.');
    }

    await branch.save();
  }

  async deleteBranch(branchId: string): Promise<{ message: string }> {
    const result = await this.branchModel.findByIdAndDelete(branchId);
    if (!result) {
      throw new NotFoundException('Branch not found');
    }
    return { message: 'Branch successfully deleted' };
  }
}
