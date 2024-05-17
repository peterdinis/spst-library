import React, { FC } from "react";
import { Page, Text, View, Document } from "@react-pdf/renderer";

type PdfWrapperProps = {
  data: any[];
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
        data.map((item) => {
          return (
            <View>
              <Text>{item.name}</Text>
            </View>
          );
        })}
    </Page>
  </Document>
);

export default PdfWrapper;
