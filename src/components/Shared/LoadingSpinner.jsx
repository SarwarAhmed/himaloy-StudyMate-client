import { ScaleLoader } from "react-spinners";

const LoadingSpinner = () => {
    return (
        <div className="flex justify-center">
            <ScaleLoader color='#000000' loading={true} height={35} width={4} radius={2} margin={2} />
        </div>
    );
};

export default LoadingSpinner;
