import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFetch } from '../../custom-hooks/useFetch';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { PeopleFilters } from '../PeopleFilters';
import { API_URL } from '../../constants/apiUrl';

export const PeoplePage: FC = () => {
  const { people, isLoading, errorMessage } = useFetch(API_URL);
  const [searchParams] = useSearchParams();
  const gender = searchParams.get('sex') || null;
  const query = searchParams.get('query') || null;

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
  }) => {
    const sexFilter = !gender
    || (gender === 'm' && sex === 'm')
    || (gender === 'f' && sex === 'f')
    || (gender === null && true);

    const queryFilter = !query
    || [name, motherName, fatherName].some(checkedName => (
      checkedName?.toLowerCase().includes(query.toLowerCase())
    ));

    return sexFilter && queryFilter;
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

              {/* <p>There are no people matching the current search criteria</p> */}

              {people && (<PeopleTable people={visiblePeople} />)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
