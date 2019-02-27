import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Pathfinder1stSheetEntity, SheetEntity } from './sheet.entity';
import { MongoRepository } from 'typeorm';
import { CreateSheetDto, SheetDto, UpdateSheetDto, ShortSheetDto } from './sheet.dto';
import { ObjectID } from 'mongodb';
import { UsersService } from '../users/users.service';

@Injectable()
export class SheetsService {
    constructor(
        @InjectRepository(Pathfinder1stSheetEntity)
        private readonly pathfinder1stSheetRepository: MongoRepository<Pathfinder1stSheetEntity>,
        private readonly usersService: UsersService,
    ) {}

    async createSheet(createSheetDto: CreateSheetDto, userId: ObjectID) {
        const sheet = new Pathfinder1stSheetEntity(createSheetDto.name, userId);
        const sheetEntity = await this.pathfinder1stSheetRepository.save(sheet);
        return this.sheetEntityToDto(sheetEntity);
    }

    async findSheetById(id: string): Promise<SheetEntity> {
        const sheetEntity = await this.pathfinder1stSheetRepository.findOne({ "_id": new ObjectID(id) } as any);

        if (!sheetEntity) {
            throw new NotFoundException();
        }

        return sheetEntity;
    }

    async findSheetsByUserId(userId: string): Promise<ShortSheetDto[]> {
        let sheetEntities = await this.pathfinder1stSheetRepository.find({ 'ownerId': new ObjectID(userId) });

        if (!sheetEntities || sheetEntities.length === 0) {
            sheetEntities = [];
        }

        return sheetEntities.map(entity => {
            return {
                id: entity.id.toHexString(),
                createdDate: entity.createdDate,
                updatedDate: entity.updatedDate,
                name: entity.name,
                gameType: entity.gameType,
            };
        });
    }

    async updateSheet(sheetEntity: SheetEntity, updateSheetDto: UpdateSheetDto): Promise<boolean> {
        let updated = false;
        if (updateSheetDto.name !== null && updateSheetDto.name !== undefined) {
            sheetEntity.name = updateSheetDto.name;
            updated = true;
        }

        if (updateSheetDto.data) {
            sheetEntity.data = updateSheetDto.data;
            updated = true;
        }

        if (updated) {
            sheetEntity.updatedDate = new Date();
            await this.pathfinder1stSheetRepository.save(sheetEntity);
        }

        return true;
    }

    async sheetEntityToDto(sheetEntity: SheetEntity): Promise<SheetDto> {
        const userEntity = await this.usersService.findOneById(sheetEntity.ownerId.toHexString());
        const userDto = this.usersService.userEntityToDto(userEntity);

        return {
            id: sheetEntity.id.toHexString(),
            owner: userDto,
            createdDate: sheetEntity.createdDate,
            updatedDate: sheetEntity.updatedDate,
            name: sheetEntity.name,
            gameType: sheetEntity.gameType,
            data: sheetEntity.data,
        };
    }
}
