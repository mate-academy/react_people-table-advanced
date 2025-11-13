import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';

type Props = {
  filtredPeople: Person[];
};

export const PeopleTable: React.FC<Props> = ({ filtredPeople }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const { slug } = useParams();

  const sortedPeople = [...filtredPeople].sort((a, b) => {
    if (!sort) {
      return 0;
    }

    const aVal = String(a[sort as keyof Person] ?? '');
    const bVal = String(b[sort as keyof Person] ?? '');

    return order === 'desc'
      ? bVal.localeCompare(aVal)
      : aVal.localeCompare(bVal);
  });

  const handleSortClick = (field: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (sort !== field) {
      newParams.set('sort', field);
      newParams.delete('order');
    } else if (!order) {
      newParams.set('order', 'desc');
    } else {
      newParams.delete('sort');
      newParams.delete('order');
    }

    setSearchParams(newParams);
  };

  const getSortIconClass = (field: string) => {
    if (sort !== field) {
      return 'fas fa-sort';
    }

    return order === 'desc' ? 'fas fa-sort-down' : 'fas fa-sort-up';
  };

  const renderSortIcons = (field: string) => (
    <i
      className={classNames(getSortIconClass(field), 'ml-2', 'has-text-info')}
      onClick={() => handleSortClick(field)}
      style={{ cursor: 'pointer', fontSize: '0.8em' }}
      data-cy={`sort-${field}`}
    />
  );

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['name', 'sex', 'born', 'died'].map(field => (
            <th key={field}>
              <span className="is-flex is-align-items-center">
                {field.charAt(0).toUpperCase() + field.slice(1)}
                {renderSortIcons(field)}
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => {
          const mother = sortedPeople.find(p => p.name === person.motherName);
          const father = sortedPeople.find(p => p.name === person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': person.slug === slug,
              })}
            >
              <td>
                <PersonLink person={person} name={person.name} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                <PersonLink person={mother ?? null} name={person.motherName} />
              </td>
              <td>
                <PersonLink person={father ?? null} name={person.fatherName} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
