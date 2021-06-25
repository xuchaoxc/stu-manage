import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClazsController } from '../controllers/clazs.controller';
import { Clazs } from '../entities/clazs.entity';
import { ClazsService } from '../services/clazs.service';

@Module({
  imports: [TypeOrmModule.forFeature([Clazs])],
  controllers: [ClazsController],
  providers: [ClazsService],  
  exports: [ClazsService]

})
export class ClazsModule {}
