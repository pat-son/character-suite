import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { ConfigService } from './app/config/config.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService: ConfigService = app.get(ConfigService);

    const options = new DocumentBuilder()
        .setTitle('Character Suite API')
        .setDescription('Not really sure what I\'m doing yet')
        .setVersion(configService.version)
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    const port = configService.port;

    await app.listen(port, () => {
        console.log(`Listening at http://localhost:${port}`);
    });
}

bootstrap();
