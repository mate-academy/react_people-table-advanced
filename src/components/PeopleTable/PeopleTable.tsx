import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';
import { getSearchWith } from '../../utils/searchHelper';
import { PersonInfo } from '../PersonInfo';

interface Props {
  people: Person[];
  selectedPersonSlug: string;
}

enum SortType {
  Name = 'name',
  Sex = 'sex',
  Born = 'born',
  Died = 'died',
}

const compareStrings = (firstString: string, secondString: string) => {
  return firstString.localeCompare(secondString);
};

const compareNumbers = (firstNumber: number, secondNumber: number) => {
  return firstNumber - secondNumber;
};

const getSortedPeople = (
  people: Person[],
  sortType: SortType | null,
  isReversed: boolean,
) => {
  let sortedPeople = [...people];

  sortedPeople.sort((currentPerson, nextPerson) => {
    switch (sortType) {
      case SortType.Name:
      case SortType.Sex:
        return compareStrings(currentPerson[sortType], nextPerson[sortType]);

      case SortType.Born:
      case SortType.Died:
        return compareNumbers(currentPerson[sortType], nextPerson[sortType]);

      default: return 0;
    }
  });

  if (isReversed) {
    sortedPeople = sortedPeople.reverse();
  }

  return sortedPeople;
};

export const PeopleTable:React.FC<Props> = ({ people, selectedPersonSlug }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort' || '');
  const order = searchParams.get('order' || '');

  const sortedPeople = getSortedPeople(people, sort as SortType, !!order);

  return (
    <table
      data-cy="peopleTable"
      // eslint-disable-next-line max-len
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >

      <thead>
        <tr>
          {Object.values(SortType).map(sortType => {
            const formattedSortType = sortType[0].toUpperCase()
              + sortType.slice(1);

            let searchParamValues = {};

            const isSortedByCurrentType = sort === sortType;
            const isDescOrdered = order === 'desc';

            const isFirstClick = !isSortedByCurrentType && !isDescOrdered;
            const isSecondClick = isSortedByCurrentType && !isDescOrdered;
            const isThirdClick = isSortedByCurrentType && isDescOrdered;

            if (isFirstClick) {
              searchParamValues = { sort: sortType, order: null };
            }

            if (isSecondClick) {
              searchParamValues = { sort: sortType, order: 'desc' };
            }

            if (isThirdClick) {
              searchParamValues = { sort: null, order: null };
            }

            return (
              <th key={sortType}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {formattedSortType}
                  <Link to={{
                    search: getSearchWith(searchParams, searchParamValues),
                  }}
                  >
                    <span className="icon">
                      <i className={cn('fas',
                        { 'fa-sort': isFirstClick },
                        { 'fa-sort-up': isSecondClick },
                        { 'fa-sort-down': isThirdClick })}
                      />
                    </span>
                  </Link>
                </span>
              </th>
            );
          })}

          <th>Mother</th>

          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => {
          const { slug } = person;
          const isSelected = selectedPersonSlug === slug;

          const mother = people
            .find(parent => parent.name === person.motherName);

          const father = people
            .find(parent => parent.name === person.fatherName);

          const personWithParentsLinks = { ...person, mother, father };

          return (
            <PersonInfo
              key={slug}
              person={personWithParentsLinks}
              isSelected={isSelected}
            />
          );
        })}
      </tbody>
    </table>
  );
};
