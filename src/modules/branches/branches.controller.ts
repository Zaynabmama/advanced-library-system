import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { BranchService } from './branches.service';
import { DistributeBookDto } from './dtos/update-inventory.dto';
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

  @Patch(':id/distribute-books')
  @Permissions(PermissionsEnum.MANAGE_BRANCHES)
  async distributeBooks(
    @Param('id') branchId: string,
    @Body() distributeBookDto: DistributeBookDto,
  ) {
    await this.branchService.distributeBooks(branchId, distributeBookDto);
    return { message: 'Books distributed successfully' };
  }

  @Delete(':id')
  @Permissions(PermissionsEnum.MANAGE_BRANCHES)
  async deleteBranch(@Param('id') id: string) {
    await this.branchService.deleteBranch(id);
    return { message: Messages.BRANCH_DELETED };
  }
}
