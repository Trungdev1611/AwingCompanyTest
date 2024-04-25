import { Box } from "@mui/material";
import React, { useState } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabInfo from "../components/maintab/TabInfo";
import TabSubCampain from "../components/maintab/TabSubCampain";
import { PaperStyled } from "../styled/styled";
import { Button } from "@mui/material";
import { informationType, subCamPaignItemTypeList } from "../type";
import { initData, validateCampaigns } from "../const";

const Campaign = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [dataInfo, setDataFormInfo] = useState<informationType>({
    name: "",
    describe: "",
  });
  const [dataSubCampaign, setDataSubCampaign] =
    useState<subCamPaignItemTypeList>([initData]);
  const [flat, setFlat] = useState(false);
  const [errors, setErrors] = useState({
    name: false,
    subCampaign: false,
  });
  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    console.log(event)
    setActiveTab(newValue);
  };

  function handleSubmit() {
    setFlat((prev) => !prev);
    if (!dataInfo.name) {
      setErrors((prev) => {
        return { ...prev, name: true };
      });
    }
    const validateSubCampaign: boolean = validateCampaigns(dataSubCampaign);

    if (errors.name || validateSubCampaign) {
      alert(`Vui lòng điền đúng và đầy đủ thông tin`);
      return;
    }
    const dataSubmit = {
      campaign: {
        information: dataInfo,
        subCampaigns: dataSubCampaign.map((campaign) => {
          return {
            name: campaign.name,
            status: campaign.status,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            ads: campaign.ads.map(({ id, ...rest }) => rest),
          };
        }),
      },
    };

    alert(JSON.stringify(dataSubmit));
  }

  return (
    <div>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <PaperStyled elevation={1}>
          <Button
            variant="contained"
            color="success"
            onClick={handleSubmit}
            sx={{ marginTop: "15px", backgroundColor: "#3F51B5" }}
            type="submit"
          >
            Submit
          </Button>
        </PaperStyled>

        <TabContext value={activeTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChangeTab} aria-label="tab">
              <Tab label="Thông tin" value="1" />
              <Tab label="Chiến dịch con" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <TabInfo
              setDataInfo={setDataFormInfo}
              dataInfo={dataInfo}
              error={errors}
              setErrors={setErrors}
            />
          </TabPanel>
          <TabPanel value="2">
            <TabSubCampain
              data={dataSubCampaign}
              setListData={setDataSubCampaign}
              flat={flat}
              setErrors={setErrors}
              // setFlat = {setFlat}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default Campaign;
