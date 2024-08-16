import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { IdSequence, IdSequenceSchema } from './schema/id-sequence.schema';
import { IdSequenceService } from './id-sequence.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: IdSequence.name, schema: IdSequenceSchema },
    ]),
  ],
  providers: [IdSequenceService],
  exports: [IdSequenceService],
})
export class IdSequenceModule {}
