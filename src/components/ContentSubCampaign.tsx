import { Button, Checkbox, Stack } from "@mui/material";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import TextFieldCus from "./common/TextFieldCus";
import { adsType, subCamPaignItemType, subCamPaignItemTypeList } from "../type";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";

interface DataTable extends adsType {
  id: number;
}
interface PropsDataSubCamPaign {
  contentActived: subCamPaignItemType;
  data: subCamPaignItemTypeList;
  setListData: React.Dispatch<React.SetStateAction<subCamPaignItemTypeList>>;
  campaignActived: number;
  flat: boolean,
  setFlat?: React.Dispatch<React.SetStateAction<boolean>>
  setErrors: React.Dispatch<React.SetStateAction<{
    name: boolean;
    subCampaign: boolean
  
}>>
}
const ContentSubCampaign = ({
  contentActived,
  data,
  setListData,
  campaignActived,
  flat,
}: PropsDataSubCamPaign) => {
  const [dataTable, setDataTable] = useState<Array<DataTable>>([]);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  useEffect(() => {
    const dataUpdateKey = data[campaignActived].ads.map((item, index: number) => {
      return { ...item, id: index };
    });
    setDataTable(dataUpdateKey);
  }, [campaignActived, data]);

  function handlechange(
    e: ChangeEvent<HTMLInputElement>,
    type: keyof subCamPaignItemType
  ) {
    const findIndex = data?.findIndex(
      (item: subCamPaignItemType) => item.id === campaignActived
    );
    if (data && typeof findIndex === "number" && findIndex > -1) {
      const stateCopy = [...data];
      console.log("stateCopy", stateCopy, contentActived)

      if (type === "name") {
        stateCopy[findIndex][type] = e.target.value;
      }
      if (type === "status") {
        stateCopy[findIndex].status = e.target.checked;
      }

      setListData(stateCopy);
    }
  }

  function handleEdit(newVal: DataTable, OldVal: DataTable) {
    const findIndex = dataTable.findIndex((item) => item.id === OldVal.id);
    const copyDataTable = [...dataTable];

    if (findIndex > -1) {
      copyDataTable[findIndex] = newVal;
      // setDataTable(copyDataTable);

      const copyData = [...data]
      copyData[campaignActived].ads = copyDataTable
      setListData(copyData)
    
    }
  }

  const columnsData = useMemo((): GridColDef[] => {
    function handleAddRowTable() {
      const length = dataTable.length;
      const copyDatatable = [...dataTable, { name: `Quảng cáo ${length + 1}`, quantity: 0, id: length },]
      const copyData = [...data]
      copyData[campaignActived].ads = copyDatatable
      setListData(copyData);
    }

    function handleDelete(rowData: DataTable){
       const  findRowWithId = dataTable.findIndex(row => row.id === rowData.id)
       if(findRowWithId > -1) {
        const updatedDataTable = [...dataTable.slice(0, findRowWithId), ...dataTable.slice(findRowWithId + 1)];

        //update data
        const copyData = [...data]
        copyData[campaignActived].ads = updatedDataTable
        setListData(copyData);
       }

    }
    return [
      {
        field: "name",
        headerName: "Tên quảng cáo*",
        type: "string",
        width: 400,
        align: "center",
        headerAlign: "center",
        sortable: false,
        disableColumnMenu: true,
        editable: true,
      },
      {
        field: "quantity",
        headerName: "Số lượng*",
        type: "number",
        width: 300,
        align: "center",
        headerAlign: "center",
        disableColumnMenu: true,
        editable: true,
        sortable: false,
      },
      {
        field: "action",
        type: "number",
        width: 100,
        align: "center",
        headerAlign: "center",
        sortable: false,
        disableColumnMenu: true,
        editable: true,
        renderCell: (params) => (
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleDelete(params.row)}
          >
            Xóa
          </Button>
        ),

        renderHeader: () => (
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddRowTable}
          >
            Thêm
          </Button>
        ),
      },
    ];
  }, [dataTable, data, campaignActived, setListData]);

// eslint-disable-next-line
  const getCellClassName = (params: GridCellParams<any, any, number|string>) => {
    if(flat) {
      if (params.field === 'name' && params.value === "") {
        // setErrors(prev => {
        //   return {...prev, subCampaign: true}
        // })
        return 'invalidCell';
      }
      if (params.field === 'quantity' && (params.value <= 0) ) {
        // setErrors(prev => {
        //   return {...prev, subCampaign: true}
        // })
        return 'invalidCell';
      }
      return ""
    }
    
      return ""

  };

  return (
    <div>
      <Stack direction="row" spacing={2}>
        <TextFieldCus
          value={contentActived?.name}
          label="Tên chiến dịch con"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handlechange(e, "name")
          }
          sx={{ flexGrow: 3 }}
          variant="standard"
          name="name"
        />
        <Stack sx={{ flexGrow: 2 }} justifyItems={"center"}>
          <Checkbox
            {...label}
            // defaultChecked
            checked={contentActived?.status}
            sx={{ alignSelf: "center" }}
            name="status"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handlechange(e, "status")
            }
          />
        </Stack>
      </Stack>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={dataTable}
          columns={columnsData}
          processRowUpdate={(newVal, oldVal) => {
            handleEdit(newVal, oldVal);
            return newVal;
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          getCellClassName={getCellClassName}
          // onCellEditStart={() => setFlat(false)}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
        />
      </div>
    </div>
  );
};

export default ContentSubCampaign;
