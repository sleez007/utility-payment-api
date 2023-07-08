import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  ApiBadRequestResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Public, GetUser } from 'src/core/decorator';
import { FlwValidateDto, FlwPayDto } from 'src/flutterwave/dto';
import { GenResponse } from 'src/core/types';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly utilityService: ProductsService) {}
  @Public()
  @Get('cron/all')
  @ApiBadRequestResponse({ type: GenResponse })
  cronGetAll() {
    return this.utilityService.getAllUtilitiesFlutterWaveCron();
  }

  @Public()
  @Post('validate/flw')
  @ApiBadRequestResponse({ type: GenResponse })
  validateFlw(@Body() dto: FlwValidateDto) {
    return this.utilityService.validateUtility(dto);
  }

  @Public()
  @Get('all')
  @ApiBadRequestResponse({ type: GenResponse })
  retrieveUtilities() {
    return this.utilityService.retrieveUtilities();
  }

  @Public()
  @Get('/:id')
  getProductById(@Param('id') id: string) {
    return this.utilityService.getProductById(parseInt(id));
  }

  @Public()
  @ApiUnauthorizedResponse({ type: GenResponse })
  @ApiBadRequestResponse({ type: GenResponse })
  @Post('settle/flw')
  settleForUtility(@Body() dto: FlwPayDto, @GetUser() user: User) {
    this.utilityService.payUtilityBill(dto, user);
  }

  //TODO ONLY FOR TESTING, REMOVE ONCE VERIFIED
  @Public()
  @Get('create-va')
  createVirtualAccount() {
    return this.utilityService.createVirtualAccount();
  }
}
