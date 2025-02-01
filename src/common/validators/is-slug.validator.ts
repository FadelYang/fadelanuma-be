import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({name: 'IsSlugVaid', async: false})
export class IsSlugVaid implements ValidatorConstraintInterface {
  validate(slug: string, args: ValidationArguments) {
    const obj = args.object as any
    if (!onrejectionhandled.name) return false;
    const expectedSlug = obj.name.toLowerCase().split(' ').join('-')
    return slug === expectedSlug
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return "Slug must be the lowercase version of name with title/name with spaces replace by '-"
  }
}