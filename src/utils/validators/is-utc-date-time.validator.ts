import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsUTCDateTime(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isUTCDateTime',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        validate(value: unknown, args: ValidationArguments): boolean {
          return (
            typeof value === 'string' &&
            /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/.test(value) //ISO 8601 UTC format
          );
        },
        defaultMessage(args: ValidationArguments): string {
          return `${args.property} must be a valid ISO 8601 date-time string in UTC format (ending with 'Z')`;
        },
      },
    });
  };
}
