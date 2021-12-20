const timer = () => {
  return new Promise(response => {
    setTimeout(() => {
      response(true);
    }, 500);
  });
};

export const getPeople = async () => {
  let data;

  try {
    const response = await fetch('https://mate-academy.github.io/react_people-table/api/people.json');

    data = await response.json();

    await timer();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }

  return data;
};
