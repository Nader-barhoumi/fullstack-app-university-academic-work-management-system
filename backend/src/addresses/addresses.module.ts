import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Addresses} from './entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Addresses])], // No additional modules are imported here
  controllers: [AddressesController],
  providers: [AddressesService],
  exports: [AddressesService], // Exporting AddressesService to be used in other modules
})
export class AddressesModule {}
