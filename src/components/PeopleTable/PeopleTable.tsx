import './PeopleTabel.scss';
import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PersonRow } from '../PersonRow';
import { FilterByName } from '../FilterByName';
import { FilterByCentury } from '../FilterByCentury';
import { FilterBySex } from '../FilterBySex';
import { getSearchWith } from '../../utils/searchHelper';

interface Props {
  people: Person[]
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [peopleList, setPeopleList] = useState<Person[]>(people);
  const [searchParams, setSearchParams] = useSearchParams();

  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const sortOrder = searchParams.get('sortOrder') || '';
  const sortBy = searchParams.get('sortBy') || '';

  let visiblePeople = [...peopleList];

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (query) {
    const lowerQuery = query.toLocaleLowerCase();

    visiblePeople = visiblePeople.filter(person => {
      return person.name.toLocaleLowerCase().includes(lowerQuery)
        || (person.motherName
          && person.motherName.toLocaleLowerCase().includes(lowerQuery))
        || (person.fatherName
          && person.fatherName.toLocaleLowerCase().includes(lowerQuery));
    });
  }

  if (centuries.length !== 0) {
    visiblePeople = visiblePeople.filter(person => {
      return centuries.includes(Math.ceil(person.born / 100).toString());
    });
  }

  if (sortBy) {
    switch (sortBy) {
      case 'name':
      case 'sex':
        visiblePeople.sort((person, nextPerson) => (
          sortOrder === 'asc'
            ? person[sortBy].localeCompare(nextPerson[sortBy])
            : nextPerson[sortBy].localeCompare(person[sortBy])

        ));
        break;
      case 'born':
      case 'died':
        visiblePeople.sort((person, nextPerson) => (
          sortOrder === 'asc'
            ? Number(person[sortBy]) - Number(nextPerson[sortBy])
            : Number(nextPerson[sortBy]) - Number(person[sortBy])
        ));
        break;
      default:
        break;
    }
  }

  const handleSort = (sortByValue: string | null) => {
    if (sortByValue && sortOrder === '') {
      setSearchParams(getSearchWith(
        searchParams,
        {
          sortOrder: 'asc',
          sortBy: sortByValue,
        },
      ));
    }

    if (sortByValue && sortOrder === 'desc') {
      setSearchParams(getSearchWith(
        searchParams,
        {
          sortOrder: 'asc',
          sortBy: sortByValue,
        },
      ));
    }

    if (sortByValue && sortOrder === 'asc') {
      setSearchParams(getSearchWith(
        searchParams,
        {
          sortOrder: 'desc',
          sortBy: sortByValue,
        },
      ));
    }
  };

  return (
    <>
      <div className="block">
        <nav className="panel">
          <p className="panel-heading">
            Filters
          </p>

          <FilterBySex />

          <FilterByName />

          <FilterByCentury />

          <div className="panel-block">
            <Link
              to="/people"
              type="button"
              className="button is-primary is-rounded is-fullwidth"
              onClick={() => {
                setSearchParams('');
                setPeopleList(people);
              }}
            >
              Reset all filters
            </Link>
          </div>
        </nav>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th
              onClick={(event) => {
                handleSort(event.currentTarget.textContent);
              }}
            >
              <span>name</span>
              {
                // eslint-disable-next-line no-nested-ternary
                !sortOrder || sortBy !== 'name'
                  ? <img src="images/sort_both.png" alt="Not Sort" />
                  : sortOrder === 'asc' && sortBy === 'name'
                    ? <img src="images/sort_asc.png" alt="Sort ascending" />
                    : <img src="images/sort_desc.png" alt="Sort" />
              }
            </th>
            <th
              onClick={(event) => {
                handleSort(event.currentTarget.textContent);
              }}
            >
              <span>sex</span>
              {
                // eslint-disable-next-line no-nested-ternary
                !sortOrder || sortBy !== 'sex'
                  ? <img src="images/sort_both.png" alt="Not Sort" />
                  : sortOrder === 'asc' && sortBy === 'sex'
                    ? <img src="images/sort_asc.png" alt="Sort ascending" />
                    : <img src="images/sort_desc.png" alt="Sort descending" />

              }
            </th>
            <th
              onClick={(event) => {
                handleSort(event.currentTarget.textContent);
              }}
            >
              <span>born</span>
              {
                // eslint-disable-next-line no-nested-ternary
                !sortOrder || sortBy !== 'born'
                  ? <img src="images/sort_both.png" alt="Not Sort" />
                  : sortOrder === 'asc' && sortBy === 'born'
                    ? <img src="images/sort_asc.png" alt="Sort ascending" />
                    : <img src="images/sort_desc.png" alt="Sort" />

              }
            </th>
            <th
              onClick={(event) => {
                handleSort(event.currentTarget.textContent);
              }}
            >
              <span>died</span>
              {
                // eslint-disable-next-line no-nested-ternary
                !sortOrder || sortBy !== 'died'
                  ? <img src="images/sort_both.png" alt="Not Sort" />
                  : sortOrder === 'asc' && sortBy === 'died'
                    ? <img src="images/sort_asc.png" alt="Sort ascending" />
                    : <img src="images/sort_desc.png" alt="Sort" />

              }
            </th>
            <th>mother</th>
            <th>father</th>
          </tr>
        </thead>

        <tbody>
          {visiblePeople.map(person => (
            <PersonRow person={person} key={person.slug} />
          ))}

        </tbody>
      </table>

    </>
  );
};
