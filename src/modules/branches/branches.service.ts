import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Branch, BranchDocument } from './schemas/branch.schema';
import { CreateBranchDto } from './dtos/creaate-branch.dto';
import { UpdateInventoryDto } from './dtos/update-inventory.dto';

@Injectable()
export class BranchService {
  constructor(@InjectModel(Branch.name) private branchModel: Model<BranchDocument>) {}

  async createBranch(createBranchDto: CreateBranchDto): Promise<Branch> {
    const branch = new this.branchModel(createBranchDto);
    return branch.save();
  }

  async getBranchById(branchId: string): Promise<Branch> {
    const branch = await this.branchModel.findById(branchId);
    if (!branch) {
      throw new NotFoundException('Branch not found');
    }
    return branch;
  }

  async getAllBranches(page: number, limit: number): Promise<Branch[]> {
    const skip = (page - 1) * limit;
    return this.branchModel.find().skip(skip).limit(limit).exec();
  }

  async deleteBranch(branchId: string): Promise<void> {
    const result = await this.branchModel.findByIdAndDelete(branchId);
    if (!result) {
      throw new NotFoundException('Branch not found');
    }
  }

  async updateInventory(
    branchId: string,
    bookId: string,
    delta: number,
  ): Promise<void> {
    const branch = await this.branchModel.findById(branchId);
    if (!branch) {
      throw new NotFoundException('Branch not found');
    }
  
    const inventoryItem = branch.inventory.find(
      (item) => item.bookId.toString() === bookId,
    );
  
    if (!inventoryItem && delta < 0) {
      throw new BadRequestException('Book not found in inventory.');
    }
  
    if (inventoryItem) {
      inventoryItem.availableCopies += delta;
      if (inventoryItem.availableCopies < 0) {
        throw new BadRequestException('Cannot have negative available copies.');
      }
    } else {
      branch.inventory.push({
        bookId: new Types.ObjectId(bookId),
        availableCopies: delta,
      });
    }
  
    await branch.save();
  }
 
}
