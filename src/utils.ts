export function omitFunctionRecursively<T>(input: T, enable: boolean): T {
  if (!enable) {
    return input;
  }

  return removeFunctions(input);
}

function removeFunctions(value: any): any {
  if (typeof value !== 'object' || value === null) {
    return value;
  }

  if (Array.isArray(value)) {
    return value
      .map(removeFunctions)
      .filter((item) => typeof item !== 'function');
  }

  const newObj: any = {};

  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      const cleanedValue = removeFunctions(value[key]);
      if (typeof cleanedValue !== 'function') {
        newObj[key] = cleanedValue;
      }
    }
  }

  return newObj;
}
