/* eslint-disable jsx-a11y/control-has-associated-label */
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import cn from 'classnames';
import classNames from 'classnames';

const sortFields = [
  { sortField: 'Name', param: 'name' },
  { sortField: 'Sex', param: 'sex' },
  { sortField: 'Born', param: 'born' },
  { sortField: 'Died', param: 'died' },
];

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { slug } = useParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const handleSortChange = (sortField: string) => {
    const params = new URLSearchParams(searchParams);

    if (sort !== sortField) {
      params.set('sort', sortField);
      params.delete('order');
    } else if (!order) {
      params.set('order', 'desc');
    } else {
      params.delete('order');
      params.delete('sort');
    }

    setSearchParams(params);
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortFields.map(({ sortField, param }) => (
            <th key={sortField}>
              <span className="is-flex is-flex-wrap-nowrap">
                {sortField}
                <a onClick={() => handleSortChange(param)}>
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort-down': sort === param && order === 'desc',
                        'fa-sort-up': sort === param && !order,
                        'fa-sort': sort !== param,
                      })}
                    />
                  </span>
                </a>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          return (
            <tr
              key={person.name}
              data-cy="person"
              className={cn({
                'has-background-warning': person.slug === slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.mother ? (
                  <PersonLink person={person.mother} />
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {person.father ? (
                  <PersonLink person={person.father} />
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
