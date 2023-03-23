import classNames from 'classnames';
import { FC, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../../types';
import { getFilteredPeople } from '../../../utils/preparePeople';
import { PersonInfo } from '../Person/PersonInfo';
import { TableHead } from './TableHead';

type Props = {
  people: Person[],
};

export const PeopleTable: FC<Props> = ({ people }) => {
  const { slug = '' } = useParams();
  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex') || null;
  const query = searchParams.get('query') || null;
  const centries = searchParams.getAll('centries');
  const order = searchParams.get('order') || null;
  const sortBy = searchParams.get('sort') || null;

  const visiblePeople = useMemo(() => (
    getFilteredPeople(
      people,
      sex,
      query,
      centries,
      order,
      sortBy,
    )
  ), [sex, query, centries, order, sortBy]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <TableHead />

      <tbody>
        {visiblePeople.map(person => {
          const isSelected = slug === person.slug;

          return (
            <tr
              data-cy="person"
              key={person.name}
              className={classNames({
                'has-background-warning': isSelected,
              })}
            >
              <PersonInfo {...person} />
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
