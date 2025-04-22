import { event } from "cypress/types/jquery";
import { set } from "cypress/types/lodash";
import { useState } from "react";

export const PeopleFilters = ({centuries ,genderFilter, setCenturies, setGenderFilter,input,setInput}) => {

  const handleFillter = (field) => {
    if (genderFilter !== field) {
  setGenderFilter(field)
    }

  }
  const toggleCentury = (century: number) => {
    setCenturies(prev => {
      return prev.includes(century)
        ? prev.filter(c => c !== century)
        : [...prev, century];
    });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a className={genderFilter===null?"is-active":''} href="#/people" onClick={()=>{handleFillter(null)}}>
          All
        </a>
        <a className={genderFilter==='m'?"is-active":''} href="#/people?sex=m" onClick={()=>{handleFillter('m')}}>
          Male
        </a>
        <a className={genderFilter==='f'?"is-active":''} href="#/people?sex=f" onClick={()=>{handleFillter('f')}}>
          Female
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={input}
            onChange={(event)=>{setInput(event.target.value)}}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <a
              data-cy="century"
              className={`button mr-1 ${centuries.includes(16) ? 'is-info' : ''}`}
              href="#/people?centuries=16"
              onClick={()=>toggleCentury(16)}

            >
              16
            </a>

            <a
              data-cy="century"
              className={`button mr-1 ${centuries.includes(17) ? 'is-info' : ''}`}
              href="#/people?centuries=17"
              onClick={()=>toggleCentury (17)}
            >
              17
            </a>

            <a
              data-cy="century"
              className={`button mr-1 ${centuries.includes(18) ? 'is-info' : ''}`}
              href="#/people?centuries=18"
              onClick={()=>toggleCentury (18)}
            >
              18
            </a>

            <a
              data-cy="century"
              className={`button mr-1 ${centuries.includes(19) ? 'is-info' : ''}`}
              href="#/people?centuries=19"
              onClick={()=>toggleCentury (19)}
            >
              19
            </a>

            <a
              data-cy="century"
              className={`button mr-1 ${centuries.includes(20) ? 'is-info' : ''}`}
              href="#/people?centuries=20"
              onClick={()=>toggleCentury (20)}
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={centuries.length < 0 ? "button is-success":'button is-success is-outlined'}
              href="#/people"
              onClick={()=>setCenturies([])}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a className="button is-link is-outlined is-fullwidth" href="#/people"
          onClick={()=>{setGenderFilter(null) ,setInput(''),setCenturies([])}

        }>
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
