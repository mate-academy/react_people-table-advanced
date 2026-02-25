import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

// Opções de séculos disponíveis para filtragem (16 a 20)
const centuriesOptions = ['16', '17', '18', '19', '20'];

/**
 * Sidebar de filtros para a tabela de pessoas.
 * Permite filtrar por:
 *  - Sexo (Todos, Masculino, Feminino)
 *  - Nome (busca por texto em nome, mãe e pai)
 *  - Século de nascimento (seleção múltipla)
 *
 * Todos os filtros são persistidos na URL como search params.
 */
export const PeopleFilters = () => {
  // Lê e permite atualizar os parâmetros de busca da URL
  const [searchParams, setSearchParams] = useSearchParams();

  // Valores atuais dos filtros extraídos da URL
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries'); // getAll retorna array para múltiplos valores

  /**
   * Atualiza o parâmetro 'query' na URL quando o usuário digita.
   * Se o input estiver vazio, remove o parâmetro da URL (passa null).
   */
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value || null;

    setSearchParams(getSearchWith(searchParams, { query: newQuery }));
  };

  /**
   * Alterna um século na lista de séculos selecionados.
   * Se o século já está selecionado, remove; senão, adiciona.
   * Retorna null se nenhum século estiver selecionado (para limpar o param).
   */
  const toggleCentury = (century: string) => {
    const newCenturies = centuries.includes(century)
      ? centuries.filter(c => c !== century) // remove o seculo
      : [...centuries, century]; // adiciona o seculo

    // Retorna null para remover o parâmetro se a lista ficar vazia
    return newCenturies.length > 0 ? newCenturies : null;
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      {/* ===== FILTRO POR SEXO ===== */}
      {/* Cada link define o parâmetro 'sex' na URL */}
      <p className="panel-tabs" data-cy="SexFilter">
        {/* sex: null → remove o parâmetro (mostra todos) */}
        <SearchLink
          params={{ sex: null }}
          className={sex === '' ? 'is-active' : ''}
        >
          All
        </SearchLink>

        <SearchLink
          params={{ sex: 'm' }}
          className={sex === 'm' ? 'is-active' : ''}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: 'f' }}
          className={sex === 'f' ? 'is-active' : ''}
        >
          Female
        </SearchLink>
      </p>

      {/* ===== FILTRO POR NOME ===== */}
      {/* Input controlado que atualiza o parâmetro 'query' em tempo real */}
      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={handleQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      {/* ===== FILTRO POR SÉCULO ===== */}
      {/* Botões de seleção múltipla — cada clique alterna o século */}
      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesOptions.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                params={{ centuries: toggleCentury(century) }}
                className={`button mr-1 ${centuries.includes(century) ? 'is-info' : ''}`}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          {/* Botão "All" — remove todos os séculos selecionados */}
          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              params={{ centuries: null }}
              className={`button is-success ${centuries.length === 0 ? '' : 'is-outlined'}`}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      {/* ===== RESETAR TODOS OS FILTROS ===== */}
      {/* Remove sex, query e centuries da URL de uma vez */}
      <div className="panel-block">
        <SearchLink
          params={{ sex: null, query: null, centuries: null }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
