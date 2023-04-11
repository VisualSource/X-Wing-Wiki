import { Await, useLoaderData } from "react-router-dom"

export default function LoadingWrapper(Component: () => React.ReactElement) {
    return function () {
        const { data } = useLoaderData() as { data: Promise<any> };
        return (
            <Await resolve={data}>
                <Component />
            </Await>
        );
    }
}