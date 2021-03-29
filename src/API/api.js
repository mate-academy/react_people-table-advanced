import axios from 'axios';

const BASE_URL
  = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = async() => {
  try {
    const response = await axios.get(BASE_URL);
    const { data } = response;

    return data;
  } catch (error) {
    throw new Error(error);
  }
};
