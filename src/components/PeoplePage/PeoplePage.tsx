import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { getData } from '../../api/fetchData';
import { Loader } from '../Loader';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from '../PeopleFilters';
import { useSearchParams } from 'react-router-dom';
import { Loading } from '../../types/Loading';

export const PeoplePage: React.FC = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [peopleForView, setPeopleForView] = useState<Person[]>([]);

  const [isLoading, setIsLoading] = useState<Loading>(Loading.INIT);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(Loading.LOADING);
    getData()
      .then(response => {
        const handledPeople = response.map(i => {
          return {
            ...i,
            mother: response.find(parent => parent.name === i.motherName),
            father: response.find(parent => parent.name === i.fatherName),
          };
        });

        setPeopleFromServer(handledPeople);
      })
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(Loading.LOADED));
  }, []);

  useEffect(() => {
    let preparedPeople = [...peopleFromServer];

    if (searchParams.has('query')) {
      preparedPeople = preparedPeople.filter(
        person =>
          person.name.includes(searchParams.get('query')) ||
          person.motherName?.includes(searchParams.get('query')) ||
          person.fatherName?.includes(searchParams.get('query')),
      );
    }

    if (searchParams.has('sex')) {
      preparedPeople = preparedPeople.filter(
        item => item.sex === searchParams.get('sex'),
      );
    }

    if (searchParams.has('centuries')) {
      preparedPeople = preparedPeople.filter(item =>
        searchParams
          .getAll('centuries')
          .includes(`${Math.floor(item.born / 100)}`),
      );
    }

    if (searchParams.has('sort')) {
      const fieldForSorting = searchParams.get('sort');
      const order = searchParams.has('order', 'desc') ? -1 : 1;

      preparedPeople.sort((a, b) => {
        return (
          order *
          (typeof a[fieldForSorting] === 'number'
            ? a[fieldForSorting] - b[fieldForSorting]
            : a[fieldForSorting].localeCompare(b[fieldForSorting]))
        );
      });
    }

    setPeopleForView(preparedPeople);
  }, [searchParams, peopleFromServer]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && peopleFromServer.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading === Loading.LOADING && <Loader />}

              {errorMessage && isLoading === Loading.LOADED && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {isLoading === Loading.LOADED &&
                !errorMessage &&
                (peopleFromServer.length === 0 ? (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                ) : (
                  <PeopleTable peoples={peopleForView} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
