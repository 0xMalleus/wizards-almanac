import { plainToClass } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
  validateSync,
} from 'class-validator';

export class EnvironmentVariables {
  /* General ENV */
  @IsDefined()
  @IsNumber()
  @IsPositive()
  readonly QUEUE_CONCURRENCY: number;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  readonly ADMIN_PASSWORD: string;

  /* Database ENV */
  @IsDefined()
  readonly DATABASE_URL: string;
}

export function validateConfig(
  config: Record<string, unknown>,
): EnvironmentVariables {
  const validateConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validateConfig, {
    skipMissingProperties: false,
    stopAtFirstError: true,
    forbidUnknownValues: true,
  });

  if (errors.length > 0) {
    const parsedErrors = errors.flatMap((error) =>
      Object.values(error.constraints ?? {}),
    );
    const beautifiedErrors = parsedErrors.toString().replace(/,/g, '\n * ');
    throw new Error(`ENV validation failed \n * ${beautifiedErrors} \n`);
  }

  return validateConfig;
}
