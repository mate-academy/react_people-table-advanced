import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { SearchParams as FilterParams } from '../utils/searchHelper';
import { filterPeople, sortPeople } from '../utils/filterUtils';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Obter parâmetros da URL
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  // Carregar dados
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  // Manipular mudanças de filtro
  const handleFilterChange = useCallback(
    (params: FilterParams) => {
      const newSearchParams = new URLSearchParams(searchParams);

      // Atualizar query
      if (params.query !== undefined) {
        if (params.query === null || params.query === '') {
          newSearchParams.delete('query');
        } else {
          newSearchParams.set('query', params.query);
        }
      }

      // Atualizar centuries
      if (params.centuries !== undefined) {
        newSearchParams.delete('centuries');
        if (params.centuries) {
          params.centuries.forEach(century => {
            newSearchParams.append('centuries', century);
          });
        }
      }

      // Atualizar sex
      if (params.sex !== undefined) {
        if (params.sex === null) {
          newSearchParams.delete('sex');
        } else {
          newSearchParams.set('sex', params.sex);
        }
      }

      // Atualizar URL sem trailing '?'
      const searchString = newSearchParams.toString();

      navigate(`${location.pathname}${searchString ? `?${searchString}` : ''}`);
    },
    [searchParams, navigate, location.pathname],
  );

  // Manipular ordenação
  const handleSortChange = useCallback(
    (params: FilterParams) => {
      const newSearchParams = new URLSearchParams(searchParams);

      if (params.sort === null) {
        newSearchParams.delete('sort');
        newSearchParams.delete('order');
      } else {
        // Validar campo de ordenação
        const allowedSortFields = ['name', 'sex', 'born', 'died'];

        if (allowedSortFields.includes(params.sort)) {
          newSearchParams.set('sort', params.sort);
          if (params.order === 'desc') {
            newSearchParams.set('order', 'desc');
          } else {
            newSearchParams.delete('order');
          }
        }
      }

      // Atualizar URL sem trailing '?'
      const searchString = newSearchParams.toString();

      navigate(`${location.pathname}${searchString ? `?${searchString}` : ''}`);
    },
    [searchParams, navigate, location.pathname],
  );

  // Filtrar e ordenar pessoas
  const filteredPeople = filterPeople(people, { query, centuries, sex });
  const sortedPeople = sortPeople(filteredPeople, sort, order);

  return (
    <div className="container">
      <div className="columns">
        {/* Sidebar - Renderizar após carregamento, mesmo com zero resultados */}
        {!isLoading && !hasError && (
          <div className="column is-one-quarter">
            <PeopleFilters
              query={query}
              centuries={centuries}
              sex={sex}
              onFilterChange={handleFilterChange}
            />
          </div>
        )}

        {/* Conteúdo principal */}
        <div className="column">
          <h1 className="title">People Page</h1>

          {isLoading && <p>Loading...</p>}
          {hasError && <p className="has-text-danger">Error loading data</p>}

          {!isLoading && !hasError && (
            <>
              <div className="notification is-info is-light">
                Showing {sortedPeople.length} of {people.length} people
              </div>

              <PeopleTable
                people={sortedPeople}
                sort={sort}
                order={order}
                onSort={handleSortChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
