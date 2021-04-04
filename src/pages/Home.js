import React from 'react'
import Navbar from './../components/nav/Navbar';
import Header2 from './../components/home/Header2';
import HowItWorks from './../components/home/HowItWorks';
import Footer from './../components/nav/Footer';

const Home = () => {
    return (
        <div>
                <React.Fragment>
                <Navbar />

                <Header2 content={null} />

                <HowItWorks content={null} />

                <Footer/>
            </React.Fragment>
        </div>
    )
}

export default Home
