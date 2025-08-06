/* eslint-disable no-console */
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './index.scss';

// Classes CSS esperadas pelos testes
const ACTIVE_NAV_LINK_CLASS = 'has-background-grey-lighter';
const SELECTED_PERSON_CLASS = 'has-background-warning';

// Interface para definir a estrutura de uma pessoa
interface Person {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string;
  motherName: string;
}

// Dados de exemplo para a página Home, conforme o teste
const peopleData: Person[] = [
  {
    name: 'John Doe',
    sex: 'm',
    born: 1801,
    died: 1850,
    fatherName: 'James Doe',
    motherName: 'Mary Doe',
  },
  {
    name: 'Jane Smith',
    sex: 'f',
    born: 1805,
    died: 1872,
    fatherName: 'James Doe',
    motherName: 'Mary Doe',
  },
  {
    name: 'Peter Jones',
    sex: 'm',
    born: 1830,
    died: 1899,
    fatherName: 'John Doe',
    motherName: 'Jane Smith',
  },
  {
    name: 'Anna Williams',
    sex: 'f',
    born: 1832,
    died: 1905,
    fatherName: 'John Doe',
    motherName: 'Jane Smith',
  },
  {
    name: 'Robert Miller',
    sex: 'm',
    born: 1860,
    died: 1920,
    fatherName: 'Peter Jones',
    motherName: 'Anna Williams',
  },
  {
    name: 'Susan Davis',
    sex: 'f',
    born: 1862,
    died: 1930,
    fatherName: 'Peter Jones',
    motherName: 'Anna Williams',
  },
];

