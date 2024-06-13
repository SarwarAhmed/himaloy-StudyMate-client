import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import Slide from './Slide'
import { ThreeCircles } from 'react-loader-spinner'
import useAuth from '../../hooks/useAuth'
import LoadingSpinner from './LoadingSpinner'

export default function Carousel() {
    const { loading } = useAuth();

    // upcomming three posts
    const posts = [
        {
            _id: '1',
            title: 'Math Tutoring Session',
            image: 'https://i.ibb.co/p1X8cKH/education2.jpg'
        },
        {
            _id: '2',
            title: 'Physics Study Group',
            image: 'https://i.ibb.co/L8jxLbF/education3.jpg'
        },
        {
            _id: '3',
            title: 'Hands-on experience in organic chemistry.',
            image: 'https://i.ibb.co/bvt6WMp/educaiton1.jpg'
        }
    ]

    if (loading) return <LoadingSpinner />

    return (
        <div className='container px-6 pb-10 mx-auto'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className='mySwiper'
            >
                {
                    posts.map(post => (
                        <SwiperSlide key={post._id}>
                            <Slide post={post} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}
