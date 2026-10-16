/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

type SortField = 'name' | 'sex' | 'born' | 'died';

export const PeopleTable = ({ people, selectedSlug }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const handleSort = (field: SortField) => {
    const params = new URLSearchParams(searchParams);

    if (currentSort !== field) {
      params.set('sort', field);
      params.delete('order');
    } else if (currentOrder !== 'desc') {
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
  };

  const renderSortIcon = (field: SortField) => {
    if (currentSort !== field) {
      return 'fa-sort';
    }

    return currentOrder === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
  };

  const renderSortHeading = (field: SortField, label: string) => (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {label}
        <a
          href={`#/people?sort=${field}`}
          onClick={event => {
            event.preventDefault();
            handleSort(field);
          }}
          aria-label={`Sort by ${label}`}
        >
          <span className="icon">
            <i className={`fas ${renderSortIcon(field)}`} />
          </span>
        </a>
      </span>
    </th>
  );

  const findPerson = (name: string | null) =>
    name ? people.find(person => person.name === name) : undefined;

  const renderPersonLink = (name: string | null) => {
    if (!name) {
      return '-';
    }

    const person = findPerson(name);

    if (!person) {
      return name;
    }

    return (
      <Link
        to={{
          pathname: `/people/${person.slug}`,
          search: searchParams.toString(),
        }}
        className={person.sex === 'f' ? 'has-text-danger' : ''}
      >
        {person.name}
      </Link>
    );
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {renderSortHeading('name', 'Name')}
          {renderSortHeading('sex', 'Sex')}
          {renderSortHeading('born', 'Born')}
          {renderSortHeading('died', 'Died')}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={
              person.slug === selectedSlug ? 'has-background-warning' : ''
            }
          >
            <td>{renderPersonLink(person.name)}</td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{renderPersonLink(person.motherName)}</td>
            <td>{renderPersonLink(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
