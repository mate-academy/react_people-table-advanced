/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable prettier/prettier */
import { Link, useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { useMemo } from 'react';
import { Person } from '../types';
import { SortType } from '../types/SortType';
import { SearchLink } from './SearchLink';

export const Table = ({ people }: { people: Person[] }) => {
  const param = useParams();
  const [searchParams] = useSearchParams();
  const activeSort = searchParams.get('sort');
  const activeOrder = searchParams.get('order');
  const activeSex = searchParams.get('sex');
  const activeCenturies = searchParams.getAll('centuries');
  const activeQuery = searchParams.get('query');

  const PersonLink = ({ slug, sex, name }: Record<string, string>) => {
    return (
      <Link
        to={{ pathname: `/people/${slug}`, search: searchParams.toString() }}
        className={cn({ 'has-text-danger': sex === 'f' })}
      >
        {name}
      </Link>
    );
  };

  const computedPeople = useMemo(
    () =>
      people.map(el => {
        const mother = people.find(person => person.name === el.motherName);
        const father = people.find(person => person.name === el.fatherName);

        return { ...el, mother, father };
      }),
    [people],
  );

  const sortedPeople = useMemo(() => {
    const tempPeople = [...computedPeople];

    switch (activeSort) {

      case SortType.NAME:
        tempPeople.sort((prev, next) => prev.name.localeCompare(next.name));
        break;

      case SortType.BORN:
        tempPeople.sort((prev, next) => prev.born - next.born);
        break;

      case SortType.DIED:
        tempPeople.sort((prev, next) => prev.died - next.died);
        break;

      case SortType.SEX:
        tempPeople.sort((prev, next) => prev.sex.localeCompare(next.sex));
        break;

      default:
        return tempPeople;
    }

    if (activeOrder === 'desc') {
      tempPeople.reverse();
    }

    return tempPeople;
  }, [computedPeople, activeSort, activeOrder]);

  const filteredPeople = sortedPeople.filter(person => {
    if (activeSex && person.sex !== activeSex) {
      return false;
    }

    if (
      activeCenturies.length > 0 && !activeCenturies.includes(`${Math.floor(person.born / 100) + 1}`)
    ) {
      return false;
    }

    if (
      activeQuery
        && !person.name.toLowerCase().includes(activeQuery.toLowerCase())
        && !person.motherName
          ?.toLocaleLowerCase()
          .includes(activeQuery.toLowerCase())
        && !person.fatherName
          ?.toLocaleLowerCase()
          .includes(activeQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });


  const toggleOrder = (sortType: SortType) => {
    if (activeSort === sortType) {
      return activeOrder ? null : 'desc';
    }

    return null;
  };

  const toggleSort = (sortType: SortType) => {
    if (activeSort === sortType && activeOrder) {
      return null;
    }

    return sortType;
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
                params={{
                  sort: toggleSort(SortType.NAME),
                  order: toggleOrder(SortType.NAME),
                }}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': activeSort !== SortType.NAME,
                      'fa-sort-up':
                        activeSort === SortType.NAME && !activeOrder,
                      'fa-sort-down':
                        activeSort === SortType.NAME && activeOrder,
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
                params={{
                  sort: toggleSort(SortType.SEX),
                  order: toggleOrder(SortType.SEX),
                }}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': activeSort !== SortType.SEX,
                      'fa-sort-up': activeSort === SortType.SEX && !activeOrder,
                      'fa-sort-down':
                        activeSort === SortType.SEX && activeOrder,
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
                params={{
                  sort: toggleSort(SortType.BORN),
                  order: toggleOrder(SortType.BORN),
                }}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': activeSort !== SortType.BORN,
                      'fa-sort-up':
                        activeSort === SortType.BORN && !activeOrder,
                      'fa-sort-down':
                        activeSort === SortType.BORN && activeOrder,
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
                params={{
                  sort: toggleSort(SortType.DIED),
                  order: toggleOrder(SortType.DIED),
                }}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': activeSort !== SortType.DIED,
                      'fa-sort-up':
                        activeSort === SortType.DIED && !activeOrder,
                      'fa-sort-down':
                        activeSort === SortType.DIED && activeOrder,
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
        {filteredPeople.map(
          ({
            name,
            sex,
            born,
            died,
            mother,
            motherName,
            father,
            fatherName,
            slug,
          }) => {
            return (
              <tr
                data-cy="person"
                key={name}
                className={cn({
                  'has-background-warning': slug === param.slug,
                })}
              >
                <td>
                  <PersonLink slug={slug} sex={sex} name={name} />
                </td>

                <td>{sex}</td>
                <td>{born}</td>
                <td>{died}</td>
                <td>
                  {mother ? (
                    <PersonLink
                      slug={mother.slug}
                      sex={mother.sex}
                      name={mother.name}
                    />
                  ) : (
                    motherName || '-'
                  )}
                </td>
                <td>
                  {father ? (
                    <PersonLink
                      slug={father.slug}
                      sex={father.sex}
                      name={father.name}
                    />
                  ) : (
                    fatherName || '-'
                  )}
                </td>
              </tr>
            );
          },
        )}
      </tbody>
    </table>
  );
};
