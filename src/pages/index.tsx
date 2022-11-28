import SearchBar from '../components/SearchBar';
import { type RouteObject } from 'react-router-dom';
import ErrorPage from './error-page';

//https://fusejs.io/examples.html#search-string-array
export const indexRoute: RouteObject = {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>
}

function App() {
  return (
    <div className="bg-slate-800 h-full flex justify-center items-center">
        <SearchBar className='w-11/12 sm:w-2/12'/>
    </div>
  )
}
