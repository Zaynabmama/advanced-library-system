import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Branch, BranchDocument } from './schemas/branch.schema';
import { UpdateInventoryDto } from './dtos/update-inventory.dto';
import { CreateBranchDto } from './dtos/creaate-branch.dto';

@Injectable()
export class BranchService {
  constructor(@InjectModel(Branch.name) private branchModel: Model<BranchDocument>) {}

  async createBranch(createBranchDto: CreateBranchDto): Promise<Branch> {
    const branch = new this.branchModel(createBranchDto);
    return branch.save();
  }

  async getBranchById(branchId: string): Promise<Branch> {
    const branch = await this.branchModel.findById(branchId);
    return branch;
  }

  async getAllBranches(page: number, limit: number): Promise<Branch[]> {
    const skip = (page - 1) * limit;
    return this.branchModel.find().skip(skip).limit(limit).exec();
  }

  async updateInventory(branchId: string, updateInventoryDto: UpdateInventoryDto): Promise<void> {
    const branch = await this.branchModel.findById(branchId);
    if (!branch) {
      throw new NotFoundException('Branch not found');
    }

    const inventoryItem = branch.inventory.find(
      (item) => item.bookId.toString() === updateInventoryDto.bookId,
    );

    if (inventoryItem) {
      inventoryItem.availableCopies += updateInventoryDto.delta;
      branch.inventory.push({
        bookId: updateInventoryDto.bookId as any,
        availableCopies: updateInventoryDto.delta,
      });
    }

    await branch.save();
  }

  async deleteBranch(branchId: string): Promise<void> {
    const result = await this.branchModel.findByIdAndDelete(branchId);
  }
}
