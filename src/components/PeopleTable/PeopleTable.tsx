import { useContext, useEffect } from 'react';
import { Loader } from '../Loader';
import { TableList } from '../TableList';
import { TableContext } from '../../store/TableContextProvider';
import { getPeople } from '../../api';

export const PeopleTable = () => {
  const { people, setPeople, isLoading, setIsLoading, isError, setIsError } =
    useContext(TableContext);
  const isPeopleEmpty = !people.length;
  const isDataNotAvailable = !isLoading && !isError && isPeopleEmpty;
  const isDataAvailable = !isLoading && !isError && !isPeopleEmpty;

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, [setPeople, setIsLoading, setIsError]);

  return (
    <div className="container">
      <div className="block">
        {isLoading && <Loader />}

        {isError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {isDataNotAvailable && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {isDataAvailable && <TableList people={people} />}
      </div>
    </div>
  );
};
