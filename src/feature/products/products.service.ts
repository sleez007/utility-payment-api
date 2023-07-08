import { ForbiddenException, Injectable } from '@nestjs/common';
import { CategoryProvider, User, UtilityCategory } from '@prisma/client';
import { AxiosResponse } from 'axios';
import { FlwPayDto, FlwValidateDto } from 'src/flutterwave/dto';
import { FlwResponse, FlwVa } from 'src/flutterwave/types';
import { WaveService } from 'src/flutterwave/wave.service';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs';

@Injectable()
export class ProductsService {
  constructor(
    private readonly waveService: WaveService,
    private readonly prisma: PrismaService,
  ) {}
  async getAllUtilitiesFlutterWaveCron() {
    try {
      const categories = await this.prisma.utilityCategory.findMany({
        where: { provider: CategoryProvider.FLUTTERWAVE },
      });
      if (categories.length == 0) {
        throw new ForbiddenException('Please update utility categories');
      }
      console.log(categories.length);
      await this.prisma.utilityProduct.deleteMany();
      categories.forEach(async (category: UtilityCategory) => {
        await this.cronGetProducts(category.id, category.parameter);
      });
      return { message: 'Successfully retrieved' };
    } catch (error) {
      throw error;
    }
  }

  private async cronGetProducts(id: number, param: string) {
    try {
      const data: AxiosResponse<FlwResponse, any> =
        await this.waveService.getUtilityByCategory(param);

      if (data && data.data && data.data.data) {
        //console.log(param, id);
        const products = data.data.data.filter((el) => el.country === 'NG');
        console.log(param, products.length);
        const transformedProduct = products.map((prod) => ({
          categoryId: id,
          billerName: prod.name,
          billerCode: prod.biller_code,
          //defaultCommission: prod.default_commission,
          itemCode: prod.item_code,
          fee: prod.fee,
          amount: prod.amount,
          labelName: prod.label_name,
          country: prod.country,
        }));

        fs.writeFileSync('product.json', JSON.stringify(transformedProduct));
        console.log('hello');
        await this.prisma.utilityProduct.createMany({
          data: transformedProduct,
        });
      }
    } catch (error) {
      //throw error;
      console.log(error);
    }
  }

  async createVirtualAccount() {
    //TODO MODIFY LATER TO BE USED INTERNALLY
    try {
      const data: FlwVa = {
        email: 'dev.sleez@gmail.com',
        firstname: 'Kingsley',
        lastname: 'Etoka',
        is_permanent: true,
        bvn: '22227222502',
        phonenumber: '+2348038070818',
        tx_ref: 'test_info_now',
        narration: 'Test account creation',
      };
      console.log('we here');
      const result = await this.waveService.createVirtualAccount(data);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async retrieveUtilities() {
    try {
      const result = await this.prisma.utilityCategory.findMany({
        include: { products: true },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async payUtilityBill(dto: FlwPayDto, user: User) {
    try {
      // TODO
      // Generate a reference no and send to flutter wave alongside the request
      const result = await this.waveService.payForUtility(dto);
      return result;
      console.log(user, result);
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(productId: number) {
    try {
      const product = await this.prisma.utilityProduct.findUnique({
        where: { id: productId },
      });
      return product;
    } catch (ex) {
      throw ex;
    }
  }

  async validateUtility(dto: FlwValidateDto) {
    try {
      const result = await this.waveService.validateUtility({
        customer: dto.customer,
        biller_code: dto.billerCode,
        item_code: dto.itemCode,
      });
      console.log(result.data);
      return result.data;
    } catch (error) {
      console.log('Wahala dey o!');
      throw error;
    }
  }
}
