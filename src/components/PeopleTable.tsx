import { FC, memo, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getSortedPeople } from '../utils/getSortedPeople';
import { PersonItem } from './PersonItem';
import { SortLink } from './SortLink';

interface Props {
  people: Person[]
}

export const PeopleTable: FC<Props> = memo(({ people }) => {
  const [searchParams] = useSearchParams();
  const { slug: selectedSlug } = useParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const sortedPeoople = useMemo(() => {
    return getSortedPeople(people, sort, order);
  }, [people, sort, order]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SortLink
                parametrValue="name"
                sort={sort}
                order={order}
              />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SortLink
                parametrValue="sex"
                sort={sort}
                order={order}
              />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SortLink
                parametrValue="born"
                sort={sort}
                order={order}
              />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SortLink
                parametrValue="died"
                sort={sort}
                order={order}
              />
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>

        {sortedPeoople.map(person => (
          <PersonItem
            key={person.slug}
            person={person}
            isSelected={selectedSlug === person.slug}
          />
        ))}

      </tbody>
    </table>
  );
});
