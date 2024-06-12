import { Typewriter } from 'react-simple-typewriter'
import PropTypes from 'prop-types';

const Slide = ({ post }) => {

    const { image, title } = post || {}
    console.log(image);

    return (
        <div
            className='w-full bg-center bg-cover h-96 sm:h-[32rem] xl:h-[43rem] rounded-lg'
            style={{
                backgroundImage: `url(${image})`,
            }}
        >
            <div className='flex items-center justify-center w-full h-full bg-gray-900/70 rounded-lg'>
                <div className='text-center'>
                    <h1 className='text-3xl font-semibold text-white lg:text-4xl'>
                        {/* {title} */}
                        <Typewriter
                            words={[`${title}`]}
                            cursor={true} cursorStyle='|' loop={Infinity} typeSpeed={100} deleteSpeed={100} delaySpeed={1000} />
                    </h1>
                </div>
            </div>
        </div>
    )
}

Slide.propTypes = {
    post: PropTypes.object.isRequired
}

export default Slide
