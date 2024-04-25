import { Card, IconButton, Stack, Typography } from "@mui/material";
import { styleIcon, styleIconbtn, stylecard } from "../styled/styled";
import { subCamPaignItemType, subCamPaignItemTypeList } from "../type";
import { generateNewCampaign, isValid } from "../const";

interface ListCardProps {
  data: subCamPaignItemTypeList;
  campaignActived: number;
  setCampaignActived: React.Dispatch<React.SetStateAction<number>>;
  setListData: React.Dispatch<React.SetStateAction<subCamPaignItemTypeList>>;
  flat: boolean;
}

const ListCard = ({
  data,
  campaignActived,
  setCampaignActived,
  setListData,
  flat,
}: ListCardProps) => {
  function handleAddCampaign() {
    const newCampaign = generateNewCampaign(data.length);
    const stateCopy = [...data, newCampaign];
    setListData(stateCopy);
    setCampaignActived(data.length);
  }

  return (
    <Stack
      sx={{ margin: "20px 0", overflowX: "auto" }}
      direction={"row"}
      spacing={2}
    >
      <IconButton
        sx={styleIconbtn}
        onClick={handleAddCampaign}
        aria-label="add"
      >
        +
      </IconButton>
      {data?.map((item: subCamPaignItemType, index: number) => {
        return (
          <Card
            key={index}
            sx={{
              ...stylecard,
              border:
                campaignActived === item.id
                  ? "2px solid rgb(33, 150, 243)"
                  : "none",
            }}
            onClick={() => setCampaignActived(item.id)}
          >
            <Stack direction={"row"} gap={"10px"} alignItems={"center"}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: flat && isValid(item) ? "red" : "",
                }}
              >
                {item.name}
              </Typography>
              <Typography 
                sx={styleIcon}
              >
                {"\u2713"}
              </Typography>
            </Stack>

            <br />
            <p style={{ fontSize: 20 }}>
              {item.ads.reduce((prev, next) => {
                return prev + next.quantity;
              }, 0)}
            </p>
          </Card>
        );
      })}
    </Stack>
  );
};

export default ListCard;
