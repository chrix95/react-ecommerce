import React from 'react'
import Announcement from '../components/Announcement'
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import Products from '../components/Products'
import Slider from '../components/Slider'

const Home = () => {
    return (
        <div>
            <Announcement />  {/* <Announcement /> is a component */}
            <Navbar />  {/* <Navbar /> is a component */}
            <Slider />  {/* <Slider /> is a component */}
            <Categories />  {/* <Categories /> is a component */}
            <Products />  {/* <Products /> is a component */}
            <Newsletter />  {/* <Newsletter /> is a component */}
            <Footer />  {/* <Footer /> is a component */}
        </div>
    )
}

export default Home
