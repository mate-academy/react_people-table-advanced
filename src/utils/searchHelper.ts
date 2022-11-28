export type SearchParams = {
  [key: string]: string | string[] | null,
};

export function getSearchWith(
  currentParams: URLSearchParams,
  paramsToUpdate: SearchParams,
): string {
  const newParams = new URLSearchParams(
    currentParams.toString(),
  );

  //   Object.entries(params).forEach(([key, value]) => {
  //     if (value === null) {
  //       searchParams.delete(key);
  //     } else if (Array.isArray(value)) {
  //       searchParams.delete(key);

  //       value.forEach(part => {
  //         searchParams.append(key, part);
  //       });
  //     } else {
  //       searchParams.set(key, value);
  //     }
  //   });

  //   return searchParams.toString();

  Object.entries(paramsToUpdate)
    .forEach(([key, value]) => {
      if (value === null) {
        newParams.delete(key);
      } else if (Array.isArray(value)) {
        // we delete the key to remove old values
        newParams.delete(key);

        value.forEach(part => {
          newParams.append(key, part);
        });
      } else {
        newParams.set(key, value);
      }
    });

  return newParams.toString();
}
