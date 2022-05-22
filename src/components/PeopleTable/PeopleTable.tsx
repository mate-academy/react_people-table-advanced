import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import PersonRow from '../PersonRow/PersonRow';
import './PeopleTable.scss';

type Props = {
  people: Person[],
};

const PeopleTable: React.FC<Props> = ({ people }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const personSlug = searchParams.get('slug') || '';
  const headers = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];
  const [
    sortParameter,
    setSortParameter,
  ] = useState(searchParams.get('sortBy'));
  const [sortingType, setSortingType] = useState('asc');
  const navigate = useNavigate();

  const sortPeopleAsc = () => {
    switch (sortParameter) {
      case 'name':
        return [...people].sort((person1, person2) => person1.name
          .localeCompare(person2.name));
      case 'sex':
        return [...people].sort((person1, person2) => person1.sex
          .localeCompare(person2.sex));
      case 'born':
        return [...people]
          .sort((person1, person2) => person1.born - person2.born);
      case 'died':
        return [...people]
          .sort((person1, person2) => person1.died - person2.died);
      default:
        return people;
    }
  };

  const sortPeopleDsc = () => {
    switch (sortParameter) {
      case 'name':
        return [...people].sort((person1, person2) => person2.name
          .localeCompare(person1.name));
      case 'sex':
        return [...people].sort((person1, person2) => person2.sex
          .localeCompare(person1.sex));
      case 'born':
        return [...people]
          .sort((person1, person2) => person2.born - person1.born);
      case 'died':
        return [...people]
          .sort((person1, person2) => person2.died - person1.died);
      default:
        return people;
    }
  };

  const getSortedPeople = () => {
    if (sortingType === 'asc') {
      return sortPeopleAsc();
    }

    return sortPeopleDsc();
  };

  const handleHeaderClick = (header: string) => {
    if ((header === 'father') || (header === 'mother')) {
      return;
    }

    if (sortParameter !== header) {
      setSortingType('asc');
    } else if (sortingType === 'asc') {
      setSortingType('dsc');
    } else {
      setSortingType('asc');
    }

    setSortParameter(header);

    searchParams.set('sortBy', header);

    navigate(`?${searchParams.toString()}`);
  };

  useEffect(() => {
    setSortParameter(searchParams.get('sortBy'));
  }, []);

  return (
    <table className="PeopleTable">
      <thead>
        <tr>
          {headers.map(header => {
            const appliedHeader = header.toLowerCase();

            return (
              <th
                className="HeaderCell"
                key={header}
                onClick={() => handleHeaderClick(appliedHeader)}
              >
                {searchParams.get('sortBy') === appliedHeader
                  ? `${header}*`
                  : header}

                {
                  (header !== 'Mother' && header !== 'Father') && (
                    <span className="ImageContainer">
                      <img
                        alt="Arrows up and down"
                        className={
                          classNames({
                            ArrowsUpAndDown: true,
                            Hidden: appliedHeader
                              === searchParams.get('sortBy'),
                          })
                        }
                        src="./images/sort_both.png"
                      />
                      <img
                        alt="Arrow up"
                        className={
                          classNames({
                            ArrowUp: true,
                            Hidden: !((sortingType === 'dsc') && (
                              appliedHeader === searchParams.get('sortBy'))
                            ),
                          })
                        }
                        src="./images/sort_asc.png"
                      />
                      <img
                        alt="Arrow down"
                        className={
                          classNames({
                            ArrowDown: true,
                            Hidden: !((sortingType === 'asc') && (
                              appliedHeader === searchParams.get('sortBy'))
                            ),
                          })
                        }
                        src="./images/sort_desc.png"
                      />
                    </span>
                  )
                }
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {
          getSortedPeople().map((person, index) => (
            <PersonRow
              index={index}
              person={person}
              slug={personSlug}
              key={person.slug}
            />
          ))
        }
      </tbody>
    </table>
  );
};

export default PeopleTable;
