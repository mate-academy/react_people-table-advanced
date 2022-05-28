import React from 'react';

import '../../styles/Title.scss';

export const NotFoundPage: React.FC<{}> = React.memo(() => {
  return (
    <div className="HomePage">
      <h1 className="title">
        Page not found
      </h1>
    </div>
  );
});
