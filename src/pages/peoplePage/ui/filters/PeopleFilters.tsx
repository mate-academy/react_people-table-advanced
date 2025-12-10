import { usePeopleContext } from '@pages/peoplePage/model';
import { Centuries, Sex } from '@pages/peoplePage/types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

export const PeopleFilters = () => {
  const { state, parametersAction } = usePeopleContext();
  const btnReg = {
    sex: [Sex.MALE, Sex.FEMALE],
    cent: [
      Centuries.SXTN,
      Centuries.SVNTN,
      Centuries.EIGHTN,
      Centuries.NNTN,
      Centuries.TWT,
    ],
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p
        className="panel-tabs"
        data-cy="SexFilter"
        style={{ textTransform: 'capitalize' }}
      >
        <Link
          to={``}
          className={classNames({ 'is-active': state.sex === '' })}
          onClick={e => {
            e.preventDefault();
            parametersAction.setSex(Sex.ALL);
          }}
        >
          {Sex.ALL}
        </Link>
        {btnReg.sex.map(el => (
          <Link
            key={el}
            to={`?sex=${el[0].toLowerCase()}`}
            className={classNames({ 'is-active': state.sex === el })}
            onClick={e => {
              e.preventDefault();
              parametersAction.setSex(el);
            }}
          >
            {el}
          </Link>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            value={state.query}
            placeholder="Search"
            onChange={e => {
              parametersAction.setQuery(e);
            }}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {btnReg.cent.map(el => (
              <Link
                key={el}
                to={`?centuries=${el}`}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': state.centuries.some(ct => ct === el),
                })}
                onClick={e => {
                  e.preventDefault();
                  parametersAction.setCentury(el);
                }}
              >
                {el}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              to={''}
              data-cy="centuryALL"
              className={classNames('button', 'is-outlined', 'is-success', {
                'is-focused': state.centuries.length === 0,
              })}
              onClick={e => {
                e.preventDefault();
                parametersAction.setCentury(Centuries.ALL);
              }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          className="button is-link is-outlined is-fullwidth"
          onClick={() => parametersAction.resetAll()}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
