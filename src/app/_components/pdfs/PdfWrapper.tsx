import { Document, Page, Text, View } from "@react-pdf/renderer";
import type { FC } from "react";

interface Item {
	name: string;
}

export type PdfWrapperProps = {
	data?: Item[];
};

const PdfWrapper: FC<PdfWrapperProps> = ({ data = [] }) => (
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
			{data?.map((item: Item, index: number) => (
				<View key={index}>
					<Text>{item.name}</Text>
				</View>
			))}
		</Page>
	</Document>
);

export default PdfWrapper;