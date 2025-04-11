import cn from "classnames";
import { CenturyFilter, SexFilter } from "../types/FiltersParam";

type Props = {
  onSexFilterBy: (v: SexFilter) => void;
  sexFilterBy: SexFilter;
  onInput: (v: string) => void;
  query: string;
  onCenturyFilterBy: (v: CenturyFilter[]) => void;
  centuryFilterBy: CenturyFilter[];
}

export const PeopleFilters: React.FC<Props> = ({
  onSexFilterBy,
  sexFilterBy,
  onInput,
  query,
  onCenturyFilterBy,
  centuryFilterBy,
}) => {
  // const filterHandler = () => {

  // }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={cn({ "is-active": sexFilterBy === SexFilter.All })}
          href="#/people"
          onClick={() => onSexFilterBy(SexFilter.All)}
        >
          {SexFilter.All}
        </a>
        <a
          className={cn({ "is-active": sexFilterBy === SexFilter.Male })}
          href="#/people?sex=m"
          onClick={() => onSexFilterBy(SexFilter.Male)}
        >
          {SexFilter.Male}
        </a>
        <a
          className={cn({ "is-active": sexFilterBy === SexFilter.Female })}
          href="#/people?sex=f"
          onClick={() => onSexFilterBy(SexFilter.Female)}
        >
          {SexFilter.Female}
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={(event) => onInput(event.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {/* {CenturyFilter.map(century => (
              <a
                data-cy="century"
                className="button mr-1"
                href={`#/people?centuries=${century}`}
              >
                {century}
              </a>
            ))} */}
            <a
              data-cy="century"
              className={cn(
                "button mr-1",
                { 'is-info': centuryFilterBy.includes(CenturyFilter.Sixteen) }
              )}
              href="#/people?centuries=16"
              onClick={() => {
                if (centuryFilterBy.includes(CenturyFilter.Sixteen)) {
                  onCenturyFilterBy([
                    ...centuryFilterBy
                      .filter(century => century !== CenturyFilter.Sixteen)
                  ]);

                  return;
                }

                onCenturyFilterBy([...centuryFilterBy, CenturyFilter.Sixteen]);
              }}
            >
              16
            </a>

            <a
              data-cy="century"
              className={cn(
                "button mr-1",
                { 'is-info': centuryFilterBy.includes(CenturyFilter.Seventeen) }
              )}
              href="#/people?centuries=17"
              onClick={() => {
                if (centuryFilterBy.includes(CenturyFilter.Seventeen)) {
                  onCenturyFilterBy([
                    ...centuryFilterBy
                      .filter(century => century !== CenturyFilter.Seventeen)
                  ]);

                  return;
                }

                onCenturyFilterBy([...centuryFilterBy, CenturyFilter.Seventeen]);
              }}
            >
              17
            </a>

            <a
              data-cy="century"
              className={cn(
                "button mr-1",
                { 'is-info': centuryFilterBy.includes(CenturyFilter.Eighteen) }
              )}
              href="#/people?centuries=18"
              onClick={() => {
                if (centuryFilterBy.includes(CenturyFilter.Eighteen)) {
                  onCenturyFilterBy([
                    ...centuryFilterBy
                      .filter(century => century !== CenturyFilter.Eighteen)
                  ]);

                  return;
                }

                onCenturyFilterBy([...centuryFilterBy, CenturyFilter.Eighteen]);
              }}
            >
              18
            </a>

            <a
              data-cy="century"
              className={cn(
                "button mr-1",
                { 'is-info': centuryFilterBy.includes(CenturyFilter.Nineteen) }
              )}
              href="#/people?centuries=19"
              onClick={() => {
                if (centuryFilterBy.includes(CenturyFilter.Nineteen)) {
                  onCenturyFilterBy([
                    ...centuryFilterBy
                      .filter(century => century !== CenturyFilter.Nineteen)
                  ]);

                  return;
                }

                onCenturyFilterBy([...centuryFilterBy, CenturyFilter.Nineteen]);
              }}
            >
              19
            </a>

            <a
              data-cy="century"
              className={cn(
                "button mr-1",
                { 'is-info': centuryFilterBy.includes(CenturyFilter.Twenty) }
              )}
              href="#/people?centuries=20"
              onClick={() => {
                if (centuryFilterBy.includes(CenturyFilter.Twenty)) {
                  onCenturyFilterBy([
                    ...centuryFilterBy
                      .filter(century => century !== CenturyFilter.Twenty)
                  ]);

                  return;
                }

                onCenturyFilterBy([...centuryFilterBy, CenturyFilter.Twenty]);
              }}
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={cn("button is-success", {
                'is-outlined': centuryFilterBy.length,
              })}
              href="#/people"
              onClick={() => {
                onCenturyFilterBy([]);
              }}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
          onClick={() => {
            onSexFilterBy(SexFilter.All);
            onInput('');
            onCenturyFilterBy([]);
          }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
