import { Module } from '@nestjs/common';
import { AxiosApadter } from './adapters/axios.adapter';

@Module({
  providers: [AxiosApadter],
  exports: [AxiosApadter],
})
export class CommonModule {}
