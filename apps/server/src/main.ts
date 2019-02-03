import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import * as dotenv from 'dotenv';

let path: string;
switch (process.env.NODE_ENV) {
    case 'development':
        path = `${__dirname}/../../../.env.development`;
        break;
    default:
        path = `${__dirname}/../../../.env`;
}

dotenv.config({ path });

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const options = new DocumentBuilder()
        .setTitle('Character Suite API')
        .setDescription('Not really sure what I\'m doing yet')
        .setVersion('0.0.1')
        .addTag('users')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    await app.listen(3333, () => {
        console.log('Listening at http://localhost:3333');
    });
}

bootstrap();
