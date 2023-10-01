function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function request<T>(url: string): Promise<T> {
  return wait(300)
    .then(() => fetch(url))
    .then(response => response.json());
}

export const client = {
  get: <T>(url: string) => request<T>(url),
};
