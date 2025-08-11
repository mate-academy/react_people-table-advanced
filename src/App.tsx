// App.tsx
import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { PeoplePage } from './components/PeoplePage';

import './App.scss';

export const App = () => {
  // Зберігаємо поточний хеш (те, що після # у URL), щоб показувати потрібну сторінку
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      const currentHash = window.location.hash;

      // Перенаправлення з '#/home' на '#/'
      if (currentHash === '#/home') {
        window.location.hash = '#/';

        return;
      }

      setHash(currentHash);
    };

    window.addEventListener('hashchange', handleHashChange);

    // Ініціалізація на самому початку
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Визначаємо, що рендерити, залежно від hash
  const getPage = () => {
    if (hash === '' || hash === '#' || hash === '#/') {
      return <h1 className="title">Home Page</h1>;
    }

    if (hash.startsWith('#/people')) {
      return <PeoplePage />;
    }

    // Якщо будь-який інший hash, показуємо "Page not found"
    return <h1 className="title">Page not found</h1>;
  };

  // Визначаємо поточний шлях без параметрів (наприклад, '#/' або '#/people')
  const getCurrentPath = () => {
    const path = hash.split('?')[0];

    return path;
  };

  return (
    <div data-cy="app">
      <Navbar currentPath={getCurrentPath()} />

      <div className="section">
        <div className="container">{getPage()}</div>
      </div>
    </div>
  );
};
