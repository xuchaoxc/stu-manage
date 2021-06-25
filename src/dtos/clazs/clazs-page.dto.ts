import { PageMetaDto } from 'src/common/dtos';

import { ListAllClazsDto } from './listall-clazs.dto';

export class ClassesPageDto {

  readonly data: ListAllClazsDto[];
  readonly meta: PageMetaDto;
  readonly skip: number;

  constructor(data: ListAllClazsDto[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
