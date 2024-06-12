import Carousel from '../../components/Shared/Carousel';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
           <Helmet>
                <title>StudyMate || Home</title>
            </Helmet>
            <Carousel />
        </div>
    );
};

export default Home;
