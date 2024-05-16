import React, { FC } from "react";
import { Page, Text, View, Document } from "@react-pdf/renderer";
import { styles } from "./styles";

type PdfWrapperProps = {
  data: any[];
};

const PdfWrapper: FC<PdfWrapperProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {data &&
        data.map((item: any) => {
          return (
            <>
              <View style={styles.section}>
                <Text>{item.name}</Text>
              </View>
            </>
          );
        })}
    </Page>
  </Document>
);

export default PdfWrapper;
