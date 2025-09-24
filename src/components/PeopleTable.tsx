import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { useMemo } from 'react';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[] | undefined;
};

enum SortParam {
  Born = 'born',
  Died = 'died',
  Name = 'name',
  Sex = 'sex',
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personId } = useParams();
  const [searchParams] = useSearchParams();
  const parameter = searchParams.get('sort');
  const isOrder = searchParams.has('order');

  const setIcon = (param: string) => {
    const sameParam = parameter === param;

    return sameParam
      ? isOrder
        ? 'fas fa-sort-down'
        : 'fas fa-sort-up'
      : 'fas fa-sort';
  };

  const sortedPeople = useMemo(() => {
    return (people || [])?.sort((a, b) => {
      switch (parameter) {
        case 'name':
          return isOrder
            ? b.name.localeCompare(a.name)
            : a.name.localeCompare(b.name);
        case 'born':
          return isOrder ? b.born - a.born : a.born - b.born;
        case 'died':
          return isOrder ? b.died - a.died : a.died - b.died;
        case 'sex':
          return isOrder
            ? b.sex.localeCompare(a.sex)
            : a.sex.localeCompare(b.sex);
        default:
          return 0;
      }
    });
  }, [people, isOrder, parameter]);
  const handleParam = (param: string) => {
    const isSame = parameter === param;

    return {
      sort: isSame ? (isOrder ? null : param) : param,
      order: isSame ? (isOrder ? null : 'desc') : null,
    };
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
              <SearchLink params={handleParam(SortParam.Name)}>
                <span className="icon">
                  <i className={setIcon(SortParam.Name)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={handleParam(SortParam.Sex)}>
                <span className="icon">
                  <i className={setIcon(SortParam.Sex)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={handleParam(SortParam.Born)}>
                <span className="icon">
                  <i className={setIcon(SortParam.Born)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={handleParam(SortParam.Died)}>
                <span className="icon">
                  <i className={setIcon(SortParam.Died)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople?.map(person => {
          const foundMom = sortedPeople.find(
            data => data.name === person.motherName,
          );
          const foundDad = sortedPeople.find(
            data => data.name === person.fatherName,
          );

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={
                personId === person.slug ? 'has-background-warning' : ''
              }
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {foundMom ? (
                  <PersonLink person={foundMom} />
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {foundDad ? (
                  <PersonLink person={foundDad} />
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
