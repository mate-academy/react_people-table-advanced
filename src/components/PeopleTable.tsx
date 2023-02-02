import { FC, memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonItem } from './PersonItem';
import { SortLink } from './SortLink';

interface Props {
  people: Person[]
}

export const PeopleTable: FC<Props> = memo(({ people }) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const getSortedPeople = () => {
    const sortedPeoople = [...people];

    switch (sort) {
      case 'name':
        sortedPeoople.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case 'sex':
        sortedPeoople.sort((a, b) => a.sex.localeCompare(b.sex));
        break;

      case 'born':
        sortedPeoople.sort((a, b) => a.born - b.born);
        break;

      case 'died':
        sortedPeoople.sort((a, b) => a.died - b.died);
        break;

      default:
        break;
    }

    return order === 'desc'
      ? sortedPeoople.reverse()
      : sortedPeoople;
  };

  const sortedPeoople = getSortedPeople();

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
              <SortLink parametrValue="name" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SortLink parametrValue="sex" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SortLink parametrValue="born" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SortLink parametrValue="died" />
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>

        {sortedPeoople.map(person => (
          <PersonItem key={person.slug} person={person} />
        ))}

      </tbody>
    </table>
  );
});
