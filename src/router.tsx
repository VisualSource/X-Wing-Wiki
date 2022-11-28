import { createBrowserRouter } from "react-router-dom";

import { indexRoute } from './pages';
import { searchRoute } from './pages/search';
import { articleRoute } from './pages/articles';

export const router = createBrowserRouter([
   indexRoute,
   articleRoute,
   searchRoute
])
