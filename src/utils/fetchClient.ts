const BASE_URL = 'https://mate-academy.github.io/react_people-table/api/';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

type RequestMethod = 'GET';

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
): Promise<T> {
  const options: RequestInit = { method };

  return wait(300)
    .then(() => fetch(BASE_URL + url, options))
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch data from API');
      }

      return response.json();
    });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
};
