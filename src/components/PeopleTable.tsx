import classNames from 'classnames';
import { memo } from 'react';
import { Person } from '../types';
import PersonLink from './PersonLink';
import { SearchParamKey } from '../types/searchParams';
import { SearchLink } from './SearchLink';

interface Props {
  people: Person[];
  selectedPersonSlug?: string;
  searchParams: URLSearchParams;
}

enum PersonSortBy {
  Name = 'name',
  Sex = 'sex',
  Born = 'born',
  Died = 'died',
}

const PeopleTable = ({ people, selectedPersonSlug, searchParams }: Props) => {
  const nameToPerson = people.reduce(
    (acc, person) => acc.set(person.name, person),
    new Map<string, Person>(),
  );

  const renderParentCell = (parentName: string | null) => {
    if (!parentName) {
      return '-';
    }

    if (!nameToPerson.has(parentName)) {
      return parentName;
    }

    const parent = nameToPerson.get(parentName)!;

    return <PersonLink person={parent} />;
  };

  const tableSortHeads = [...Object.entries(PersonSortBy)];
  const sort = searchParams.get(SearchParamKey.Sort);
  const order = searchParams.get(SearchParamKey.Order);

  const handleSortParamChange = (sortBy: string) => {
    if (sort !== sortBy) {
      return { [SearchParamKey.Sort]: sortBy, [SearchParamKey.Order]: null };
    }

    if (!order) {
      return { [SearchParamKey.Sort]: sortBy, [SearchParamKey.Order]: 'desc' };
    }

    return {
      [SearchParamKey.Sort]: null,
      [SearchParamKey.Order]: null,
    };
  };

  const sortedPeople = people.slice().sort((personA, personB) => {
    const compareFactor = !order ? 1 : -1;

    switch (sort) {
      case PersonSortBy.Name.toString():
        return compareFactor * personA.name.localeCompare(personB.name);
      case PersonSortBy.Sex.toString():
        return compareFactor * personA.sex.localeCompare(personB.sex);
      case PersonSortBy.Born.toString():
        return compareFactor * (personA.born - personB.born);
      case PersonSortBy.Died.toString():
        return compareFactor * (personA.died - personB.died);
      default:
        return 0;
    }
  });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableSortHeads.map(([name, param]) => (
            <th key={name}>
              <span className="is-flex is-flex-wrap-nowrap">
                {name}
                <SearchLink params={handleSortParamChange(param)}>
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort-up': sort === param && !order,
                        'fa-sort-down': sort === param && order,
                        'fa-sort': sort !== param,
                      })}
                    ></i>
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
        {sortedPeople.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames({
              'has-background-warning': person.slug === selectedPersonSlug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{renderParentCell(person.motherName)}</td>
            <td>{renderParentCell(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default memo(PeopleTable);
