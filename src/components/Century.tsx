import { SetURLSearchParams } from 'react-router-dom';
import cn from 'classnames';

type Props = {
  centuries: string[];
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  century: string;
};

export const Century: React.FC<Props> = ({
  centuries,
  searchParams,
  setSearchParams,
  century,
}) => {
  const findParams = (str: string) => {
    return centuries.includes(str);
  };

  const centuriesHandler = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    arg: string,
  ) => {
    e.preventDefault();

    const elmIndex = centuries.findIndex((a) => a === arg);

    if (elmIndex > -1) {
      centuries.splice(elmIndex, 1);
    } else {
      centuries.push(arg);
    }

    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    centuries.forEach((el) => params.append('centuries', el));
    setSearchParams(params);
  };

  return (
    <a
      data-cy="century"
      className={cn('button mr-1', { 'is-info': findParams(century) })}
      onClick={(e) => centuriesHandler(e, century)}
      href={`#/people?centuries=${century}`}
    >
      {century}
    </a>
  );
};
