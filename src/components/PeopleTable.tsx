import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

import { TableHeader } from './TableHeader';

import { ErrorNotification } from './ErrorNotification';
import { Loader } from './Loader';
import { TableItem } from './TableItem';
import { NOT_PEOPLE_MESSAGE } from '../constants';
import { getFilters } from '../utils/getFilters';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  dataPeople: Person[];
  errorMessage: string;
  isLoading: boolean;
};

export const PeopleTable: React.FC<Props> = ({
  dataPeople,
  errorMessage,
  isLoading,
}) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const { filterByQuery } = getFilters(searchParams);

  if (isLoading) {
    return <Loader />;
  }

  if (errorMessage) {
    return <ErrorNotification error={errorMessage} />;
  }

  if (!dataPeople.length && !filterByQuery) {
    return <p data-cy="noPeopleMessage">{NOT_PEOPLE_MESSAGE}</p>;
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      {dataPeople.length !== 0 && <TableHeader />}

      <tbody>
        {dataPeople.length !== 0 ? (
          dataPeople.map(item => (
            <TableItem key={item.slug} person={item} slug={slug} />
          ))
        ) : (
          <p>There are no people matching the current search criteria</p>
        )}
      </tbody>
    </table>
  );
};
