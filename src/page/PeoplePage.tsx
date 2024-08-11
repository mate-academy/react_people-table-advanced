import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable1 } from '../components/PeopleTable';
import { getPeople } from '../api';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [peopleFilter, setPeopleFilter] = useState<Person[]>([]);
  const [loading, setLoaging] = useState(false);
  const [erorMesage, setErorMesage] = useState('');

  const { slug } = useParams();

  useEffect(() => {
    setLoaging(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setErorMesage('Something went wrong');
      })
      .finally(() => setLoaging(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && (
              <PeopleFilters
                people={people}
                setPeopleFilter={setPeopleFilter}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {erorMesage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {erorMesage}
                </p>
              )}

              {!people.length && !loading && !erorMesage && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!peopleFilter.length && !loading ? (
                <p>There are no people matching the current search criteria</p>
              ) : (
                <PeopleTable1
                  people={peopleFilter}
                  loading={loading}
                  slug={slug}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
