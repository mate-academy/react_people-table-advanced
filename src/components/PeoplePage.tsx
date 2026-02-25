import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

/**
 * Página principal de pessoas.
 * Responsável por:
 *  - Buscar dados da API
 *  - Gerenciar estados de carregamento, erro e lista vazia
 *  - Aplicar filtros (sexo, nome, séculos) e ordenação
 *  - Renderizar a sidebar de filtros e a tabela de pessoas
 */
export const PeoplePage = () => {
  // Estado para armazenar a lista completa de pessoas da API
  const [people, setPeople] = useState<Person[]>([]);
  // Controla se os dados ainda estão sendo carregados
  const [isLoading, setIsLoading] = useState(true);
  // Controla se houve erro ao buscar dados
  const [isError, setIsError] = useState(false);
  // Lê os parâmetros de busca da URL (filtros e ordenação)
  const [searchParams] = useSearchParams();

  // Extrai os parametros de filtro e ordenacao da URL
  const query = searchParams.get('query') || ''; // texto de busca por nome
  const sex = searchParams.get('sex') || ''; // filtro de sexo ('m' ou 'f')
  const centuries = searchParams.getAll('centuries'); // seculos selecionados
  const sort = searchParams.get('sort') || ''; // campo de ordenacao
  const order = searchParams.get('order') || ''; // direcao ('desc' ou vazio)

  // Busca os dados da API ao montar o componente (executa apenas uma vez)
  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  /**
   * Aplica filtros e ordenação sobre a lista de pessoas.
   * Retorna a lista filtrada e ordenada pronta para exibição.
   * Usa IIFE (função imediatamente invocada) para calcular o valor.
   */
  const preparedPeople = (() => {
    // Cria cópia para não mutar o estado original
    let filtered = [...people];

    // 1. Filtra por sexo (se o parâmetro 'sex' estiver definido)
    if (sex) {
      filtered = filtered.filter(person => person.sex === sex);
    }

    // 2. Filtra por texto de busca (case insensitive)
    //    Procura no nome, nome da mãe e nome do pai
    if (query) {
      const normalizedQuery = query.toLowerCase();

      filtered = filtered.filter(person => {
        return (
          person.name.toLowerCase().includes(normalizedQuery) ||
          (person.motherName || '').toLowerCase().includes(normalizedQuery) ||
          (person.fatherName || '').toLowerCase().includes(normalizedQuery)
        );
      });
    }

    // 3. Filtra por séculos selecionados
    //    O século é calculado como Math.ceil(anoNascimento / 100)
    //    Ex: nascido em 1832 → século 19
    if (centuries.length > 0) {
      filtered = filtered.filter(person => {
        const century = Math.ceil(person.born / 100).toString();

        return centuries.includes(century);
      });
    }

    // 4. Aplica ordenação pelo campo selecionado
    if (sort) {
      filtered.sort((a, b) => {
        switch (sort) {
          // Campos de texto — compara usando localeCompare
          case 'name':
          case 'sex':
            return a[sort].localeCompare(b[sort]);
          // Campos numéricos — compara por subtração
          case 'born':
          case 'died':
            return a[sort] - b[sort];
          default:
            return 0;
        }
      });

      // Se a ordem for descendente, inverte o array
      if (order === 'desc') {
        filtered.reverse();
      }
    }

    return filtered;
  })();

  // Variáveis auxiliares para simplificar as condições de renderização
  const isDataLoaded = !isLoading && !isError;
  const hasNoPeople = isDataLoaded && people.length === 0;
  const hasNoMatch =
    isDataLoaded && people.length > 0 && preparedPeople.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        {/* Layout reverso: filtros à direita no desktop */}
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {/* Mostra filtros apenas após os dados carregarem com sucesso */}
            {isDataLoaded && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {/* Spinner de carregamento enquanto busca dados */}
              {isLoading && <Loader />}

              {/* Mensagem de erro se a API falhar */}
              {isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {/* Mensagem se o servidor retornar lista vazia */}
              {hasNoPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {/* Mensagem se os filtros não encontrarem resultados */}
              {hasNoMatch && (
                <p>There are no people matching the current search criteria</p>
              )}

              {/* Tabela de pessoas — exibida quando há resultados */}
              {isDataLoaded && preparedPeople.length > 0 && (
                <PeopleTable people={preparedPeople} allPeople={people} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
