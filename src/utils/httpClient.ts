export function getData<T>(): Promise<T> {
  return (
    fetch('https://mate-academy.github.io/react_people-table/api/people.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }

        return response.json();
      })
  );
}
