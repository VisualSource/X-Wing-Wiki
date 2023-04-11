import { Link, useAsyncValue } from 'react-router-dom';
import LoadingWrapper from "../components/LoadingWrapper";

export default LoadingWrapper(STDLoadout);

function STDLoadout() {
    const data = useAsyncValue();

    return (
        <div>
            {JSON.stringify(data)}
        </div>
    );
}