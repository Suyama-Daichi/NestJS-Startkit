import { HasRoles } from '@/common/decorator/has-role/has-role.decorator';
import { Self } from '@/common/decorator/self/self.decorator';
import { RoleGuard } from '@/common/guard/role.guard';
import { FindUniqueDto } from '@/dto/getUser.request.dto';
import { UpdateUserRequestDto } from '@/dto/updateUser.request.dto';
import { Role } from '@/models/role.enum';
import { JwtAuthGuard } from '@/common/guard/jwt-auth.guard';
import { UserService } from '@/services/user.service';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @HasRoles(Role.USER)
  @Self()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  async getUser(@Param() params: FindUniqueDto) {
    const { id } = params;
    const result = await this.userService.getUser(id);
    if (!result) throw new BadRequestException(`${id} not found`);
    return result;
  }

  @HasRoles(Role.USER)
  @Self()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post(':id')
  async updateUser(
    @Param() params: FindUniqueDto,
    @Body() body: UpdateUserRequestDto,
  ) {
    const { id } = params;
    const result = await this.userService.updateUser(id, body);
    return result;
  }
}