// Utilitário para gerar um "slug" amigável para a URL
const toSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const PeopleTable = React.memo(
  (props: {
    people: Person[];
    onSort: (key: keyof Person) => void;
    sortConfig: { key: keyof Person; direction: string } | null;
    selectedPersonSlug: string | null;
    onSelectPerson: (slug: string | null) => void;
    peopleMap: Map<string, Person>;
  }) => {
    const {
      people,
      onSort,
      sortConfig,
      selectedPersonSlug,
      onSelectPerson,
      peopleMap,
    } = props;

    const getSortIcon = (field: keyof Person) => {
      if (!sortConfig || sortConfig.key !== field) {
        return null;
      }

      return sortConfig.direction === 'ascending' ? (
        <ChevronUp className="w-4 h-4 ml-2" />
      ) : (
        <ChevronDown className="w-4 h-4 ml-2" />
      );
    };

    return (
      <div
        data-cy="peopleTable"
        className="overflow-x-auto shadow-lg rounded-xl"
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th
                scope="col"
                className="px-6 py-3
                text-left text-xs
                font-semibold
                text-gray-500 uppercase
                tracking-wider cursor-pointer
                transition-colors duration-200
                hover:bg-gray-200"
                onClick={() => onSort('name')}
              >
                <span className="flex items-center">
                  Name
                  {getSortIcon('name')}
                </span>
              </th>
              <th
                scope="col"
                className="px-6 py-3
                text-left text-xs
                font-semibold text-gray-500
                uppercase tracking-wider
                cursor-pointer transition-colors
                duration-200 hover:bg-gray-200"
                onClick={() => onSort('sex')}
              >
                <span className="flex items-center">
                  Sex
                  {getSortIcon('sex')}
                </span>
              </th>
              <th
                scope="col"
                className="px-6 py-3
                text-left text-xs
                font-semibold text-gray-500
                uppercase tracking-wider
                cursor-pointer
                transition-colors duration-200 hover:bg-gray-200"
                onClick={() => onSort('born')}
              >
                <span className="flex items-center">
                  Born
                  {getSortIcon('born')}
                </span>
              </th>
              <th
                scope="col"
                className="px-6 py-3
                text-left text-xs
                font-semibold text-gray-500
                uppercase tracking-wider
                cursor-pointer transition-colors
                duration-200 hover:bg-gray-200"
                onClick={() => onSort('died')}
              >
                <span className="flex items-center">
                  Died
                  {getSortIcon('died')}
                </span>
              </th>
              <th
                scope="col"
                className="px-6 py-3
                text-left text-xs
                font-semibold text-gray-500
                uppercase tracking-wider"
              >
                Mother
              </th>
              <th
                scope="col"
                className="px-6 py-3
                text-left text-xs
                font-semibold text-gray-500
                uppercase tracking-wider"
              >
                Father
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {people.map((person, index) => {
              const personSlug = toSlug(`${person.name}-${person.born}`);
              const isSelected = selectedPersonSlug === personSlug;

              const mother = peopleMap.get(person.motherName);
              const father = peopleMap.get(person.fatherName);

              const personClass = isSelected ? SELECTED_PERSON_CLASS : '';

              return (
                <tr
                  key={index}
                  data-cy="person"
                  className={`transition-colors duration-150
                    ease-in-out hover:bg-gray-50 ${personClass}`}
                >
                  <td
                    className="px-6 py-4
                  whitespace-nowrap text-sm
                  font-medium text-gray-900"
                  >
                    <a
                      href={`#/people/${personSlug}`}
                      onClick={e => {
                        e.preventDefault();
                        onSelectPerson(personSlug);
                      }}
                      className={
                        person.sex === 'f' ? 'has-text-danger' : 'text-blue-600'
                      }
                    >
                      {person.name}
                    </a>
                  </td>
                  <td
                    className="px-6 py-4
                    whitespace-nowrap
                    text-sm text-gray-500"
                  >
                    {person.sex}
                  </td>
                  <td
                    className="px-6 py-4
                    whitespace-nowrap
                    text-sm text-gray-500"
                  >
                    {person.born}
                  </td>
                  <td
                    className="px-6 py-4
                    whitespace-nowrap
                    text-sm text-gray-500"
                  >
                    {person.died}
                  </td>
                  <td
                    className="px-6 py-4
                    whitespace-nowrap
                    text-sm text-gray-500"
                  >
                    {mother ? (
                      <a
                        href={`#/people/${toSlug(`${mother.name}-${mother.born}`)}`}
                        onClick={e => {
                          e.preventDefault();
                          onSelectPerson(
                            toSlug(`${mother.name}-${mother.born}`),
                          );
                        }}
                        className="has-text-danger"
                      >
                        {mother.name}
                      </a>
                    ) : person.motherName ? (
                      <span>{person.motherName}</span>
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                  <td
                    className="px-6 py-4
                    whitespace-nowrap
                    text-sm text-gray-500"
                  >
                    {father ? (
                      <a
                        href={`#/people/${toSlug(`${father.name}-${father.born}`)}`}
                        onClick={e => {
                          e.preventDefault();
                          onSelectPerson(
                            toSlug(`${father.name}-${father.born}`),
                          );
                        }}
                        className="text-blue-600"
                      >
                        {father.name}
                      </a>
                    ) : person.fatherName ? (
                      <span>{person.fatherName}</span>
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  },
);

PeopleTable.displayName = 'PeopleTable';

const PeopleFilters = React.memo(
  ({
    filters,
    onFilterChange,
  }: {
    filters: { sex: string; name: string };
    onFilterChange: (key: string, value: string) => void;
  }) => {
    return (
      <div
        className="flex flex-col
        sm:flex-row items-center
        space-y-4 sm:space-y-0
        sm:space-x-4 mb-6 p-4
        bg-white shadow-md rounded-xl"
      >
        <div className="w-full sm:w-auto">
          <label
            htmlFor="sex-filter"
            className="block text-sm font-medium text-gray-700"
          >
            Filtrar por Sexo:
          </label>
          <select
            id="sex-filter"
            className="mt-1 block w-full
            pl-3 pr-10 py-2
            text-base border-gray-300
            focus:outline-none
            focus:ring-indigo-500
            focus:border-indigo-500
            sm:text-sm rounded-md shadow-sm"
            value={filters.sex}
            onChange={e => onFilterChange('sex', e.target.value)}
          >
            <option value="">Todos</option>
            <option value="m">Masculino</option>
            <option value="f">Feminino</option>
          </select>
        </div>
        <div className="w-full sm:w-auto">
          <label
            htmlFor="name-search"
            className="block text-sm font-medium text-gray-700"
          >
            Procurar por Nome:
          </label>
          <input
            type="text"
            id="name-search"
            className="mt-1 block
            w-full border
            border-gray-300
            rounded-md shadow-sm
            py-2 px-3
            focus:outline-none
            focus:ring-indigo-500
            focus:border-indigo-500 sm:text-sm"
            placeholder="Digite o nome..."
            value={filters.name}
            onChange={e => onFilterChange('name', e.target.value)}
          />
        </div>
      </div>
    );
  },
);

PeopleFilters.displayName = 'PeopleFilters';

const PeoplePage = ({
  title,
  initialPeopleData,
}: {
  title: string;
  initialPeopleData?: Person[];
}) => {
  const [people, setPeople] = useState<Person[]>(initialPeopleData || []);
  const [peopleMap, setPeopleMap] = useState<Map<string, Person>>(
    new Map(initialPeopleData ? initialPeopleData.map(p => [p.name, p]) : []),
  );
  const [loading, setLoading] = useState(initialPeopleData === undefined);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({ sex: '', name: '' });
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Person;
    direction: string;
  } | null>(null);

  const [selectedPersonSlug, setSelectedPersonSlug] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const handleUrlChange = () => {
      const parts = window.location.hash.split('/');
      const slug = parts[2] || null;

      setSelectedPersonSlug(slug);
    };

    handleUrlChange();
    window.addEventListener('hashchange', handleUrlChange);

    return () => {
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const onSelectPerson = useCallback((slug: string | null) => {
    window.location.hash = slug ? `#/people/${slug}` : `#/people`;
  }, []);

  useEffect(() => {
    if (initialPeopleData) {
      setPeople(initialPeopleData);
      setLoading(false);
      setPeopleMap(new Map(initialPeopleData.map(p => [p.name, p])));

      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/people.json');

        if (!response.ok) {
          throw new Error('Failed to fetch people data');
        }

        const data: Person[] = await response.json();

        setPeople(data);
        setPeopleMap(new Map(data.map(p => [p.name, p])));
        setLoading(false);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err.message);
          setError('Erro ao carregar os dados.');
        }

        setLoading(false);
      }
    };

    fetchData();
  }, [initialPeopleData]);

  const onFilterChange = useCallback((key: string, value: string) => {
    setFilters(prevFilters => ({ ...prevFilters, [key]: value }));
  }, []);

  const sortedPeople = useMemo(() => {
    const sorted = [...people];

    if (sortConfig !== null) {
      sorted.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }

        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }

        return 0;
      });
    }

    return sorted;
  }, [people, sortConfig]);

  const filteredPeople = useMemo(() => {
    let filtered = sortedPeople;

    if (filters.sex) {
      filtered = filtered.filter(person => person.sex === filters.sex);
    }

    if (filters.name) {
      const lowercasedName = filters.name.toLowerCase();

      filtered = filtered.filter(person =>
        person.name.toLowerCase().includes(lowercasedName),
      );
    }

    return filtered;
  }, [sortedPeople, filters]);

  const onSort = useCallback(
    (key: keyof Person) => {
      let direction = 'ascending';

      if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === 'ascending'
      ) {
        direction = 'descending';
      }

      setSortConfig({ key, direction });
    },
    [sortConfig],
  );

  if (initialPeopleData) {
    return (
      <>
        <h1
          data-cy="title"
          className="title text-4xl
          font-extrabold
          text-center
          text-gray-900
          mb-8 tracking-tight"
        >
          {title}
        </h1>
      </>
    );
  }

  if (loading) {
    return (
      <div
        data-cy="loader"
        className="flex justify-center
        items-center h-64"
      >
        <div className="text-xl font-medium text-gray-500">Carregando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        data-cy="peopleLoadingError"
        className="flex justify-center items-center h-64"
      >
        <div className="text-xl font-medium text-red-500">{error}</div>
      </div>
    );
  }

  if (filteredPeople.length === 0) {
    return (
      <div
        data-cy="noPeopleMessage"
        className="flex justify-center items-center h-64"
      >
        <div className="text-xl font-medium text-gray-500">
          Nenhuma pessoa encontrada.
        </div>
      </div>
    );
  }

  return (
    <>
      <h1
        data-cy="title"
        className="title text-4xl
        font-extrabold
        text-center
        text-gray-900 mb-8
        tracking-tight"
      >
        {title}
      </h1>
      <PeopleFilters filters={filters} onFilterChange={onFilterChange} />
      <PeopleTable
        people={filteredPeople}
        onSort={onSort}
        sortConfig={sortConfig}
        selectedPersonSlug={selectedPersonSlug}
        onSelectPerson={onSelectPerson}
        peopleMap={peopleMap}
      />
    </>
  );
};

PeoplePage.displayName = 'PeoplePage';

const App = () => {
  const [page, setPage] = useState('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;

      if (hash === '#/home') {
        window.location.hash = '#/';

        return;
      }

      if (hash === '' || hash === '#/') {
        setPage('home');
      } else if (hash.startsWith('#/people')) {
        setPage('people');
      } else {
        setPage('not-found');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <PeoplePage title="Home Page" initialPeopleData={peopleData} />;
      case 'people':
        return <PeoplePage title="People Page" />;
      case 'not-found':
        return (
          <h1
            data-cy="title"
            className="title text-4xl
            font-extrabold
            text-center
            text-gray-900
            mb-8 tracking-tight"
          >
            Page not found
          </h1>
        );
      default:
        return null;
    }
  };

  return (
    <div
      data-cy="app"
      className="container mx-auto p-4 font-sans antialiased text-gray-800"
    >
      <nav data-cy="nav" className="bg-white shadow-lg rounded-xl p-4 mb-8">
        <ul className="flex space-x-4">
          <li>
            <a
              data-cy="nav-home"
              href="#/"
              className={`font-semibold
                pb-1
                transition-colors
                duration-200 ${page === 'home' ? `text-indigo-600 border-b-2 border-indigo-600 ${ACTIVE_NAV_LINK_CLASS}` : 'text-gray-500 hover:text-indigo-600'}`}
            >
              Home
            </a>
          </li>
          <li>
            <a
              data-cy="nav-people"
              href="#/people"
              className={`font-semibold pb-1 transition-colors duration-200 ${page === 'people' ? `text-indigo-600 border-b-2 border-indigo-600 ${ACTIVE_NAV_LINK_CLASS}` : 'text-gray-500 hover:text-indigo-600'}`}
            >
              People
            </a>
          </li>
        </ul>
      </nav>
      {renderPage()}
    </div>
  );
};

export default App;
