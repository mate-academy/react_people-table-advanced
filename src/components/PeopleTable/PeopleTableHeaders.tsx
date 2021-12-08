import React, { FC } from 'react';

export const PeopleTableHeaders: FC = React.memo(() => (
  <thead>
    <tr>
      <th>Name</th>
      <th>Sex</th>
      <th>Born</th>
      <th>Died</th>
      <th>Father</th>
      <th>Mother</th>
    </tr>
  </thead>
));
