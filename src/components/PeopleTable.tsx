import React, { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

type SortKey = 'name' | 'sex' | 'born' | 'died';

export const PeopleTable: React.FC = () => {
  const [searchParams] = useSearchParams();

  const currentSort = (searchParams.get('sort') as SortKey | null) ?? null;
  const currentOrder: 'asc' | 'desc' =
    searchParams.get('order') === 'desc' ? 'desc' : 'asc';

  const makeSortSearch = useMemo(() => {
    return (field: SortKey) => {
      const params = new URLSearchParams(searchParams);

      let nextOrder: 'asc' | 'desc' = 'asc';

      if (currentSort === field) {
        nextOrder = currentOrder === 'asc' ? 'desc' : 'asc';
      }

      params.set('sort', field);

      params.delete('order');
      if (nextOrder === 'desc') {
        params.set('order', 'desc');
      }

      const query = params.toString();

      return query ? `?${query}` : '';
    };
  }, [currentOrder, currentSort, searchParams]);

  const iconFor = (field: SortKey) => {
    if (currentSort !== field) {
      return 'fas fa-sort';
    }

    return currentOrder === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down';
  };

  const ariaSortFor = (field: SortKey): 'none' | 'ascending' | 'descending' => {
    if (currentSort !== field) {
      return 'none';
    }

    return currentOrder === 'asc' ? 'ascending' : 'descending';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th aria-sort={ariaSortFor('name')}>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <Link to={{ search: makeSortSearch('name') }}>
                <span className="icon" aria-hidden="true">
                  <i className={iconFor('name')} />
                </span>
              </Link>
            </span>
          </th>

          <th aria-sort={ariaSortFor('sex')}>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={{ search: makeSortSearch('sex') }}>
                <span className="icon" aria-hidden="true">
                  <i className={iconFor('sex')} />
                </span>
              </Link>
            </span>
          </th>

          <th aria-sort={ariaSortFor('born')}>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={{ search: makeSortSearch('born') }}>
                <span className="icon" aria-hidden="true">
                  <i className={iconFor('born')} />
                </span>
              </Link>
            </span>
          </th>

          <th aria-sort={ariaSortFor('died')}>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={{ search: makeSortSearch('died') }}>
                <span className="icon" aria-hidden="true">
                  <i className={iconFor('died')} />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        <tr data-cy="person">
          <td>
            <Link to="#/people/pieter-haverbeke-1602">Pieter Haverbeke</Link>
          </td>
          <td>m</td>
          <td>1602</td>
          <td>1642</td>
          <td>-</td>
          <td>
            <Link to="#/people/lieven-van-haverbeke-1570">
              Lieven van Haverbeke
            </Link>
          </td>
        </tr>

        <tr data-cy="person">
          <td>
            <Link className="has-text-danger" to="#/people/anna-van-hecke-1607">
              Anna van Hecke
            </Link>
          </td>
          <td>f</td>
          <td>1607</td>
          <td>1670</td>
          <td>Martijntken Beelaert</td>
          <td>Paschasius van Hecke</td>
        </tr>

        <tr data-cy="person">
          <td>
            <Link to="#/people/lieven-haverbeke-1631">Lieven Haverbeke</Link>
          </td>
          <td>m</td>
          <td>1631</td>
          <td>1676</td>
          <td>
            <Link className="has-text-danger" to="#/people/anna-van-hecke-1607">
              Anna van Hecke
            </Link>
          </td>
          <td>
            <Link to="#/people/pieter-haverbeke-1602">Pieter Haverbeke</Link>
          </td>
        </tr>

        <tr data-cy="person">
          <td>
            <Link
              className="has-text-danger"
              to="#/people/elisabeth-hercke-1632"
            >
              Elisabeth Hercke
            </Link>
          </td>
          <td>f</td>
          <td>1632</td>
          <td>1674</td>
          <td>Margriet de Brabander</td>
          <td>Willem Hercke</td>
        </tr>

        <tr data-cy="person">
          <td>
            <Link to="#/people/daniel-haverbeke-1652">Daniel Haverbeke</Link>
          </td>
          <td>m</td>
          <td>1652</td>
          <td>1723</td>
          <td>
            <Link
              className="has-text-danger"
              to="#/people/elisabeth-hercke-1632"
            >
              Elisabeth Hercke
            </Link>
          </td>
          <td>
            <Link to="#/people/lieven-haverbeke-1631">Lieven Haverbeke</Link>
          </td>
        </tr>

        <tr data-cy="person">
          <td>
            <Link className="has-text-danger" to="#/people/joanna-de-pape-1654">
              Joanna de Pape
            </Link>
          </td>
          <td>f</td>
          <td>1654</td>
          <td>1723</td>
          <td>Petronella Wauters</td>
          <td>Vincent de Pape</td>
        </tr>

        <tr data-cy="person">
          <td>
            <Link
              className="has-text-danger"
              to="#/people/martina-de-pape-1666"
            >
              Martina de Pape
            </Link>
          </td>
          <td>f</td>
          <td>1666</td>
          <td>1727</td>
          <td>Petronella Wauters</td>
          <td>Vincent de Pape</td>
        </tr>

        <tr data-cy="person">
          <td>
            <Link to="#/people/willem-haverbeke-1668">Willem Haverbeke</Link>
          </td>
          <td>m</td>
          <td>1668</td>
          <td>1731</td>
          <td>
            <Link
              className="has-text-danger"
              to="#/people/elisabeth-hercke-1632"
            >
              Elisabeth Hercke
            </Link>
          </td>
          <td>
            <Link to="#/people/lieven-haverbeke-1631">Lieven Haverbeke</Link>
          </td>
        </tr>

        <tr data-cy="person">
          <td>
            <Link to="#/people/jan-haverbeke-1671">Jan Haverbeke</Link>
          </td>
          <td>m</td>
          <td>1671</td>
          <td>1731</td>
          <td>
            <Link
              className="has-text-danger"
              to="#/people/elisabeth-hercke-1632"
            >
              Elisabeth Hercke
            </Link>
          </td>
          <td>
            <Link to="#/people/lieven-haverbeke-1631">Lieven Haverbeke</Link>
          </td>
        </tr>

        <tr data-cy="person" className="has-background-warning">
          <td>
            <Link className="has-text-danger" to="#/people/maria-de-rycke-1683">
              Maria de Rycke
            </Link>
          </td>
          <td>f</td>
          <td>1683</td>
          <td>1724</td>
          <td>Laurentia van Vlaenderen</td>
          <td>Frederik de Rycke</td>
        </tr>

        <tr data-cy="person">
          <td>
            <Link
              className="has-text-danger"
              to="#/people/livina-haverbeke-1692"
            >
              Livina Haverbeke
            </Link>
          </td>
          <td>f</td>
          <td>1692</td>
          <td>1743</td>
          <td>
            <Link className="has-text-danger" to="#/people/joanna-de-pape-1654">
              Joanna de Pape
            </Link>
          </td>
          <td>
            <Link to="#/people/daniel-haverbeke-1652">Daniel Haverbeke</Link>
          </td>
        </tr>

        <tr data-cy="person">
          <td>
            <Link to="#/people/pieter-bernard-haverbeke-1695">
              Pieter Bernard Haverbeke
            </Link>
          </td>
          <td>m</td>
          <td>1695</td>
          <td>1762</td>
          <td>Petronella Wauters</td>
          <td>
            <Link to="#/people/willem-haverbeke-1668">Willem Haverbeke</Link>
          </td>
        </tr>

        <tr data-cy="person">
          <td>
            <Link to="#/people/lieven-de-causmaecker-1696">
              Lieven de Causmaecker
            </Link>
          </td>
          <td>m</td>
          <td>1696</td>
          <td>1724</td>
          <td>Joanna Claes</td>
          <td>Carel de Causmaecker</td>
        </tr>

        <tr data-cy="person">
          <td>
            <Link className="has-text-danger" to="#/people/jacoba-lammens-1699">
              Jacoba Lammens
            </Link>
          </td>
          <td>f</td>
          <td>1699</td>
          <td>1740</td>
          <td>Livina de Vrieze</td>
          <td>Lieven Lammens</td>
        </tr>

        <tr data-cy="person">
          <td>
            <Link to="#/people/pieter-de-decker-1705">Pieter de Decker</Link>
          </td>
          <td>m</td>
          <td>1705</td>
          <td>1780</td>
          <td>Petronella van de Steene</td>
          <td>Joos de Decker</td>
        </tr>

        <tr data-cy="person">
          <td>
            <Link
              className="has-text-danger"
              to="#/people/laurentia-haverbeke-1710"
            >
              Laurentia Haverbeke
            </Link>
          </td>
          <td>f</td>
          <td>1710</td>
          <td>1786</td>
          <td>
            <Link className="has-text-danger" to="#/people/maria-de-rycke-1683">
              Maria de Rycke
            </Link>
          </td>
          <td>
            <Link to="#/people/jan-haverbeke-1671">Jan Haverbeke</Link>
          </td>
        </tr>

        <tr data-cy="person">
          <td>
            <Link
              className="has-text-danger"
              to="#/people/elisabeth-haverbeke-1711"
            >
              Elisabeth Haverbeke
            </Link>
          </td>
          <td>f</td>
          <td>1711</td>
          <td>1754</td>
          <td>
            <Link className="has-text-danger" to="#/people/maria-de-rycke-1683">
              Maria de Rycke
            </Link>
          </td>
          <td>
            <Link to="#/people/jan-haverbeke-1671">Jan Haverbeke</Link>
          </td>
        </tr>

        <tr data-cy="person">
          <td>
            <Link to="#/people/jan-van-brussel-1714">Jan van Brussel</Link>
          </td>
          <td>m</td>
          <td>1714</td>
          <td>1748</td>
          <td>Joanna van Rooten</td>
          <td>Jacobus van Brussel</td>
        </tr>

        <tr data-cy="person">
          <td>
            <Link to="#/people/bernardus-de-causmaecker-1721">
              Bernardus de Causmaecker
            </Link>
          </td>
          <td>m</td>
          <td>1721</td>
          <td>1789</td>
          <td>
            <Link
              className="has-text-danger"
              to="#/people/livina-haverbeke-1692"
            >
              Livina Haverbeke
            </Link>
          </td>
          <td>
            <Link to="#/people/lieven-de-causmaecker-1696">
              Lieven de Causmaecker
            </Link>
          </td>
        </tr>

        <tr data-cy="person">
          <td>
            <Link to="#/people/jan-francies-haverbeke-1725">
              Jan Francies Haverbeke
            </Link>
          </td>
          <td>m</td>
          <td>1725</td>
          <td>1779</td>
          <td>Livina de Vrieze</td>
          <td>
            <Link to="#/people/pieter-bernard-haverbeke-1695">
              Pieter Bernard Haverbeke
            </Link>
          </td>
        </tr>

        <tr data-cy="person">
          <td>
            <Link
              className="has-text-danger"
              to="#/people/angela-haverbeke-1728"
            >
              Angela Haverbeke
            </Link>
          </td>
          <td>f</td>
          <td>1728</td>
          <td>1734</td>
          <td>Livina de Vrieze</td>
          <td>
            <Link to="#/people/pieter-bernard-haverbeke-1695">
              Pieter Bernard Haverbeke
            </Link>
          </td>
        </tr>

        <tr data-cy="person">
          <td>
            <Link to="#/people/pieter-antone-haverbeke-1753">
              Pieter Antone Haverbeke
            </Link>
          </td>
          <td>m</td>
          <td>1753</td>
          <td>1798</td>
          <td>
            <Link
              className="has-text-danger"
              to="#/people/petronella-de-decker-1731"
            >
              Petronella de Decker
            </Link>
          </td>
          <td>
            <Link to="#/people/jan-francies-haverbeke-1725">
              Jan Francies Haverbeke
            </Link>
          </td>
        </tr>

        <tr data-cy="person">
          <td>
            <Link to="#/people/jan-frans-van-brussel-1761">
              Jan Frans van Brussel
            </Link>
          </td>
          <td>m</td>
          <td>1761</td>
          <td>1833</td>
          <td>-</td>
          <td>
            <Link to="#/people/jacobus-bernardus-van-brussel-1736">
              Jacobus Bernardus van Brussel
            </Link>
          </td>
        </tr>

        <tr data-cy="person">
          <td>
            <Link className="has-text-danger" to="#/people/livina-sierens-1761">
              Livina Sierens
            </Link>
          </td>
          <td>f</td>
          <td>1761</td>
          <td>1826</td>
          <td>Maria van Waes</td>
          <td>Jan Sierens</td>
        </tr>

        <tr data-cy="person">
          <td>
            <Link
              className="has-text-danger"
              to="#/people/joanna-de-causmaecker-1762"
            >
              Joanna de Causmaecker
            </Link>
          </td>
          <td>f</td>
          <td>1762</td>
          <td>1807</td>
          <td>-</td>
          <td>
            <Link to="#/people/bernardus-de-causmaecker-1721">
              Bernardus de Causmaecker
            </Link>
          </td>
        </tr>

        <tr data-cy="person">
          <td>
            <Link to="#/people/carel-haverbeke-1796">Carel Haverbeke</Link>
          </td>
          <td>m</td>
          <td>1796</td>
          <td>1837</td>
          <td>
            <Link className="has-text-danger" to="#/people/livina-sierens-1761">
              Livina Sierens
            </Link>
          </td>
          <td>
            <Link to="#/people/pieter-antone-haverbeke-1753">
              Pieter Antone Haverbeke
            </Link>
          </td>
        </tr>

        <tr data-cy="person">
          <td>
            <Link
              className="has-text-danger"
              to="#/people/maria-van-brussel-1801"
            >
              Maria van Brussel
            </Link>
          </td>
          <td>f</td>
          <td>1801</td>
          <td>1834</td>
          <td>
            <Link
              className="has-text-danger"
              to="#/people/joanna-de-causmaecker-1762"
            >
              Joanna de Causmaecker
            </Link>
          </td>
          <td>
            <Link to="#/people/jan-frans-van-brussel-1761">
              Jan Frans van Brussel
            </Link>
          </td>
        </tr>

        <tr data-cy="person">
          <td>
            <Link to="#/people/carolus-haverbeke-1832">Carolus Haverbeke</Link>
          </td>
          <td>m</td>
          <td>1832</td>
          <td>1905</td>
          <td>
            <Link
              className="has-text-danger"
              to="#/people/maria-van-brussel-1801"
            >
              Maria van Brussel
            </Link>
          </td>
          <td>
            <Link to="#/people/carel-haverbeke-1796">Carel Haverbeke</Link>
          </td>
        </tr>

        <tr data-cy="person">
          <td>
            <Link className="has-text-danger" to="#/people/maria-sturm-1835">
              Maria Sturm
            </Link>
          </td>
          <td>f</td>
          <td>1835</td>
          <td>1917</td>
          <td>Seraphina Spelier</td>
          <td>Charles Sturm</td>
        </tr>

        <tr data-cy="person">
          <td>
            <Link
              className="has-text-danger"
              to="#/people/emma-de-milliano-1876"
            >
              Emma de Milliano
            </Link>
          </td>
          <td>f</td>
          <td>1876</td>
          <td>1956</td>
          <td>Sophia van Damme</td>
          <td>Petrus de Milliano</td>
        </tr>

        <tr data-cy="person">
          <td>
            <Link to="#/people/emile-haverbeke-1877">Emile Haverbeke</Link>
          </td>
          <td>m</td>
          <td>1877</td>
          <td>1968</td>
          <td>
            <Link className="has-text-danger" to="#/people/maria-sturm-1835">
              Maria Sturm
            </Link>
          </td>
          <td>
            <Link to="#/people/carolus-haverbeke-1832">Carolus Haverbeke</Link>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
