import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { FlwVa, FlwValidate } from './types';
import { FlwPayDto } from './dto';

@Injectable()
export class WaveService {
  constructor(
    private readonly config: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async getUtilityByCategory<T, C>(
    categoryName: string,
    paramValue = 1,
  ): Promise<AxiosResponse<T, C>> {
    const dt: AxiosResponse<T, C> = await this.httpService.axiosRef.get(
      `bill-categories?${categoryName}=${paramValue}`,
    );
    return dt;
  }

  async validateUtility<T, C>(dto: FlwValidate): Promise<AxiosResponse<T, C>> {
    const dt: AxiosResponse<T, C> = await this.httpService.axiosRef.get(
      `bill-items/${dto.item_code}/validate?code=${dto.biller_code}&customer=${dto.customer}`,
    );
    return dt;
  }

  async payForUtility<T, C>(dto: FlwPayDto): Promise<AxiosResponse<T, C>> {
    const dt: AxiosResponse<T, C> = await this.httpService.axiosRef.post(
      'bills',
      dto,
    );
    return dt;
  }

  async createVirtualAccount<T, C>(dto: FlwVa): Promise<any> {
    const dt: AxiosResponse<T, C> = await this.httpService.axiosRef.post(
      'virtual-account-numbers',
      dto,
    );
    return dt.data;
  }
}
