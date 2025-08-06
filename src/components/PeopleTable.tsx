import { SearchLink } from './SearchLink';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const PeopleTable = ({ people, sort, order }) => {
  const getSortIcon = field => {
    if (sort !== field) {
      return <i className="fas fa-sort" />;
    }

    return order === 'asc' ? (
      <ChevronUp size={16} />
    ) : (
      <ChevronDown size={16} />
    );
  };

  const getSortParams = field => {
    if (sort === field) {
      if (order === 'asc') {
        return { sort: field, order: 'desc' };
      } else {
        return { sort: null, order: null };
      }
    } else {
      return { sort: field, order: 'asc' };
    }
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['name', 'sex', 'born', 'died'].map(field => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap items-center">
                {field.charAt(0).toUpperCase() + field.slice(1)}
                <SearchLink params={getSortParams(field)} className="icon ml-1">
                  {getSortIcon(field)}
                </SearchLink>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people.length > 0 ? (
          people.map((person, index) => (
            <tr key={index} data-cy="person">
              <td>
                <a
                  href={`#/people/${person.name.toLowerCase().replace(/\s/g, '-')}-${person.born}`}
                >
                  {person.name}
                </a>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>{person.mother || '-'}</td>
              <td>{person.father || '-'}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="has-text-centered">
              No people found matching the current search criteria.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
