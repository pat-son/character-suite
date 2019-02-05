import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
    providers: [
        {
            provide: ConfigService,
            useFactory: () => {
                let path: string;
                switch (process.env.NODE_ENV) {
                    case 'development':
                        path = `${__dirname}/../../../.env.development`;
                        break;
                    default:
                        path = `${__dirname}/../../../.env`;
                }
                return new ConfigService(path);
            }
        }
    ],
    exports: [ConfigService],
})
export class ConfigModule {}
