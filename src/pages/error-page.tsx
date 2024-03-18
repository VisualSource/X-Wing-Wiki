import { useRouteError, useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";

export default function ErrorPage(props: { to?: string; text?: string }) {
  const error = useRouteError() as any;
  const navigate = useNavigate();
  return (
    <div className="flex flex-grow flex-col bg-slate-800">
      <header className="flex w-full justify-center bg-slate-900">
        <div className="my-5">
          <button
            onClick={() => navigate(-1)}
            type="button"
            className="flex items-center gap-2 rounded bg-blue-400 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg"
          >
            <HiArrowLeft /> {props?.text ?? "Back"}
          </button>
        </div>
      </header>
      <main className="flex h-full flex-col items-center justify-center text-white">
        <h1 className="mb-16 text-5xl font-bold">Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p className="mt-12 text-zinc-400">
          <i>{error?.statusText || error?.message}</i>
        </p>
      </main>
    </div>
  );
}
