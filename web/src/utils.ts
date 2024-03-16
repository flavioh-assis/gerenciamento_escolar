export const keyBelongsToObject = (key: string, object: object) => {
  return object[key as keyof typeof object] !== undefined;
};
