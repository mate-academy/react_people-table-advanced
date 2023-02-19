import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { PeopleInfo } from '../PeopleInfo/PeopleInfo';
import { Person } from '../../types';
import { SortLink } from '../PeopleInfo/SortLink';
import { getVisiblePeople } from '../../utils/visiblePeople';

interface Props {
  people: Person[] | [],
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams<{ slug: string }>();

  const visiblePeople = getVisiblePeople(people);

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
              <SortLink field="name" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SortLink field="sex" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SortLink field="born" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SortLink field="died" />
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning':
                person.slug === slug,
            })}
          >
            <PeopleInfo
              person={person}
            />
          </tr>
        ))}
      </tbody>
    </table>
  );
};
