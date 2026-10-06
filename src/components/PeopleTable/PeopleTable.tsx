import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PeopleLink';
import cn from 'classnames';
import { SearchLink } from '../SearchLink';

type Props = {
  people: Person[];
};

function findPerson(name: string | null, people: Person[]) {
  return people.find(person => person.name === name);
}

const sortableColumns = [
  ['name', 'Name'],
  ['sex', 'Sex'],
  ['born', 'Born'],
  ['died', 'Died'],
] as const;

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams<{ slug: string }>();

  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getSortParams = (field: (typeof sortableColumns)[number][0]) => {
    if (sort !== field) {
      return { sort: field, order: null };
    }

    if (order !== 'desc') {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortableColumns.map(([field, title]) => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {title}
                <SearchLink
                  aria-label={`Sort by ${title}`}
                  params={getSortParams(field)}
                >
                  <span className="icon">
                    <i
                      className={cn(
                        'fas',
                        sort === field
                          ? order === 'desc'
                            ? 'fa-sort-down'
                            : 'fa-sort-up'
                          : 'fa-sort',
                      )}
                    />
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
        {people.map(person => {
          const { motherName, fatherName } = person;
          const mother = findPerson(motherName, people);
          const father = findPerson(fatherName, people);

          return (
            <tr
              data-cy="person"
              key={person.slug}
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
                {mother ? <PersonLink person={mother} /> : motherName || '-'}
              </td>
              <td>
                {father ? <PersonLink person={father} /> : fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
