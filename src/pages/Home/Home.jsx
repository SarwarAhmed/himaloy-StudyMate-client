import Carousel from '../../components/Shared/Carousel';
import { Helmet } from 'react-helmet-async';
import ApprovedSeesions from './ApprovedSessions/ApprovedSeesions';
import Tutors from './Tutors/Tutors';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>StudyMate || Home</title>
            </Helmet>
            <Carousel />

            <ApprovedSeesions />

            <Tutors />
        </div>
    );
};

export default Home;
