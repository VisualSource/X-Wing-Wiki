export default function Loading() {
  return (
    <div className="flex w-full flex-grow flex-col items-center justify-center gap-4 bg-slate-800 text-zinc-400">
      <div
        className="spinner-border inline-block h-12 w-12 animate-spin rounded-full border-4"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <h1 className="text-2xl font-bold">Loading...</h1>
    </div>
  );
}
