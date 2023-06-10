/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useMemo, useState } from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { SortingFilter } from '../types/SortingFilter';

interface PeopleTableProps {
  people: Person[],
  searchParams: URLSearchParams,
}
enum SortingOrder {
  ASCENDING = 'asc',
  DESCENDING = 'desc',
  INITIAL = '',
}

export const PeopleTable: React.FC<PeopleTableProps>
= ({ people, searchParams }) => {
  const { searchedSlug } = useParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const [sortingFilterField, setSortingFilterField]
  = useState<SortingFilter>(sort as SortingFilter || SortingFilter.NONE);
  const [sortingOrder, setSortingOrder] = useState(order as SortingFilter
    || SortingOrder.INITIAL);

  const columnTitles = ['name', 'sex', 'born', 'died', 'mother', 'father'];
  const noneSortableColumns = ['mother', 'father'];

  const handleFilterOrderToggle = () => {
    switch (sortingOrder) {
      case SortingOrder.INITIAL:
        setSortingOrder(SortingOrder.ASCENDING);
        break;
      case SortingOrder.ASCENDING:
        setSortingOrder(SortingOrder.DESCENDING);
        break;
      case SortingOrder.DESCENDING:
        setSortingOrder(SortingOrder.INITIAL);
        break;
      default:
        break;
    }
  };

  const handleFilterFieldToggle = (filterFieldName: string) => {
    setSortingFilterField(prevFilterStatus => {
      const currentFilterStatus
       = filterFieldName as SortingFilter;

      if (prevFilterStatus !== currentFilterStatus
        && prevFilterStatus) {
        setSortingOrder(SortingOrder.ASCENDING);
      } else {
        handleFilterOrderToggle();
      }

      return currentFilterStatus;
    });
  };

  const sortedPeople = useMemo(() => {
    const currentPeople = [...people];
    let orderMultiplier:number;

    switch (sortingOrder) {
      case SortingOrder.INITIAL:
        return currentPeople;
      case SortingOrder.ASCENDING:
        orderMultiplier = 1;
        break;
      case SortingOrder.DESCENDING:
        orderMultiplier = -1;
        break;
      default:
        break;
    }

    switch (sortingFilterField) {
      case SortingFilter.NAME:
        currentPeople
          .sort((firstWord, secondWord) => (
            firstWord.name.localeCompare(secondWord.name) * orderMultiplier));
        break;
      case SortingFilter.SEX:
        currentPeople
          .sort((firstWord, secondWord) => (
            firstWord.sex.localeCompare(secondWord.sex) * orderMultiplier));
        break;
      case SortingFilter.BORN:
        currentPeople
          .sort((firstNumber, secondNumber) => (
            (firstNumber.born - secondNumber.born) * orderMultiplier));
        break;
      case SortingFilter.DIED:
        currentPeople
          .sort((firstNumber, secondNumber) => (
            (firstNumber.died - secondNumber.died) * orderMultiplier));
        break;
      default:
        break;
    }

    return currentPeople;
  }, [sortingFilterField, sortingOrder, people]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columnTitles.map((columnTitle, columnTitleIndex) => {
            return (
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  {`${columnTitle.slice(0, 1).toUpperCase()}${columnTitle.slice(1)}`}
                  {!noneSortableColumns.includes(columnTitle)
                && (
                  <SearchLink
                    params={{
                      sort: columnTitle,
                      order: sortingOrder === SortingOrder.ASCENDING
                        ? SortingOrder.DESCENDING
                        : null,
                    }}
                    key={columnTitleIndex}
                  >
                    <span
                      className="icon"
                      onClick={() => handleFilterFieldToggle(columnTitle)}
                    >
                      <i className={
                        classNames('fas', {
                          'fa-sort': columnTitle
                            !== sortingFilterField
                            || sortingOrder === SortingOrder.INITIAL,
                          'fa-sort-up': sortingOrder === SortingOrder.ASCENDING
                          && columnTitle === sortingFilterField,
                          'fa-sort-down': sortingOrder
                          === SortingOrder.DESCENDING
                          && columnTitle === sortingFilterField,
                        })
                      }
                      />
                    </span>
                  </SearchLink>
                )}
                </span>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {sortedPeople.map((person) => {
          const {
            sex, born, died, motherName, fatherName, slug,
          } = person;

          const mother = sortedPeople
            .find(searchingPerson => searchingPerson.name === motherName);

          const father = sortedPeople
            .find(searchingPerson => searchingPerson.name === fatherName);

          const motherInfo = mother
            ? <PersonLink person={mother} />
            : motherName;

          const fatherInfo = father
            ? <PersonLink person={father} />
            : fatherName;

          return (
            <tr
              key={person.slug}
              className={classNames(
                { 'has-background-warning': searchedSlug === slug },
              )}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>{motherInfo || '-'}</td>
              <td>{fatherInfo || '-'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
