import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BranchService } from './branches.service';
import { CreateBranchDto } from './dtos/creaate-branch.dto';
import { UpdateInventoryDto } from './dtos/update-inventory.dto';
import { PaginatedDto } from 'src/global/dto/pagination.dto';
import { PermissionsGuard } from 'src/global/guard/permissions.guard';
import { Permissions } from 'src/global/decorators/permissions.decorator';
import { PermissionsEnum } from 'src/global/enums';
import { Messages } from 'src/global/message';

@Controller('branches')
@UseGuards(PermissionsGuard)
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Post()
  @Permissions(PermissionsEnum.MANAGE_BRANCHES)
  async createBranch(@Body() createBranchDto: CreateBranchDto) {
    const branch = await this.branchService.createBranch(createBranchDto);
    return { message: Messages.BRANCH_CREATED };
  }

  @Get()
  @Permissions(PermissionsEnum.MANAGE_BRANCHES)
  async getAllBranches(@Query() paginatedDto: PaginatedDto) {
    const branches = await this.branchService.getAllBranches(
      paginatedDto.page,
      paginatedDto.limit,
    );
    return { branches };
  }

  @Get(':id')
  @Permissions(PermissionsEnum.MANAGE_BRANCHES)
  async getBranchById(@Param('id') branchId: string) {
    const branch = await this.branchService.getBranchById(branchId);
    return { branch };
  }

  @Put(':id/inventory')
  @Permissions(PermissionsEnum.MANAGE_BRANCHES)
  async updateInventory(
    @Param('id') branchId: string,
    @Body() updateInventoryDto: UpdateInventoryDto,
  ) {
    await this.branchService.updateInventory(
      branchId,
      updateInventoryDto.bookId,
      updateInventoryDto.delta,
    );
    return { message: Messages.BRANCH_INVENTORY_UPDATED };
  }

  @Delete(':id')
  @Permissions(PermissionsEnum.MANAGE_BRANCHES)
  async deleteBranch(@Param('id') branchId: string) {
    await this.branchService.deleteBranch(branchId);
    return { message: Messages.BRANCH_DELETED };
  }
}
