import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { Loader } from './Loader';

// Mock Data
const peopleData = [
  {
    name: 'Pieter Haverbeke',
    sex: 'm',
    born: 1602,
    died: 1642,
    mother: null,
    father: 'Lieven van Haverbeke',
  },
  {
    name: 'Anna van Hecke',
    sex: 'f',
    born: 1607,
    died: 1670,
    mother: 'Martijntken Beelaert',
    father: 'Paschasius van Hecke',
  },
  {
    name: 'Lieven Haverbeke',
    sex: 'm',
    born: 1631,
    died: 1676,
    mother: 'Anna van Hecke',
    father: 'Pieter Haverbeke',
  },
  {
    name: 'Elisabeth Hercke',
    sex: 'f',
    born: 1632,
    died: 1674,
    mother: 'Margriet de Brabander',
    father: 'Willem Hercke',
  },
  {
    name: 'Daniel Haverbeke',
    sex: 'm',
    born: 1652,
    died: 1723,
    mother: 'Elisabeth Hercke',
    father: 'Lieven Haverbeke',
  },
  {
    name: 'Joanna de Pape',
    sex: 'f',
    born: 1654,
    died: 1723,
    mother: 'Petronella Wauters',
    father: 'Vincent de Pape',
  },
  {
    name: 'Martina de Pape',
    sex: 'f',
    born: 1666,
    died: 1727,
    mother: 'Petronella Wauters',
    father: 'Vincent de Pape',
  },
  {
    name: 'Willem Haverbeke',
    sex: 'm',
    born: 1668,
    died: 1731,
    mother: 'Elisabeth Hercke',
    father: 'Lieven Haverbeke',
  },
  {
    name: 'Jan Haverbeke',
    sex: 'm',
    born: 1671,
    died: 1731,
    mother: 'Elisabeth Hercke',
    father: 'Lieven Haverbeke',
  },
  {
    name: 'Maria de Rycke',
    sex: 'f',
    born: 1683,
    died: 1724,
    mother: 'Laurentia van Vlaenderen',
    father: 'Frederik de Rycke',
  },
  {
    name: 'Livina Haverbeke',
    sex: 'f',
    born: 1692,
    died: 1743,
    mother: 'Joanna de Pape',
    father: 'Daniel Haverbeke',
  },
  {
    name: 'Pieter Bernard Haverbeke',
    sex: 'm',
    born: 1695,
    died: 1762,
    mother: 'Petronella Wauters',
    father: 'Willem Haverbeke',
  },
  {
    name: 'Lieven de Causmaecker',
    sex: 'm',
    born: 1696,
    died: 1724,
    mother: 'Joanna Claes',
    father: 'Carel de Causmaecker',
  },
  {
    name: 'Jacoba Lammens',
    sex: 'f',
    born: 1699,
    died: 1740,
    mother: 'Livina de Vrieze',
    father: 'Lieven Lammens',
  },
  {
    name: 'Pieter de Decker',
    sex: 'm',
    born: 1705,
    died: 1780,
    mother: 'Petronella van de Steene',
    father: 'Joos de Decker',
  },
  {
    name: 'Laurentia Haverbeke',
    sex: 'f',
    born: 1710,
    died: 1786,
    mother: 'Maria de Rycke',
    father: 'Jan Haverbeke',
  },
  {
    name: 'Elisabeth Haverbeke',
    sex: 'f',
    born: 1711,
    died: 1754,
    mother: 'Maria de Rycke',
    father: 'Jan Haverbeke',
  },
  {
    name: 'Jan van Brussel',
    sex: 'm',
    born: 1714,
    died: 1748,
    mother: 'Joanna van Rooten',
    father: 'Jacobus van Brussel',
  },
  {
    name: 'Bernardus de Causmaecker',
    sex: 'm',
    born: 1721,
    died: 1789,
    mother: 'Livina Haverbeke',
    father: 'Lieven de Causmaecker',
  },
  {
    name: 'Jan Francies Haverbeke',
    sex: 'm',
    born: 1725,
    died: 1779,
    mother: 'Livina de Vrieze',
    father: 'Pieter Bernard Haverbeke',
  },
  {
    name: 'Angela Haverbeke',
    sex: 'f',
    born: 1728,
    died: 1734,
    mother: 'Livina de Vrieze',
    father: 'Pieter Bernard Haverbeke',
  },
  {
    name: 'Petronella de Decker',
    sex: 'f',
    born: 1731,
    died: 1781,
    mother: 'Livina Haverbeke',
    father: 'Pieter de Decker',
  },
  {
    name: 'Jacobus Bernardus van Brussel',
    sex: 'm',
    born: 1736,
    died: 1809,
    mother: 'Elisabeth Haverbeke',
    father: 'Jan van Brussel',
  },
  {
    name: 'Pieter Antone Haverbeke',
    sex: 'm',
    born: 1753,
    died: 1798,
    mother: 'Petronella de Decker',
    father: 'Jan Francies Haverbeke',
  },
  {
    name: 'Jan Frans van Brussel',
    sex: 'm',
    born: 1761,
    died: 1833,
    mother: null,
    father: 'Jacobus Bernardus van Brussel',
  },
  {
    name: 'Livina Sierens',
    sex: 'f',
    born: 1761,
    died: 1826,
    mother: 'Maria van Waes',
    father: 'Jan Sierens',
  },
  {
    name: 'Joanna de Causmaecker',
    sex: 'f',
    born: 1762,
    died: 1807,
    mother: null,
    father: 'Bernardus de Causmaecker',
  },
  {
    name: 'Carel Haverbeke',
    sex: 'm',
    born: 1796,
    died: 1837,
    mother: 'Livina Sierens',
    father: 'Pieter Antone Haverbeke',
  },
  {
    name: 'Maria van Brussel',
    sex: 'f',
    born: 1801,
    died: 1834,
    mother: 'Joanna de Causmaecker',
    father: 'Jan Frans van Brussel',
  },
  {
    name: 'Carolus Haverbeke',
    sex: 'm',
    born: 1832,
    died: 1905,
    mother: 'Maria van Brussel',
    father: 'Carel Haverbeke',
  },
  {
    name: 'Maria Sturm',
    sex: 'f',
    born: 1835,
    died: 1917,
    mother: 'Seraphina Spelier',
    father: 'Charles Sturm',
  },
  {
    name: 'Emma de Milliano',
    sex: 'f',
    born: 1876,
    died: 1956,
    mother: 'Sophia van Damme',
    father: 'Petrus de Milliano',
  },
  {
    name: 'Emile Haverbeke',
    sex: 'm',
    born: 1877,
    died: 1968,
    mother: 'Maria Sturm',
    father: 'Carolus Haverbeke',
  },
];

