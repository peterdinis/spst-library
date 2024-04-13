import { NextPage } from "next";
import GlobalErrorComponent from "../_components/shared/GlobalErrorComponent";

const NotFoundPage: NextPage = () => {
	return (
		<GlobalErrorComponent
			statusCode={"404"}
			message={"Stránka nebola nájdená"}
		/>
	);
};

export default NotFoundPage;
