import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IdSequence } from './schema/id-sequence.schema';

@Injectable()
export class IdSequenceService {
  constructor(
    @InjectModel(IdSequence.name) private idSequenceModel: Model<IdSequence>,
  ) {}

  async getNextSequenceValue(sequenceName: string): Promise<number> {
    const sequence = await this.idSequenceModel
      .findOneAndUpdate(
        { sequenceName },
        { $inc: { sequenceValue: 1 } },
        { new: true, upsert: true },
      )
      .exec();

    return sequence.sequenceValue;
  }
}
