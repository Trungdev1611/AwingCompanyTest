import { Box } from "@mui/material";
import TextFieldCus from "../common/TextFieldCus";
import { ChangeEvent } from "react";
import { informationType } from "../../type";

interface DataPropsTabInfo {
  setDataInfo: React.Dispatch<React.SetStateAction<informationType>>;
  dataInfo: informationType;
  error: {name: boolean }
  setErrors: React.Dispatch<React.SetStateAction<{
    name: boolean;
    subCampaign: boolean
  
}>>
}
const TabInfo = ({ setDataInfo, dataInfo, error, setErrors }: DataPropsTabInfo) => {

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDataInfo((oldValues) => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));

    setErrors((prev) => {
      return {...prev, name: false}
    } )

  };
  

  return (
    <Box
      component="form"
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
      }}
      sx={{
        display: "flex",
        rowGap: "40px",
        flexDirection: "column",
      }}
    >
      <TextFieldCus
        id="CampaignName"
        name="name"
        label="Tên chiến dịch"
        variant="standard"
        fullWidth
        required
        onChange={handleChange}
        value={dataInfo.name}
        error ={error.name}
        helperText={error.name ? "Nhập tên chiến dịch": ""}
      />

      <TextFieldCus
        id="desc"
        name="describe"
        label="Mô tả"
        placeholder="Mô tả"
        variant="standard"
        fullWidth
        onChange={handleChange}
        value={dataInfo.describe}
      />
    </Box>
  );
};

export default TabInfo;
