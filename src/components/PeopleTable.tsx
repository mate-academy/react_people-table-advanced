import cn from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  sortedPeople: Person[],
  slug: string,
  sort: string | null,
  order: string,
};

export const PeopleTable: React. FC<Props> = ({
  slug, sortedPeople, sort, order,
}) => {
  const isSelected = (person: Person) => person.slug === slug;
  const fieldName = ['Name', 'Sex', 'Born', 'Died'];
  const getSortParams = (field: string) => {
    if (field === sort) {
      if (order === 'asc') {
        return { sort: field, order: 'desc' };
      }

      return { sort: null, order: null };
    }

    return { sort: field, order: 'asc' };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {fieldName.map(field => {
            const lowerCaseField = field.toLowerCase();
            const sameTitle = sort === lowerCaseField;

            return (
              <th key={field}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {field}
                  <SearchLink params={getSortParams(lowerCaseField)}>
                    <span className="icon">
                      <i className={cn(
                        'fas fa-sort',
                        { 'fa-sort': !sameTitle },
                        { 'fa-sort-up': sameTitle && !order },
                        { 'fa-sort-down': sameTitle && order },
                      )}
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
        {sortedPeople.map(person => {
          const mother = sortedPeople
            .find(parent => parent.name === person.motherName);
          const father = sortedPeople
            .find(parent => parent.name === person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={cn(
                { 'has-background-warning': isSelected(person) },
              )}
            >
              <td>
                <PersonLink person={person} slug={person.slug} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? (
                  <PersonLink person={person} slug={mother.slug} />
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <PersonLink person={person} slug={father.slug} />
                ) : (
                  person.motherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
