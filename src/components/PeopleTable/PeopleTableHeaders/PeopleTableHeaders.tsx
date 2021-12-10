import React, { FC } from 'react';
import { SortByOptions } from '../../../services/types';
import { SortableHeader } from './SortableHeader';

export const PeopleTableHeaders: FC = React.memo(() => (
  <thead>
    <tr>
      <SortableHeader name={SortByOptions.Name} />
      <SortableHeader name={SortByOptions.Sex} />
      <SortableHeader name={SortByOptions.Born} />
      <SortableHeader name={SortByOptions.Died} />
      <th>Father</th>
      <th>Mother</th>
    </tr>
  </thead>
));
