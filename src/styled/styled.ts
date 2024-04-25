import { Paper } from "@mui/material";
import styled from "styled-components";

export const PaperStyled = styled(Paper)(() => ({
  margin: 0,
  display: "flex",
  justifyContent: "flex-end",
  padding: "15px",
}));

export const stylecard = {
  width: "200px",
  height: "150px",
  padding: "10px",
  textAlign: "center",
  flexShrink: 0,
};

export const styleIconbtn = {
  alignSelf: "flex-start",
  width: "50px",
  height: "50px",
  color: "red",
  backgroundColor: "rgb(237, 237, 237)",
};

export const styleIcon =  {
    fontWeight: "bolder",
    top: "-3px",
    position: "relative",
    width: "12px",
    height: "12px",
    color: "white",
    backgroundColor: "green",
    borderRadius: "50%",
    fontSize: "8px",
}