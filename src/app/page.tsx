import { NextPage } from "next";
import Hero from "./_components/home/Hero";
import Footer from "./_components/shared/Footer";
import Services from "./_components/home/Services";

const Homepage: NextPage = () => {
	return (
		<>
			<Hero />
			<Services />
			<Footer />
		</>
	);
};

export default Homepage;
