import cn from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { PersonLink } from './PersonLink/PersonLink';
import { Person } from '../types';
import { SearchLink } from './SearchLink';

type PeopleTableProps = {
  people: Person[];
};

const TAB_HEAD = [
  {
    name: 'Name',
    parameter: 'name',
  },
  {
    name: 'Sex',
    parameter: 'sex',
  },
  {
    name: 'Born',
    parameter: 'born',
  },
  {
    name: 'Died',
    parameter: 'died',
  },
];

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  const { slug } = useParams();

  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const getNextSortParams = (field: string) => {
    if (sort !== field) {
      return { sort: field, order: null };
    }

    if (!order) {
      return { sort: field, order: 'desc' };
    }

    if (order === 'desc') {
      return { sort: null, order: null };
    }

    return { sort, order };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {TAB_HEAD.map(column => {
            const isSelected = sort === column.parameter;

            return (
              <th key={column.name}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {column.name}
                  <SearchLink
                    params={getNextSortParams(column.parameter) || {}}
                  >
                    <span className="icon">
                      <i
                        className={`fas ${
                          isSelected
                            ? order === 'desc'
                              ? 'fa-sort-down'
                              : 'fa-sort-up'
                            : 'fa-sort'
                        }`}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
            );
          })}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = people.find(({ name }) => name === person.motherName);
          const father = people.find(({ name }) => name === person.fatherName);

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={cn({
                'has-background-warning': slug === person.slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {mother ? (
                  <PersonLink person={mother} />
                ) : (
                  person.motherName || '-'
                )}
              </td>

              <td>
                {father ? (
                  <PersonLink person={father} />
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
