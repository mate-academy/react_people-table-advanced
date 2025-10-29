import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  const [searchParams] = useSearchParams();

  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const nextSortParams = (
    field: 'name' | 'sex' | 'born' | 'died',
  ): { sort: string | null; order: 'desc' | null } => {
    if (currentSort !== field) {
      // first click on this field -> ascending (remove order)
      return { sort: field, order: null };
    }

    if (currentOrder !== 'desc') {
      // currently ascending -> switch to descending
      return { sort: field, order: 'desc' };
    }

    // currently descending -> disable sorting
    return { sort: null, order: null };
  };

  const iconClassFor = (
    field: 'name' | 'sex' | 'born' | 'died',
  ): 'fa-sort' | 'fa-sort-up' | 'fa-sort-down' => {
    if (currentSort !== field) {
      return 'fa-sort';
    }

    return currentOrder === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
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
              <SearchLink
                className="ml-1"
                aria-label="Toggle sort by name"
                params={nextSortParams('name')}
              >
                <span className="icon">
                  <i className={`fas ${iconClassFor('name')}`} />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                className="ml-1"
                aria-label="Toggle sort by sex"
                params={nextSortParams('sex')}
              >
                <span className="icon">
                  <i className={`fas ${iconClassFor('sex')}`} />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                className="ml-1"
                aria-label="Toggle sort by born"
                params={nextSortParams('born')}
              >
                <span className="icon">
                  <i className={`fas ${iconClassFor('born')}`} />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                className="ml-1"
                aria-label="Toggle sort by died"
                params={nextSortParams('died')}
              >
                <span className="icon">
                  <i className={`fas ${iconClassFor('died')}`} />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const isSelected = person.slug === selectedSlug;
          const motherCell = (() => {
            if (!person.motherName) {
              return '-';
            }

            if (person.mother) {
              return <PersonLink person={person.mother} />;
            }

            return person.motherName;
          })();

          const fatherCell = (() => {
            if (!person.fatherName) {
              return '-';
            }

            if (person.father) {
              return <PersonLink person={person.father} />;
            }

            return person.fatherName;
          })();

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={isSelected ? 'has-background-warning' : ''}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>{motherCell}</td>
              <td>{fatherCell}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
