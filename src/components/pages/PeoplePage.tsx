import { Person } from '../../types';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { PeopleFilters } from '../contents/PeopleFilters';

import { useEffect, useState } from 'react';
import { PeopleTable } from '../contents/PeopleTable';

export const PeoplePage = () => {
  // useState para gerenciar dados e UI
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [centuries, setCenturies] = useState<number[]>([]);

  // Obtenção de parâmetros da URL
  const [searchParams] = useSearchParams();
  const { slug } = useParams();

  // Extrai e trata os parâmetros de busca
  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const selectedCenturies = searchParams.getAll('centuries');

  // Carrega dados iniciais
  useEffect(() => {
    const loadPeople = async () => {
      try {
        const data = await getPeople();

        // dados com informações de parentes e century
        const personData = data.map(person => ({
          ...person,
          mother: data.find(p => p.name === person.motherName),
          father: data.find(p => p.name === person.fatherName),
          born: Math.ceil(person.born / 100),
          died: Math.ceil(person.died / 100),
        }));

        // Calcula centuries únicos para os filtros
        const allCenturies = personData.flatMap(p => [p.born, p.died]);
        const uniqueCenturies = Array.from(new Set(allCenturies)).sort(
          (a, b) => a - b,
        );

        setCenturies(uniqueCenturies);
        setPeople(personData);
      } catch (err) {
        setError('Failed to load people data.');
      } finally {
        setIsLoading(false);
      }
    };

    loadPeople();
  }, []);

  // Aplica filters nos dados - VERSÃO CORRIGIDA
  const filteredPeople = people.filter(person => {
    const personSex = !sex || person.sex === sex;
    const personQuery =
      !query ||
      person.name.toLowerCase().includes(query.toLowerCase()) ||
      person.motherName?.toLowerCase().includes(query.toLowerCase()) ||
      person.fatherName?.toLowerCase().includes(query.toLowerCase());

    // bornCentury e diedCentury calculados anteriormente
    const personCentury =
      selectedCenturies.length === 0 ||
      selectedCenturies.some(
        century => person.born === +century || person.died === +century,
      );

    return personSex && personQuery && personCentury;
  });

  // Ordena dados filtrados
  const sortedPeople = [...filteredPeople];

  if (sort) {
    sortedPeople.sort((a, b) => {
      const field = sort as keyof Person;
      const aOrder = a[field] ?? '';
      const bOrder = b[field] ?? '';

      let comparison = 0;

      if (aOrder > bOrder) {
        comparison = 1;
      } else if (aOrder < bOrder) {
        comparison = -1;
      }

      return order === 'desc' ? comparison * -1 : comparison;
    });
  }

  // Renderização condicional
  const showNoDataMessage = !isLoading && !error && people.length === 0;
  const showNoResultsMessage = filteredPeople.length === 0 && people.length > 0;
  const showPeopleTable = filteredPeople.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {/* Filtros */}
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !error && (
              <PeopleFilters
                centuries={centuries}
                selectedCenturies={selectedCenturies}
              />
            )}
          </div>

          {/* Conteúdo Principal */}
          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {showNoDataMessage && (
                <p data-cy="noPeopleMessage">No people on the server</p>
              )}

              {showNoResultsMessage && (
                <p>No people match the search criteria</p>
              )}

              {showPeopleTable && (
                <PeopleTable
                  people={sortedPeople}
                  order={order}
                  sort={sort}
                  selectedSlug={slug}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
