import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFetch } from '../../custom-hooks/useFetch';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { PeopleFilters } from '../PeopleFilters/PeopleFilters';
import { API_URL } from '../../constants/apiUrl';
// eslint-disable-next-line max-len
import { filterByCenturies, filterByGender, filterByQuery } from '../../utils/filterFunctions';

export const PeoplePage: FC = () => {
  const { people, isLoading, errorMessage } = useFetch(API_URL);
  const [searchParams] = useSearchParams();
  const gender = searchParams.get('sex') || null;
  const query = searchParams.get('query') || null;
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const getPerent = (parentName: string | null) => {
    if (parentName) {
      return people?.find(person => person.name === parentName);
    }

    return null;
  };

  const peopleWithPerents = people ? people.map((person) => {
    return {
      ...person,
      mother: getPerent(person.motherName),
      father: getPerent(person.fatherName),
    };
  }) : [];

  const visiblePeople = peopleWithPerents.filter(({
    sex,
    name,
    motherName,
    fatherName,
    born,
  }) => {
    const sexFilter = filterByGender(gender, sex);

    const names = [name, motherName, fatherName];
    const queryFilter = filterByQuery(query, names);

    const centuriesFilter = filterByCenturies(centuries, born);

    return sexFilter && queryFilter && centuriesFilter;
  });

  visiblePeople.sort((a, b) => {
    switch (sort) {
      case 'name':
        return order === 'desc'
          ? b.name.localeCompare(a.name)
          : a.name.localeCompare(b.name);

      case 'sex':
        return order === 'desc'
          ? b.sex.localeCompare(a.sex)
          : a.sex.localeCompare(b.sex);

      case 'born':
        return order === 'desc'
          ? b.born - a.born
          : a.born - b.born;

      case 'died':
        return order === 'desc'
          ? b.died - a.died
          : a.died - b.died;

      default:
        return 0;
    }
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && (<Loader />)}

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {people?.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && visiblePeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {visiblePeople.length !== 0 && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
