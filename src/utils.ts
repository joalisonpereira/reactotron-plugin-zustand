export function omitFunctionRecursively<T>(input: T, enable: boolean): T {
  if (!enable) {
    return input;
  }

  const inputWithoutFunctions = removeFn(input);

  return removeNulls(inputWithoutFunctions);
}

function removeNulls(value: any): any {
  if (typeof value !== 'object' || value === null) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(removeNulls).filter((item) => item !== null);
  }

  const newObj: any = {};

  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      const cleanedValue = removeNulls(value[key]);
      if (cleanedValue !== null) {
        newObj[key] = cleanedValue;
      }
    }
  }

  return newObj;
}

function removeFn(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}
