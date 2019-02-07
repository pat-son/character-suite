import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Pathfinder1stSheetEntity } from './sheet.entity';
import { MongoRepository } from 'typeorm';
import { CreateSheetDto } from './sheet.dto';
import { ObjectID } from 'mongodb';

@Injectable()
export class SheetsService {
    constructor(
        @InjectRepository(Pathfinder1stSheetEntity)
        private readonly pathfinder1stSheetRepository: MongoRepository<Pathfinder1stSheetEntity>,
    ) {}

    async createSheet(createSheetDto: CreateSheetDto, userId: ObjectID) {
        const sheet = new Pathfinder1stSheetEntity(createSheetDto.name, userId);
        return await this.pathfinder1stSheetRepository.save(sheet);
    }

    async findSheetById(id: string) {
        const sheet = await this.pathfinder1stSheetRepository.findOne({ "_id": new ObjectID(id) } as any);

        if (!sheet) {
            throw new NotFoundException();
        }
        return sheet;
    }
}
