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

    get mongoCredentials(): {username: string, password: string} {
        return { username: this.envConfig['MONGO_USERNAME'], password: this.envConfig['MONGO_PASSWORD'] };
    }

    private validateInput(envConfig: EnvConfig) {
        const envVarsSchema: Joi.ObjectSchema = Joi.object({
            NODE_ENV: Joi.string().valid(['development', 'production', 'test']).required(),
            PORT: Joi.number().default(3333),
            MONGO_USERNAME: Joi.string().required(),
            MONGO_PASSWORD: Joi.string().required(),
            VERSION: Joi.string().default('dev'),
        });

        const { error, value: validatedEnvConfig } = Joi.validate(envConfig, envVarsSchema);

        if (error) {
            throw new Error(`Error parsing config: ${error.message}`);
        }
        return validatedEnvConfig;
    }
}
