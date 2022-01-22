import 'reflect-metadata';

const tableDisplayColumnKey = Symbol('column');

interface ColumnOptions {
  visible?: boolean;
  title?: string;
  order?: number;
  Cell?: Function;
}

export function column(options: ColumnOptions) {
  return Reflect.metadata(tableDisplayColumnKey, options);
}

export function getColumnOptions(
  target: any,
  propertyKey: string,
): ColumnOptions {
  return Reflect.getMetadata(tableDisplayColumnKey, target, propertyKey);
}
