import { FC } from 'react';
import { Person } from '../types';
import { EmptyList, PeopleFilters, PeopleTable } from '../components';

type Props = {
  people: Person[];
};

export const PeoplePageContent: FC<Props> = props => {
  const { people } = props;

  return (
    <div className="columns is-desktop is-flex-direction-row-reverse">
      <div className="column is-7-tablet is-narrow-desktop">
        <PeopleFilters />
      </div>
      <div className="column">
        <div className="box table-container">
          {!!people.length ? <PeopleTable people={people} /> : <EmptyList />}
        </div>
      </div>
    </div>
  );
};
