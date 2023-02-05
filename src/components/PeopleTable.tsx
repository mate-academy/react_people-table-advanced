import classNames from 'classnames';
import { FC } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  listOfPeople: Person[];
};

export const PeopleTable: FC<Props> = ({ listOfPeople }) => {
  const { selectedSlug = '' } = useParams();
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  const list = listOfPeople.map(person => {
    const mother = listOfPeople.find(m => m.name === person.motherName);
    const father = listOfPeople.find(f => f.name === person.fatherName);

    return {
      ...person,
      mother,
      father,
    };
  });

  let copyList = [...list];

  const sortOptions = (sortlist: Person[]) => {
    sortlist.sort((a, b) => {
      let personA = a;
      let personB = b;

      if (order === 'desc') {
        [personA, personB] = [personB, personA];
      }

      switch (sort) {
        case 'name':
        case 'sex':
          return personA[sort].localeCompare(personB[sort]);
        case 'born':
        case 'died':
          return personA[sort] - personB[sort];
        default:
          return 0;
      }
    });
  };

  const filterListByPeopleFilters = () => {
    if (centuries.length) {
      copyList = copyList.filter(person => (
        centuries.includes((Math.floor(person.born / 100) + 1).toString())
      ));
    }

    if (sex) {
      copyList = copyList.filter(person => (person.sex === sex));
    }

    if (query) {
      copyList = copyList.filter(person => (
        person.name.toLowerCase().includes(query.toLowerCase())
        || person.motherName?.toLowerCase().includes(query.toLowerCase())
        || person.fatherName?.toLowerCase().includes(query.toLowerCase())
      ));
    }
  };

  filterListByPeopleFilters();

  sortOptions(copyList);

  const linkParams = (availableSort: string) => {
    if (availableSort === sort && order === 'desc') {
      return { sort: null, order: null };
    }

    if (availableSort === sort) {
      return { sort: availableSort, order: 'desc' };
    }

    return { sort: availableSort, order: null };
  };

  return (
    <>
      {copyList.length
        ? (
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
                      params={linkParams('name')}
                    >
                      <span className="icon">
                        <i
                          className={classNames('fas fa-sort', {
                            'fa-sort-up': sort === 'name' && order !== 'desc',
                            'fa-sort-down': order === 'desc' && sort === 'name',
                          })}
                        />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Sex
                    <SearchLink
                      params={linkParams('sex')}
                    >
                      <span className="icon">
                        <i
                          className={classNames('fas fa-sort', {
                            'fa-sort-up': sort === 'sex' && order !== 'desc',
                            'fa-sort-down': order === 'desc' && sort === 'sex',
                          })}
                        />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Born
                    <SearchLink
                      params={linkParams('born')}
                    >
                      <span className="icon">
                        <i
                          className={classNames('fas fa-sort', {
                            'fa-sort-up': sort === 'born' && order !== 'desc',
                            'fa-sort-down': order === 'desc' && sort === 'born',
                          })}
                        />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Died
                    <SearchLink
                      params={linkParams('died')}
                    >
                      <span className="icon">
                        <i
                          className={classNames('fas fa-sort', {
                            'fa-sort-up': sort === 'died' && order !== 'desc',
                            'fa-sort-down': order === 'desc' && sort === 'died',
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
              {copyList.map(human => (

                <tr
                  data-cy="person"
                  key={human.slug}
                  className={classNames(
                    {
                      'has-background-warning': human.slug === selectedSlug,
                    },
                  )}
                >
                  <td>
                    <PersonLink
                      slug={human.slug}
                      name={human.name}
                      sex={human.sex}
                    />
                  </td>
                  <td>{human.sex}</td>
                  <td>{human.born}</td>
                  <td>{human.died}</td>
                  <td>
                    {human.mother ? (
                      <PersonLink
                        slug={human.mother.slug}
                        name={human.mother.name}
                        sex={human.mother.sex}
                      />
                    ) : (
                      human.motherName || '-'
                    )}
                  </td>
                  <td>
                    {human.father ? (
                      <PersonLink
                        slug={human.father.slug}
                        name={human.father.name}
                        sex={human.father.sex}
                      />
                    ) : (
                      human.fatherName || '-'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>There are no people matching the current search criteria</p>
        )}
    </>
  );
};
