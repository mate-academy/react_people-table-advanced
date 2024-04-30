import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { Loader } from './Loader';
import { PersonItem } from './PersonItem';
import { TableHead } from './TableHead';

type Props = {
  people: Person[];
  isLoading: boolean;
  hasError: boolean;
};
/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({
  people,
  isLoading,
  hasError,
}) => {
  const [search] = useSearchParams();

  return (
    <>
      {(isLoading && <Loader />) ||
        (hasError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )) ||
        (!people.length && search.size && (
          <p>There are no people matching the current search criteria</p>
        )) ||
        (!people.length ? (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        ) : (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <TableHead />
            <tbody>
              {people.map(person => (
                <PersonItem key={person.slug} person={person} />
              ))}
            </tbody>
          </table>
        ))}
    </>
  );
};
