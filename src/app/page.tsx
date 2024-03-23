import { NextPage } from 'next';
import Hero from './_components/home/Hero';
import Footer from './_components/shared/Footer';

const Homepage: NextPage = () => {
    return (
        <>
            <Hero />
            <Footer />
        </>
    );
};

export default Homepage;
