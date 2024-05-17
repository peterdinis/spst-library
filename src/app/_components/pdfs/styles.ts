import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    padding: 10,
  },
  table: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  tableColHeader: {
    flex: 1,
    borderRightStyle: "solid",
    borderRightWidth: 1,
    borderRightColor: "#000",
    backgroundColor: "#D3D3D3",
  },
  tableCol: {
    flex: 1,
    borderRightStyle: "solid",
    borderRightWidth: 1,
    borderRightColor: "#000",
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 12,
    fontWeight: "bold",
  },
  tableCell: {
    margin: 5,
    fontSize: 12,
  },
});