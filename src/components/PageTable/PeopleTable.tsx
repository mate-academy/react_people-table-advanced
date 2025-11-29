import { FC } from 'react';
import { Person } from '../../types';
import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonLink } from '../PersonLink';
import { SearchLink } from '../SearchLink';

interface Props {
  people: Person[];
}

interface TableRow {
  title: string;
  value: keyof Person;
}

const tableSortRows: TableRow[] = [
  {
    title: 'Name',
    value: 'name',
  },
  {
    title: 'Sex',
    value: 'sex',
  },
  {
    title: 'Born',
    value: 'born',
  },
  {
    title: 'Died',
    value: 'died',
  },
];

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: FC<Props> = ({ people }) => {
  const { slug: personSlug } = useParams();
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const handleChangeSortQuery = (newSort: string) => {
    if (sort !== newSort) {
      return { sort: newSort, order: null };
    }

    if (sort && !order) {
      return { sort, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableSortRows.map(headRow => (
            <th key={headRow.title}>
              <span className="is-flex is-flex-wrap-nowrap">
                {headRow.title}
                <SearchLink params={handleChangeSortQuery(headRow.value)}>
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort': sort !== headRow.value,
                        'fa-sort-up': sort === headRow.value && !order,
                        'fa-sort-down': sort === headRow.value && order,
                      })}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const {
            slug,
            sex,
            born,
            died,
            mother,
            father,
            motherName,
            fatherName,
          } = person;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({
                'has-background-warning': personSlug === slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother ? (
                  <PersonLink person={mother} />
                ) : motherName ? (
                  motherName
                ) : (
                  '-'
                )}
              </td>
              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : fatherName ? (
                  fatherName
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
