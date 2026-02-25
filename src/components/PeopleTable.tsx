import { useParams, useSearchParams, Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { SearchLink } from './SearchLink';

// Tipagem das props do componente
type Props = {
  people: Person[]; // lista filtrada/ordenada para exibicao
  allPeople: Person[]; // lista completa (usada para encontrar pais/maes)
};

// Campos disponíveis para ordenação na tabela
type SortField = 'name' | 'sex' | 'born' | 'died';

// Array com os campos de ordenação para iterar no cabeçalho
const SORT_FIELDS: SortField[] = ['name', 'sex', 'born', 'died'];

/**
 * Tabela de pessoas com:
 *  - Cabeçalho com botões de ordenação (ciclo: asc → desc → desativado)
 *  - Destaque da pessoa selecionada via URL slug
 *  - Links para pais/mães quando existem na tabela
 *  - Cor vermelha para nomes femininos
 *
 * Recebe a lista já filtrada/ordenada como prop (a lógica fica no PeoplePage).
 */
export const PeopleTable: React.FC<Props> = ({ people, allPeople }) => {
  // Lê o slug da pessoa selecionada da URL (ex: /people/emma-de-milliano-1876)
  const { slug } = useParams();
  // Lê os parâmetros de busca para preservá-los nos links
  const [searchParams] = useSearchParams();

  // Valores atuais de ordenação da URL
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  /**
   * Retorna os parâmetros de busca para o próximo estado de ordenação.
   * Ciclo de 3 estados ao clicar:
   *  1º clique: ordena ascendente (sort=field, sem order)
   *  2º clique: ordena descendente (sort=field, order=desc)
   *  3º clique: desativa ordenação (remove sort e order)
   */
  const getSortParams = (field: SortField) => {
    // Se o campo não está ordenado → ativa ordenação ascendente
    if (sort !== field) {
      return { sort: field, order: null };
    }

    // Se já está ascendente → muda para descendente
    if (order !== 'desc') {
      return { sort: field, order: 'desc' };
    }

    // Se já está descendente → desativa ordenação
    return { sort: null, order: null };
  };

  /**
   * Retorna a classe do ícone de ordenação conforme estado atual.
   * fa-sort: sem ordenação ativa para este campo
   * fa-sort-up: ordenação ascendente ativa
   * fa-sort-down: ordenação descendente ativa
   */
  const getSortIconClass = (field: SortField) => {
    if (sort !== field) {
      return 'fas fa-sort';
    }

    if (order === 'desc') {
      return 'fas fa-sort-down';
    }

    return 'fas fa-sort-up';
  };

  /**
   * Busca uma pessoa pelo nome na lista completa.
   * Usado para encontrar mãe/pai e criar link para eles.
   */
  const findPerson = (name: string | null) => {
    if (!name) {
      return null;
    }

    return allPeople.find(p => p.name === name) || null;
  };

  /**
   * Renderiza a célula de mãe ou pai.
   * - Se o nome é null → exibe "-"
   * - Se a pessoa não existe na tabela → exibe apenas o texto do nome
   * - Se a pessoa existe na tabela → exibe link clicável com cor vermelha para mulheres
   */
  const renderParentCell = (parentName: string | null) => {
    if (!parentName) {
      return '-';
    }

    const parent = findPerson(parentName);

    if (!parent) {
      return parentName;
    }

    return (
      <Link
        to={{
          pathname: `/people/${parent.slug}`,
          search: searchParams.toString(), // preserva filtros ao navegar
        }}
        className={classNames({ 'has-text-danger': parent.sex === 'f' })}
      >
        {parent.name}
      </Link>
    );
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      {/* ===== CABEÇALHO COM BOTÕES DE ORDENAÇÃO ===== */}
      <thead>
        <tr>
          {/* Gera colunas ordenáveis (Name, Sex, Born, Died) */}
          {SORT_FIELDS.map(field => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {/* Capitaliza a primeira letra do nome do campo */}
                {field.charAt(0).toUpperCase() + field.slice(1)}
                {/* SearchLink altera os params sort/order na URL ao clicar */}
                <SearchLink params={getSortParams(field)}>
                  <span className="icon">
                    <i className={getSortIconClass(field)} />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}

          {/* Colunas de mãe e pai — sem ordenação */}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      {/* ===== CORPO DA TABELA ===== */}
      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            // Destaca a linha da pessoa selecionada com fundo amarelo
            className={classNames({
              'has-background-warning': person.slug === slug,
            })}
          >
            {/* Nome da pessoa — link que seleciona ela e preserva search params */}
            <td>
              <Link
                to={{
                  pathname: `/people/${person.slug}`,
                  search: searchParams.toString(),
                }}
                // Nomes femininos ficam em vermelho
                className={classNames({
                  'has-text-danger': person.sex === 'f',
                })}
              >
                {person.name}
              </Link>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            {/* Células de mãe e pai — renderiza link se existem na tabela */}
            <td>{renderParentCell(person.motherName)}</td>
            <td>{renderParentCell(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
