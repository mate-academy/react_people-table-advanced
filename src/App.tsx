// Importações do React Router para navegação entre páginas
import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';

/**
 * Componente raiz da aplicação.
 * Define a estrutura de rotas e o layout principal.
 */
export const App = () => {
  return (
    <div data-cy="app">
      {/* Barra de navegação fixa no topo */}
      <Navbar />

      <div className="section">
        <div className="container">
          {/* Definição de todas as rotas da aplicação */}
          <Routes>
            {/* Página inicial — exibe apenas o título */}
            <Route path="/" element={<h1 className="title">Home Page</h1>} />

            {/* Redirecionamento: /home redireciona para / */}
            <Route path="/home" element={<Navigate to="/" replace />} />

            {/* Rotas de pessoas — suporta lista e seleção por slug */}
            <Route path="/people">
              {/* /people — lista todas as pessoas */}
              <Route index element={<PeoplePage />} />
              {/* /people/:slug — lista com pessoa selecionada */}
              <Route path=":slug" element={<PeoplePage />} />
            </Route>

            {/* Rota curinga — qualquer URL não reconhecida */}
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};
