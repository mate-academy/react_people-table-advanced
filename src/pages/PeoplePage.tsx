import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import React, { useContext } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleContext } from '../store/PeopleContext';

type SortableKeys = 'name' | 'sex' | 'born' | 'died';

export const PeoplePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const sort = searchParams.get('sort') as SortableKeys | null;
  const order = searchParams.get('order') || 'asc';

  const { people, isLoading, errorMessage } = useContext(PeopleContext);
  const { slug } = useParams();

  let visiblePeople = [...people];

  if (query) {
    visiblePeople = visiblePeople.filter(person =>
      [person.name, person.motherName, person.fatherName].some(value =>
        value?.toLowerCase().includes(query.toLowerCase()),
      ),
    );
  }

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (centuries.length > 0) {
    visiblePeople = visiblePeople.filter(person => {
      const bornCentury = Math.ceil(person.born / 100);

      return centuries.includes(String(bornCentury));
    });
  }

  if (sort) {
    visiblePeople.sort((a, b) => {
      if (a[sort] > b[sort]) {
        return order === 'desc' ? -1 : 1;
      }

      if (a[sort] < b[sort]) {
        return order === 'desc' ? 1 : -1;
      }

      return 0;
    });
  }

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              {!isLoading && <PeopleFilters />}
            </div>

            <div className="column">
              <div className="box table-container">
                {isLoading && <Loader />}

                {people.length > 0 ? (
                  <>
                    <PeopleTable
                      people={visiblePeople}
                      selected={slug?.toString() || ''}
                    />
                  </>
                ) : (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

                {!errorMessage && !isLoading && visiblePeople.length === 0 && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
