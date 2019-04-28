import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as fs from 'fs';
import { Environments } from './environment.enum';

export interface EnvConfig {
    [key: string]: string;
}

export class ConfigService {
    private readonly envConfig: EnvConfig;

    constructor(filePath: string) {
        const config = dotenv.parse(fs.readFileSync(filePath));
        this.envConfig = this.validateInput(config);
    }

    get(key: string): string {
        return this.envConfig[key];
    }

    get environment(): Environments {
        const env = this.envConfig['NODE_ENV'];

        if (env === Environments.Development) {
            return Environments.Development;
        } else if (env === Environments.Production) {
            return Environments.Production;
        } else if (env === Environments.Test) {
            return Environments.Test;
        }
    }

    get port(): number {
        return +this.envConfig['PORT'];
    }

    get version(): string {
        return this.envConfig['VERSION'];
    }

    get postgresCredentials(): {username: string, password: string} { // TODO: add the host, port, etc. to .env
        return { username: this.envConfig['POSTGRES_USERNAME'], password: this.envConfig['POSTGRES_PASSWORD'] };
    }

    get jwtSecret(): string {
        return this.envConfig['JWT_SECRET'];
    }

    private validateInput(envConfig: EnvConfig) {
        const envVarsSchema: Joi.ObjectSchema = Joi.object({
            NODE_ENV: Joi.string().valid(['development', 'production', 'test']).required(),
            PORT: Joi.number().default(3333),
            POSTGRES_USERNAME: Joi.string().required(),
            POSTGRES_PASSWORD: Joi.string().required(),
            VERSION: Joi.string().default('dev'),
            JWT_SECRET: Joi.string().required(),
        });

        const { error, value: validatedEnvConfig } = Joi.validate(envConfig, envVarsSchema);

        if (error) {
            throw new Error(`Error parsing config: ${error.message}`);
        }
        return validatedEnvConfig;
    }
}
