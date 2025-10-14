import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { getPeopleWithSearchParams } from '../utils/getPeopleWithSearchParams';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();
  const [searchParams] = useSearchParams();

  const filteredPeople = getPeopleWithSearchParams(people, searchParams);

  function getPersonParent(name: string): Person | null {
    return people.find(person => person.name === name) || null;
  }

  function personSlugIsCorrect(slug: string) {
    return people.some(person => person.slug === slug);
  }

  if (personSlug && !personSlugIsCorrect(personSlug)) {
    return <Navigate to=".." />;
  }

  function getSortParams(sortBy: keyof Person): SearchParams {
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');

    if (sort && order) {
      return { sort: null, order: null };
    }

    if (sort && sort === sortBy) {
      return { sort: sortBy, order: 'desc' };
    }

    return { sort: sortBy, order: null };
  }

  function getArrowsClasses(sortArrow: string) {
    return {
      'fa-sort': searchParams.get('sort') !== sortArrow,
      'fa-sort-up':
        searchParams.get('sort') === sortArrow && !searchParams.get('order'),
      'fa-sort-down':
        searchParams.get('sort') === sortArrow && searchParams.get('order'),
    };
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th className="is-sortable">
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}
            >
              Name
              <SearchLink params={getSortParams('name')}>
                <i className={classNames('fas', getArrowsClasses('name'))} />
              </SearchLink>
            </div>
          </th>
          <th className="is-sortable">
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}
            >
              Sex
              <SearchLink params={getSortParams('sex')}>
                <i className={classNames('fas', getArrowsClasses('sex'))} />
              </SearchLink>
            </div>
          </th>
          <th className="is-sortable">
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}
            >
              Born
              <SearchLink params={getSortParams('born')}>
                <i className={classNames('fas', getArrowsClasses('born'))} />
              </SearchLink>
            </div>
          </th>
          <th className="is-sortable">
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}
            >
              Died
              <SearchLink params={getSortParams('died')}>
                <i className={classNames('fas', getArrowsClasses('died'))} />
              </SearchLink>
            </div>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPeople.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': personSlug === person.slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {(() => {
                if (
                  person.motherName == null ||
                  person.motherName.trim() === ''
                ) {
                  return '-';
                }

                const parent = getPersonParent(person.motherName);

                return parent ? (
                  <PersonLink person={parent} />
                ) : (
                  person.motherName
                );
              })()}
            </td>
            <td>
              {(() => {
                if (
                  person.fatherName == null ||
                  person.fatherName.trim() === ''
                ) {
                  return '-';
                }

                const parent = getPersonParent(person.fatherName);

                return parent ? (
                  <PersonLink person={parent} />
                ) : (
                  person.fatherName
                );
              })()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
