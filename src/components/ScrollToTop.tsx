import { useLocation } from "react-router-dom";
import { HiArrowUp } from 'react-icons/hi';
import { useEffect, useRef } from 'react';

export default function ScrollToTop() {
    const ref = useRef<HTMLButtonElement>(null);
    const { pathname, search } = useLocation();

    const onScroll = () => {
        if (!ref.current) return;

        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            ref.current.classList.add("block");
            ref.current.classList.remove("hidden");
        } else {
            ref.current.classList.add("hidden");
            ref.current.classList.remove("block");
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname, search]);

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        }
    }, [])

    return (
        <button onClick={() => {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }} ref={ref} type="button" className='p-4 bg-red-600 text-white text-2xl font-bold leading-tight uppercase rounded-full shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out hidden bottom-5 right-5 fixed' >
            <HiArrowUp />
        </button>
    );
}