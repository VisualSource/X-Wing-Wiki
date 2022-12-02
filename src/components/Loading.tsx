export default function Loading(){
    return (
        <div className='bg-slate-800 flex flex-col w-full justify-center items-center text-zinc-400 flex-grow gap-4'>
            <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <h1 className="font-bold text-2xl">Loading...</h1>
        </div>
    )
}