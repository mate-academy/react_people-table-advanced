import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getPreparedPeople } from '../../utils/filterPeople';
import { PeopleProvider } from '../../store/PeopleContext';
import { PersonItem } from '../PersonItem';

export const PeopleList = () => {
  const { people, errorMessage } = useContext(PeopleProvider);

  const [searchParams] = useSearchParams();
  const sexParam = searchParams.get('sex') ?? '';
  const queryParam = searchParams.get('query') ?? '';
  const centuriesParam = searchParams.getAll('centuries') ?? [];
  const sortBy = searchParams.get('sort') ?? '';
  const orderBy = searchParams.get('order') ?? '';

  const preparedPeople = getPreparedPeople(people, {
    sexParam,
    queryParam,
    centuriesParam,
    sortBy,
    orderBy,
  });

  return (
    <>
      {preparedPeople.length !== 0 ? (
        preparedPeople.map(person => (
          <PersonItem
            people={people}
            key={person.slug}
            person={person}
          />
        ))) : (
        !errorMessage && (
          <tr>
            <th data-cy="noPeopleMessage">
              There are no people on the server
            </th>
          </tr>
        ))}
    </>
  );
};
