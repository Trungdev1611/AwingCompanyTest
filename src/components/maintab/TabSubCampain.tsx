import {
  Paper,
} from "@mui/material";
import { subCamPaignItemTypeList } from "../../type";
import { useState } from "react";
import ListCard from "../ListCard";
import ContentSubCampaign from "../ContentSubCampaign";


interface PropsData {
  data: subCamPaignItemTypeList;
  setListData: React.Dispatch<
    React.SetStateAction<subCamPaignItemTypeList>
  >;
  flat: boolean,
  setFlat?: React.Dispatch<React.SetStateAction<boolean>>,
  setErrors: React.Dispatch<React.SetStateAction<{
    name: boolean;
    subCampaign: boolean
  
}>>
}

const TabSubCampain = ({ data, setListData, flat, setErrors } : PropsData) =>
  {
    const [campaignActived, setCampaignActived] = useState(0);
    const contentActived = data[campaignActived];

   
    return (
      <div>
        <Paper elevation={2} sx={{ padding: "10px" }}>
          <ListCard
            data={data}
            campaignActived={campaignActived}
            setCampaignActived={setCampaignActived}
            setListData={setListData}
            flat={flat}
          />

         
          <ContentSubCampaign
            contentActived={contentActived}
            data={data}
            setListData={setListData}
            campaignActived={campaignActived}
            flat={flat}
            setErrors = {setErrors}
          />
        
        </Paper>
      </div>
    );
  };

export default TabSubCampain;
