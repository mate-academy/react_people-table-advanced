import { createHashRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PeoplePage } from "./pages/PeoplePage";
import { App } from "./App";

export const router = createHashRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: '/people/:personSlug?',
                element: <PeoplePage />
            },
            {
                path: '*',
                element: <NotFoundPage />
        }
        ]
    },
   
])