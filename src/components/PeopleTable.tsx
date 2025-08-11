import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const { slug } = useParams<{ slug: string }>();

  function searchParents(parentName: string | null) {
    if (!parentName) {
      return '-';
    }

    const found = people.find(p => p.name === parentName);

    if (found) {
      return <PersonLink person={found} />;
    } else {
      return parentName;
    }
  }

  function handleSortClick(sortName: string): SearchParams {
    const currentParam = searchParams.get('sort');
    const orderParam = searchParams.get('order');

    if (!currentParam) {
      return { sort: sortName };
    }

    if (currentParam && !orderParam) {
      return { sort: sortName, order: 'desc' };
    }

    if (currentParam && orderParam) {
      return { sort: null, order: null };
    }

    return {};
  }

  function setLinkClass(linkName: string) {
    const linkParam = searchParams.get('sort');
    const order = searchParams.get('order');

    if (!linkParam || linkParam !== linkName) {
      return 'fas fa-sort';
    } else if (linkParam === linkName) {
      if (order) {
        return 'fas fa-sort-down';
      } else {
        return 'fas fa-sort-up';
      }
    }
  }

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
              <SearchLink params={handleSortClick('name')}>
                <span className="icon">
                  <i className={setLinkClass('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={handleSortClick('sex')}>
                <span className="icon">
                  <i className={setLinkClass('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={handleSortClick('born')}>
                <span className="icon">
                  <i className={setLinkClass('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={handleSortClick('died')}>
                <span className="icon">
                  <i className={setLinkClass('died')} />
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
          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={slug === person.slug ? 'has-background-warning' : ''}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>{searchParents(person.motherName)}</td>
              <td>{searchParents(person.fatherName)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
