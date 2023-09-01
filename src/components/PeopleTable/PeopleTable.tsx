import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { SearchLink } from '../SearchLink';

const ORDER_DESC = 'desc';

type Props = {
  persons: Person[],
  selected: string,
};

export const PeopleTable: React.FC<Props> = ({ persons, selected }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') ?? '';
  const order = searchParams.get('order') ?? '';
  const getPerson = (name: string | null) => {
    const finded = persons.find(people => people.name === name);

    return finded
      ? <PersonLink person={finded} />
      : name;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['Name', 'Sex', 'Born', 'Died'].map(th => (
            <th>
              <SearchLink
                key={th}
                params={{
                  sort: sort === th && order === ORDER_DESC
                    ? null
                    : th,
                  order: sort === th && order !== ORDER_DESC
                    ? ORDER_DESC
                    : null,
                }}
              >
                {th}

                <span className="icon">
                  <i
                    className={classNames(
                      'fas',
                      {
                        'fa-sort': sort !== th,
                        'fa-sort-up': sort === th && order !== ORDER_DESC,
                        'fa-sort-down': sort === th && order === ORDER_DESC,
                      },
                    )}
                  />
                </span>
              </SearchLink>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {persons.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === selected,
            })}
          >
            <td><PersonLink person={person} /></td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{getPerson(person.motherName ?? '-') }</td>
            <td>{getPerson(person.fatherName ?? '-') }</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
