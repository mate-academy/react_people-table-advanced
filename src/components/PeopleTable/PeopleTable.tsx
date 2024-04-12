import { useContext, useEffect } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { TableList } from '../TableList';
import { TableContext } from '../../App';

export const PeopleTable = () => {
  const { people, setPeople } = useContext(TableContext);
  const { isLoading, setIsLoading } = useContext(TableContext);
  const { isError, setIsError } = useContext(TableContext);
  const isPeopleEmpty = !people.length;

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

        {!isLoading && !isError && isPeopleEmpty && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!isLoading && !isError && !isPeopleEmpty && (
          <TableList people={people} />
        )}
      </div>
    </div>
  );
};
