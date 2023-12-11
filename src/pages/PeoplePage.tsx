import * as R from 'react';
import * as RRD from 'react-router-dom';

import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person, PersonSort } from '../types';
import { getPeople } from '../api';

export const PeoplePage: R.FC = () => {
  const [people, setPeople] = R.useState<Person[]>([]);
  const [isLoading, setIsLoading] = R.useState(true);
  const [errMsg, setErrMsg] = R.useState('');

  const [searchParams] = RRD.useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');
  const reverseKoeff = searchParams.get('order') === 'desc' ? -1 : 1;
  const sortField = (searchParams.get('sort') || '') as PersonSort;

  R.useEffect(() => {
    setErrMsg('');

    getPeople()
      .then((peopleFromServer: Person[]) => {
        peopleFromServer.forEach((p: Person, i: number, arr: Person[]) => {
          const person = arr[i];

          person.father = arr.find((perent) => perent.name === p.fatherName);
          person.mother = arr.find((perent) => perent.name === p.motherName);
        });

        setPeople(peopleFromServer);
      })
      .catch(() => setErrMsg('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  let visiblePeople = [...people];

  if (sex) {
    visiblePeople = visiblePeople.filter((p) => p.sex === sex);
  }

  if (centuries.length) {
    visiblePeople = visiblePeople.filter((p) => {
      return centuries.includes(Math.ceil(p.born / 100).toString());
    });
  }

  if (query) {
    const toLowerQuery = query.toLocaleLowerCase();

    visiblePeople = visiblePeople.filter((p) => {
      return `${p.name} ${p.fatherName || ''} ${p.motherName || ''}`
        .toLocaleLowerCase()
        .includes(toLowerQuery);
    });
  }

  switch (sortField) {
    case PersonSort.NAME:
    case PersonSort.SEX:
      visiblePeople = visiblePeople
        .sort((a, b) => (
          reverseKoeff * a[sortField].localeCompare(b[sortField])
        ));
      break;

    case PersonSort.BORN:
    case PersonSort.DIED:
      visiblePeople = visiblePeople
        .sort((a, b) => (
          reverseKoeff * (a[sortField] - b[sortField])
        ));

      break;

    default:
      break;
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {errMsg && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errMsg}
                </p>
              )}

              {!isLoading && !errMsg && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !errMsg && (
                !visiblePeople.length ? (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                ) : (
                  <PeopleTable people={visiblePeople} />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
