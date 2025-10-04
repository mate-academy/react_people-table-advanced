import React from 'react';

type Props = {
  field: string;
  label: string;
  sortField: string | null;
  sortOrder: 'asc' | 'desc' | null;
  applySortExplicit: (field: string) => void;
};

export const SortHeader: React.FC<Props> = ({
  field,
  label,
  sortField,
  sortOrder,
  applySortExplicit,
}) => {
  const isSorted = sortField === field;
  const isAsc = isSorted && sortOrder === 'asc';
  const isDesc = isSorted && sortOrder === 'desc';

  const headerClass = `is-clickable has-sort${isAsc ? ' has-sort-up' : ''}${
    isDesc ? ' has-sort-down' : ''
  }`;

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      applySortExplicit(field);
    }
  };

  const handleClick = () => applySortExplicit(field);

  return (
    <th
      className={headerClass}
      role="button"
      tabIndex={0}
      aria-sort={isSorted ? (isAsc ? 'ascending' : 'descending') : 'none'}
      onClick={handleClick}
      onKeyDown={handleKey}
      aria-label={`Sort by ${label}`}
    >
      <span
        className="is-flex is-align-items-center nowrap"
        style={{ whiteSpace: 'nowrap' }}
      >
        <span style={{ margin: 0 }}>{label}</span>

        <span
          className="icon has-text-link ml-1 sort-icons-match-born"
          aria-hidden="true"
        >
          <span className="sort-icon-item" title="Sort ascending">
            <i className="fas fa-sort-up" style={{ marginLeft: -10 }} />
          </span>

          <span className="sort-icon-item" title="Sort descending">
            <i className="fas fa-sort-down" style={{ marginLeft: -10 }} />
          </span>
        </span>
      </span>
    </th>
  );
};

export default SortHeader;
