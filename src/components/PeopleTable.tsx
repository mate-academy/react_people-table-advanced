import { useContext } from 'react';
import { StateContext } from '../store';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonLink } from './PersonalLink';

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = () => {
  const { people } = useContext(StateContext);
  const { slug } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const navigation = useNavigate();

  const query = searchParams.get('query')?.toLowerCase() || '';
  const selectedSex = searchParams.get('sex');
  const selectedCentries = searchParams.getAll('centuries');
  const sortField = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  const filteredPeople = people.filter(person => {
    const matchesQuery =
      !query ||
      [person.name, person.motherName, person.fatherName].some(name =>
        name?.toLowerCase().includes(query),
      );

    const matchesSex = selectedSex ? person.sex === selectedSex : true;

    const century = Math.ceil(person.born / 100);
    const matchesCentury =
      selectedCentries.length > 0
        ? selectedCentries.includes(String(century))
        : true;

    return matchesQuery && matchesSex && matchesCentury;
  });

  if (sortField) {
    filteredPeople.sort((a, b) => {
      const aValue = a[sortField as keyof typeof a];
      const bValue = b[sortField as keyof typeof b];

      if (aValue === bValue) {
        return 0;
      }

      const result = aValue > bValue ? 1 : -1;

      return sortOrder === 'desc' ? -result : result;
    });
  }

  const toggleSort = (field: string) => {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    if (currentSort !== field) {
      searchParams.set('sort', field);
      searchParams.delete('order');
    } else if (!currentOrder) {
      searchParams.set('order', 'desc');
    } else {
      searchParams.delete('sort');
      searchParams.delete('order');
    }

    setSearchParams(searchParams);
  };

  const renderSortIcon = (field: string) => {
    if (sortField !== field) {
      return <i className="fas fa-sort" />;
    }

    return sortOrder === 'desc' ? (
      <i className="fas fa-sort-down" />
    ) : (
      <i className="fas fa-sort-up" />
    );
  };

  const handlePersonClick = (slugs: string) => {
    navigation(`/people/${slugs}?${searchParams.toString()}`);
  };

  if (!people.length) {
    return null;
  }

  return filteredPeople.length === 0 ? (
    <p>There are no people matching the current search criteria</p>
  ) : (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['name', 'sex', 'born', 'died'].map(field => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {field.charAt(0).toUpperCase() + field.slice(1)}
                <a onClick={() => toggleSort(field)}>
                  <span className="icon">{renderSortIcon(field)}</span>
                </a>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPeople.map(person => {
          const mother = people.find(per => per.name === person.motherName);
          const father = people.find(per => per.name === person.fatherName);

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': person.slug === slug,
              })}
              onClick={() => handlePersonClick(person.slug)}
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
