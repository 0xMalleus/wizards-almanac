import { plainToClass } from 'class-transformer';
import {
  ArrayContains,
  IsArray,
  IsDefined,
  IsEnum,
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
  @IsString()
  @IsNotEmpty()
  readonly API_KEY: string;

  @IsDefined()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly SERVER_PORT: number;

  /* Database ENV */
  @IsDefined()
  readonly DATABASE_URL: string;

  /* Queue ENV */
  @IsDefined()
  @IsNumber()
  @IsPositive()
  /**
   * the number of tasks per interval
   */
  readonly QUEUE_INTERVAL: number;

  @IsDefined()
  @IsNumber()
  @IsPositive()
  /**
   * the length of each interval in milliseconds
   */
  readonly QUEUE_INTERVAL_CAP: number;
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
