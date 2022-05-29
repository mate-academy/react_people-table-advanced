import {
  BaseSyntheticEvent, FC, memo, useCallback,
} from 'react';
import shortid from 'shortid';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { HumanWithParents } from '../../types/Human';

import '../../styles/Title.scss';
import { PersonRow } from '../PersonRow';
import { useSearchParams } from '../../hooks/useSearchParams';

import './PeopleTable.scss';

interface Props {
  people: Array<HumanWithParents>
}

const tableHeadings = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

export const PeopleTable: FC<Props> = memo(({ people }) => {
  const { slug } = useParams<{ slug: string }>();

  const navigate = useNavigate();
  const searchParams = useSearchParams();

  const currentSortBy = searchParams.get('sortBy');
  const currentSortOrder = searchParams.get('sortOrder');

  const handleSortByClick
  = useCallback((e: BaseSyntheticEvent) => {
    const headTitle: string = e.target.textContent;

    if (currentSortBy !== headTitle) {
      searchParams.set('sortBy', headTitle);
      searchParams.set('sortOrder', 'asc');
    } else if (currentSortBy === headTitle && currentSortOrder === 'asc') {
      searchParams.set('sortBy', headTitle);
      searchParams.set('sortOrder', 'desc');
    } else {
      searchParams.delete('sortBy');
      searchParams.delete('sortOrder');
    }

    navigate(`?${searchParams.toString()}`);
  }, [searchParams]);

  return (
    <div className="PeopleTable">
      <h1 className="title">
        PeopleTable
      </h1>
      <table className="table table-warning">
        <thead>
          <tr>
            {tableHeadings.map((title) => (
              <th
                className={classNames(
                  'PeopleTable__column',
                  {
                    'PeopleTable__now-sorting-column':
                    title === currentSortBy,
                    'PeopleTable__now-sorting-column--sort-asc':
                    currentSortOrder === 'asc' && title === currentSortBy,
                    'PeopleTable__now-sorting-column--sort-desc':
                    currentSortOrder === 'desc' && title === currentSortBy,
                  },
                )}
                key={shortid.generate()}
                scope="col"
                onClick={handleSortByClick}
              >
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {people.map((human) => (
            <PersonRow
              human={human}
              key={shortid.generate()}
              slug={slug}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
});
