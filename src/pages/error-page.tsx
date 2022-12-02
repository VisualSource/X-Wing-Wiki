import { useRouteError, useNavigate } from "react-router-dom";
import { HiArrowLeft } from 'react-icons/hi';

export default function ErrorPage(props: { to?: string; text?: string; }){
    const error = useRouteError() as any;
    const navigate = useNavigate();
    return (
        <div className="flex flex-col flex-grow bg-slate-800">
            <header className="bg-slate-900 flex w-full justify-center">
                <div className='my-5'>
                    <button onClick={()=>navigate(-1)} type="button" className="px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out flex items-center gap-2"><HiArrowLeft/> {props?.text ?? "Back"}</button>
                </div>
            </header>
            <main className="flex flex-col justify-center text-white items-center h-full">
                <h1 className="text-5xl font-bold mb-16">Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p className="text-zinc-400 mt-12">
                    <i>{error?.statusText || error?.message}</i>
                </p>
            </main>
        </div>
    );
}