import cn from 'classnames';

import { useParams } from 'react-router-dom';

import { PersonLink } from './PersonLink';
import { SortLink } from './SortLink';
import { ColumnsFilter } from '../types/enums';

import { Person } from '../types';

type Props = {
  visiblePeople: Person[];
};

export const PeopleTable: React.FC<Props> = ({ visiblePeople }) => {
  const { path } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(ColumnsFilter).map(name => (
            <th key={name}>
              <span className="is-flex is-flex-wrap-nowrap">
                {name[0].toUpperCase() + name.slice(1)}
                <SortLink field={name} />
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(person => {
          const {
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug,
            mother,
            father,
          } = person;

          const noParents = '-';
          const isClickedPerson = path === slug;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={cn({
                'has-background-warning': isClickedPerson,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother && <PersonLink person={mother} />}
                {!mother && (motherName || noParents)}
              </td>
              <td>
                {father && <PersonLink person={father} />}
                {!father && (fatherName || noParents)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
