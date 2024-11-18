import Fuse, { IFuseOptions } from "fuse.js";
import { useRef } from "react";

export function useSearch<T>(data: readonly T[], options?: IFuseOptions<T>) {
    const fuse = useRef(new Fuse(data, options));

    return {
        search: (value: string) => fuse.current.search(value)
    }
}