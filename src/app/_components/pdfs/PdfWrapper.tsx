import { FC } from "react";
import { Page, Text, View, Document } from "@react-pdf/renderer";

interface Item {
	name: string;
}

type PdfWrapperProps = {
	data: Item[];
};

const PdfWrapper: FC<PdfWrapperProps> = ({ data }) => (
	<Document>
		<Page size={"A4"}>
			<Text
				style={{
					textAlign: "center",
					color: "red",
				}}
			>
				Zoznam
			</Text>
			{data &&
				data.map((item: Item, index: number) => (
					<View key={index}>
						<Text>{item.name}</Text>
					</View>
				))}
		</Page>
	</Document>
);

export default PdfWrapper;
