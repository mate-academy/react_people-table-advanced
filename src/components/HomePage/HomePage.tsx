import React from 'react';

import '../../styles/Title.scss';

export const HomePage: React.FC<{}> = React.memo(() => {
  return (
    <div className="HomePage">
      <h1 className="title">
        Home Page
      </h1>
    </div>
  );
});
