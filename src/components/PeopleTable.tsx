import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

const COLUMNS = [
  { title: 'Name', field: 'name' },
  { title: 'Sex', field: 'sex' },
  { title: 'Born', field: 'born' },
  { title: 'Died', field: 'died' },
];

export const PeopleTable = ({ people }: Props) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const isDesc = searchParams.get('order') === 'desc';

  const getSortParams = (field: string) => {
    if (sort !== field) {
      return { sort: field, order: null };
    }

    if (!isDesc) {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getIconClass = (field: string) => {
    if (sort !== field) {
      return 'fas fa-sort';
    }

    return isDesc ? 'fas fa-sort-down' : 'fas fa-sort-up';
  };

  const renderParent = (parentName?: string | null) => {
    if (!parentName) {
      return '-';
    }

    const parent = people.find(p => p.name === parentName);

    return parent ? <PersonLink person={parent} /> : parentName;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {COLUMNS.map(({ title, field }) => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {title}
                <SearchLink params={getSortParams(field)}>
                  <span className="icon">
                    <i className={getIconClass(field)} />
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
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{renderParent(person.motherName)}</td>
            <td>{renderParent(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
