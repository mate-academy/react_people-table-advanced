import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';
import { PersonTableRaw } from './PersonTableRaw';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[],
  selectedPersonSlug: string,
  setSelectedPersonSlug: (slug: string) => void,
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedPersonSlug,
  setSelectedPersonSlug,
}) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getSortParams = (field: string): {
    sort: string | null,
    order: string | null,
  } => {
    if (sort !== field) {
      return {
        sort: field,
        order: null,
      };
    }

    if (sort === field && !order) {
      return {
        sort: field,
        order: 'desc',
      };
    }

    return {
      sort: null,
      order: null,
    };
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
              <span className="is-flex is-flex-wrap-nowrap">
                {field[0].toUpperCase() + field.slice(1)}
                <SearchLink params={getSortParams(field)}>
                  <span className="icon">
                    <i
                      className={cn(
                        'fas',
                        { 'fa-sort': sort !== field },
                        { 'fa-sort-up': sort === field && !order },
                        { 'fa-sort-down': sort === field && order === 'desc' },
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
        {people.map(person => (
          <PersonTableRaw
            key={person.slug}
            person={person}
            selectedPersonSlug={selectedPersonSlug}
            setSelectedPersonSlug={setSelectedPersonSlug}
          />
        ))}
      </tbody>
    </table>
  );
};
