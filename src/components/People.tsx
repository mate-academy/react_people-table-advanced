// import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import { PeopleTable } from './PeopleTable';
import { getPeople } from '../people';
import './People.scss';
import { Man } from '../types';

export const People: React.FC = React.memo(() => {
  const [people, setPeople] = useState<Man[]>([]);
  // const [nameToSort, setNameToSort] = useState('');
  // const [sortOrder, setSortOrder] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const serchParams = new URLSearchParams(location.search);
  const inputValue = serchParams.get('query') || '';
  const sortBy = serchParams.get('sortBy') || '';

  // eslint-disable-next-line
  console.log(sortBy);

  const toLowerQuery = inputValue.toLowerCase();

  const filterByNameMotherFather
    = people.filter(person => person.name.toLowerCase()
      .includes(toLowerQuery)
      || (person.fatherName !== null
        ? person.fatherName.toLowerCase().includes(toLowerQuery)
        : '')
      || (person.motherName !== null
        ? person.motherName.toLowerCase().includes(toLowerQuery)
        : ''));

  useEffect(() => {
    getPeople()
      .then(setPeople);
  }, []);

  // const handleClick = useCallback((nameToSort: string) => {
  //   filterByNameMotherFather.sort((a, b) => {
  //     switch (nameToSort) {
  //       case 'name':
  //       case 'sex':
  //         return b[nameToSort].localeCompare(a[nameToSort]);
  //       default:
  //         return a.name.localeCompare(b.name);
  //     }
  //   });
  // }, [filterByNameMotherFather]);

  // eslint-disable-next-line
  console.log(filterByNameMotherFather);

  return (
    <div className="People">
      <h2>People page</h2>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => {
          navigate(`?query=${e.target.value}`);
        }}
      />
      {/* <PeopleTable
        people={filterByNameMotherFather}
      /> */}
    </div>

  );
});
