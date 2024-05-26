import type { NextPage } from "next";
import Hero from "./_components/home/Hero";
import Services from "./_components/home/Services";
import Footer from "./_components/shared/Footer";

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
