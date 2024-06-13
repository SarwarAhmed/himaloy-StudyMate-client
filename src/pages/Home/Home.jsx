import Carousel from '../../components/Shared/Carousel';
import { Helmet } from 'react-helmet-async';
import ApprovedSeesions from './ApprovedSessions/ApprovedSeesions';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>StudyMate || Home</title>
            </Helmet>
            <Carousel />

            <ApprovedSeesions />
        </div>
    );
};

export default Home;
