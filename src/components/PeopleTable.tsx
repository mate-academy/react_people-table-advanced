import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from '../types/PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

function getVisiblePeople(
  people: Person[],
  sex: string,
  query: string,
  centuries: string[],
  sort: string,
  order: string,
) {
  let copyPeople = [...people];

  if (sex) {
    copyPeople = copyPeople.filter(person => person.sex === sex);
  }

  if (query) {
    copyPeople = copyPeople.filter(
      person =>
        person.name.toLowerCase().includes(query) ||
        person.motherName?.toLowerCase().includes(query) ||
        person.fatherName?.toLowerCase().includes(query),
    );
  }

  if (centuries.length !== 0) {
    copyPeople = copyPeople.filter(person =>
      centuries.includes(`${person.born + 100}`.slice(0, 2)),
    );
  }

  if (sort) {
    switch (sort) {
      case 'name':
      case 'sex':
        copyPeople.sort((el1, el2) => el1[sort].localeCompare(el2[sort]));
        break;
      case 'born':
      case 'died':
        copyPeople.sort((el1, el2) => el1[sort] - el2[sort]);
        break;
    }
  }

  if (order === 'desc') {
    return copyPeople.reverse();
  }

  return copyPeople;
}

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slugId } = useParams();

  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const findPersonByName = (name: string) => {
    return people.find(person => person.name === name);
  };

  const peopleWithParents = people.map(person => {
    const mother = person.motherName
      ? findPersonByName(person.motherName)
      : undefined;
    const father = person.fatherName
      ? findPersonByName(person.fatherName)
      : undefined;

    return { ...person, mother, father };
  });

  function sortClick(sortField: string) {
    if (!order && !sort) {
      return { sort: sortField, order: null };
    }

    if (sort && !order) {
      return { sort: sortField, order: 'desc' };
    }

    return { sort: null, order: null };
  }

  const visiblePeople = getVisiblePeople(
    peopleWithParents,
    sex,
    query,
    centuries,
    sort,
    order,
  );

  return (
    <>
      {visiblePeople.length !== 0 ? (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Name
                  <SearchLink params={sortClick('name')}>
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': sort !== 'name',
                          'fa-sort-up': sort === 'name' && !order,
                          'fa-sort-down': sort === 'name' && order === 'desc',
                        })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <SearchLink params={sortClick('sex')}>
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': sort !== 'sex',
                          'fa-sort-up': sort === 'sex' && !order,
                          'fa-sort-down': sort === 'sex' && order === 'desc',
                        })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <SearchLink params={sortClick('born')}>
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': sort !== 'born',
                          'fa-sort-up': sort === 'born' && !order,
                          'fa-sort-down': sort === 'born' && order === 'desc',
                        })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <SearchLink params={sortClick('died')}>
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': sort !== 'died',
                          'fa-sort-up': sort === 'died' && !order,
                          'fa-sort-down': sort === 'died' && order === 'desc',
                        })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>
          <tbody>
            {visiblePeople.map(person => {
              return (
                <tr
                  data-cy="person"
                  key={person.slug}
                  className={classNames({
                    'has-background-warning': slugId === person.slug,
                  })}
                >
                  <td>
                    <PersonLink person={person} />
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>
                    {person.mother ? (
                      <PersonLink person={person.mother} />
                    ) : person.motherName ? (
                      person.motherName
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>
                    {person.father ? (
                      <PersonLink person={person.father} />
                    ) : person.fatherName ? (
                      person.fatherName
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>There are no people matching the current search criteria</p>
      )}
    </>
  );
};
