import { useState } from 'react';

export const useArray = <T>(initialArray: T[]) => {
  const [array, setArray] = useState<T[]>(initialArray);

  const updateObjectProperty = (
    index: number,
    property: string,
    value: T[keyof T]
  ) => {
    setArray((prevArray) => {
      return prevArray.map((item, i) => {
        if (i !== index) {
          return item;
        }
        if (item instanceof Object && item.constructor !== Object) {
          // If item is an instance of a class
          const updatedItem = Object.create(Object.getPrototypeOf(item));
          return Object.assign(updatedItem, item, { [property]: value });
        }
        return {
          ...item,
          [property]: value,
        };
      });
    });
  };

  const deleteObject = (index: number) => {
    setArray((prevArray) => {
      return prevArray.filter((_item, i) => index !== i);
    });
  };

  const addObject = (item: T) => {
    setArray((prevArray) => {
      return [...prevArray, item];
    });
  };

  return [
    array,
    setArray,
    updateObjectProperty,
    addObject,
    deleteObject,
  ] as const;
};
