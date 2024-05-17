import React, { FC } from "react";
import { Page, Text, View, Document } from "@react-pdf/renderer";
import { styles } from "./styles";

type PdfWrapperProps = {
  data: any[];
};

const PdfWrapper: FC<PdfWrapperProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Name</Text>
          </View>
          {/* Add more header cells here if needed */}
        </View>
        {data &&
          data.map((item: any, index: number) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.name}</Text>
              </View>
              {/* Add more cells here if needed */}
            </View>
          ))}
      </View>
    </Page>
  </Document>
);

export default PdfWrapper;