const allCenturies = [16, 17, 18, 19, 20];

// Helper function to get the century from a year
const getCentury = year => Math.ceil(year / 100);

// Main component logic
export const PeoplePage = () => {
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchParams] = useSearchParams();

  // Simulate API fetch on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setPeople(peopleData);
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }, 500); // 500ms delay to simulate loading

    return () => clearTimeout(timer);
  }, []);

  // Get search parameters from the URL
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || 'all';
  const centuries = searchParams.getAll('centuries').map(Number);
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || 'asc';

  // Memoized filtering and sorting logic
  const filteredAndSortedPeople = useMemo(() => {
    let filtered = people;

    // 1. Filter by search query (name, mother, father)
    if (query) {
      const lowerQuery = query.toLowerCase();

      filtered = filtered.filter(
        person =>
          (person.name && person.name.toLowerCase().includes(lowerQuery)) ||
          (person.mother && person.mother.toLowerCase().includes(lowerQuery)) ||
          (person.father && person.father.toLowerCase().includes(lowerQuery)),
      );
    }

    // 2. Filter by sex
    if (sex !== 'all') {
      filtered = filtered.filter(person => person.sex === sex);
    }

    // 3. Filter by centuries
    if (centuries.length > 0) {
      filtered = filtered.filter(person => {
        const bornCentury = getCentury(person.born);

        return centuries.includes(bornCentury);
      });
    }

    // 4. Sort people
    if (sort) {
      filtered.sort((a, b) => {
        let valA = a[sort] || '';
        let valB = b[sort] || '';

        // Handle string vs number sorting
        if (typeof valA === 'string') {
          valA = valA.toLowerCase();
          valB = valB.toLowerCase();
        }

        if (valA < valB) {
          return order === 'asc' ? -1 : 1;
        }

        if (valA > valB) {
          return order === 'asc' ? 1 : -1;
        }

        return 0;
      });
    }

    return filtered;
  }, [people, query, sex, centuries, sort, order]);

  // Handle display based on state
  let content = null;

  if (isLoading) {
    content = <Loader />;
  } else if (hasError) {
    content = <p data-cy="peopleLoadingError">Something went wrong</p>;
  } else if (people.length === 0) {
    content = (
      <p data-cy="noPeopleMessage">There are no people on the server</p>
    );
  } else if (filteredAndSortedPeople.length === 0) {
    content = <p>There are no people matching the current search criteria</p>;
  } else {
    content = (
      <PeopleTable people={filteredAndSortedPeople} sort={sort} order={order} />
    );
  }

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              query={query}
              sex={sex}
              centuries={centuries}
              allCenturies={allCenturies}
            />
          </div>
          <div className="column">
            <div className="box table-container">{content}</div>
          </div>
        </div>
      </div>
    </>
  );
};
