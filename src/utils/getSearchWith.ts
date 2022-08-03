type Params = {
  [key: string]: string,
};

function getSearchWith(params: Params, searchParams: URLSearchParams): string {
  const copy = new URLSearchParams(searchParams.toString());
  const paramsKeys = Object.keys(params);

  for (let i = 0; i < paramsKeys.length; i += 1) {
    const key = paramsKeys[i];

    if (params[key]) {
      copy.set(key, params[key]);
    } else {
      copy.delete(key);
    }
  }

  return copy.toString();
}

export default getSearchWith;
