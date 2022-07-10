/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getMetadataStorage, ValidationArguments } from 'class-validator';

export function mockCustomValidator<
  T extends abstract new (...args: unknown[]) => unknown,
>(
  target: T,
  property: keyof InstanceType<T>,
  name: string,
): jest.SpyInstance<boolean, [unknown, ValidationArguments]> {
  const storage = getMetadataStorage();
  const metadatas = storage.getTargetValidationMetadatas(
    target,
    target.name,
    true,
    true,
  );
  const metadata = metadatas.find(a => {
    if (
      a.propertyName === property &&
      storage
        .getTargetValidatorConstraints(a.constraintCls)
        .find(e => e.name === name)
    ) {
      return true;
    }
    return false;
  });
  return jest.spyOn(
    // @ts-ignore
    metadata.constraintCls.prototype,
    'validate',
  ) as jest.SpyInstance<boolean, [unknown, ValidationArguments]>;
}
