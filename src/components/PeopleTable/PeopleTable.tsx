import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Person, Sort } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { SearchLink } from '../SearchLink/SearchLink';

type Props = {
  people: Person[];
  selectedPerson: Person | undefined;
};

export const PeopleTable: React.FC<Props> = ({ people, selectedPerson }) => {
  const [searchParams] = useSearchParams();
  const getSort = searchParams.get('sort') || '';
  const getOrder = searchParams.get('order') || '';

  const handleSortClick = (sortType: string) => {
    if (!getSort || sortType !== getSort) {
      return { sort: sortType, order: null };
    }

    if (getSort && !getOrder && sortType === getSort) {
      return { sort: sortType, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getClassLink = (sortType: string) => {
    return classNames('fas', {
      'fa-sort': !getSort || getSort !== sortType,
      'fa-sort-up': !getOrder && getSort === sortType,
      'fa-sort-down': getOrder && getSort === sortType,
    });
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
              <SearchLink params={handleSortClick(Sort.name)}>
                <span className="icon">
                  <i className={getClassLink(Sort.name)} />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={handleSortClick(Sort.sex)}>
                <span className="icon">
                  <i className={getClassLink(Sort.sex)} />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={handleSortClick(Sort.born)}>
                <span className="icon">
                  <i className={getClassLink(Sort.born)} />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={handleSortClick(Sort.died)}>
                <span className="icon">
                  <i className={getClassLink(Sort.died)} />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map((person) => {
          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': selectedPerson?.slug === person.slug,
              })}
            >
              <td>
                <PersonLink person={person} search={searchParams} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? (
                  <>
                    {person.mother ? (
                      <PersonLink
                        person={person.mother}
                        search={searchParams}
                      />
                    ) : (
                      person.motherName
                    )}
                  </>
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.fatherName ? (
                  <>
                    {person.father ? (
                      <PersonLink
                        person={person.father}
                        search={searchParams}
                      />
                    ) : (
                      person.fatherName
                    )}
                  </>
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
