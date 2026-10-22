import { Person } from '.././types';
import { PersonLink } from './PersonLink';
import { useParams, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

interface Props {
  people: Person[];
  allPeople: Person[];
}

export const PeopleTable = ({ people, allPeople }: Props) => {
  const { personSlug } = useParams<{ personSlug?: string }>();
  const [searchParams] = useSearchParams();
  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const renderSortLink = (sort: 'name' | 'sex' | 'born' | 'died') => {
    const isCurrentSort = currentSort === sort;
    let icon = 'fa-sort';

    if (isCurrentSort) {
      icon = currentOrder === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
    }

    const params = isCurrentSort
      ? currentOrder === 'desc'
        ? { sort: null, order: null }
        : { sort, order: 'desc' }
      : { sort, order: null };

    return (
      <SearchLink params={params}>
        <span className="icon">
          <i className={`fas ${icon}`} />
        </span>
      </SearchLink>
    );
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              {renderSortLink('name')}
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              {renderSortLink('sex')}
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              {renderSortLink('born')}
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              {renderSortLink('died')}
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = allPeople.find(p => p.name === person.motherName);
          const father = allPeople.find(p => p.name === person.fatherName);

          return (
            <tr
              data-cy="person"
              className={
                person.slug === personSlug ? 'has-background-warning' : ''
              }
              key={person.slug}
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
