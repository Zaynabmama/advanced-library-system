import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { BranchService } from './branches.service';
import { UpdateInventoryDto } from './dtos/update-inventory.dto';
import { Permissions } from 'src/global/decorators/permissions.decorator';
import { PermissionsEnum } from 'src/global/enums';
import { Public } from 'src/global/decorators/public.decorator';
import { CreateBranchDto } from './dtos/creaate-branch.dto';
import { Messages } from 'src/global/message';

@Controller('branches')
export class BranchesController {
  constructor(private readonly branchService: BranchService) {}

  @Post()
  @Permissions(PermissionsEnum.MANAGE_BRANCHES)
  async createBranch(@Body() createBranchDto: CreateBranchDto) {
    const branch = await this.branchService.createBranch(createBranchDto);
    return { message:Messages.BRANCH_CREATED , branch };
  }

  @Get(':id')
  @Public()
  async getBranchById(@Param('id') id: string) {
    const branch = await this.branchService.getBranchById(id);
    return branch;
  }

  @Get()
  @Public()
  async getAllBranches(@Query('page') page = 1, @Query('limit') limit = 10) {
    const branches = await this.branchService.getAllBranches(page, limit);
    return branches;
  }

  @Put(':id/inventory')
  @Permissions(PermissionsEnum.MANAGE_BRANCHES)
  async updateInventory(
    @Param('id') branchId: string,
    @Body() updateInventoryDto: UpdateInventoryDto,
  ) {
    await this.branchService.updateInventory(branchId, updateInventoryDto);
    return { message: Messages.BRANCH_INVENTORY_UPDATED };
  }

  @Delete(':id')
  @Permissions(PermissionsEnum.MANAGE_BRANCHES)
  async deleteBranch(@Param('id') id: string) {
    await this.branchService.deleteBranch(id);
    return { message: Messages.BRANCH_DELETED };
  }
}
