import React, { FC } from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

type PdfWrapperProps = {
  data: any[];
};

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

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
