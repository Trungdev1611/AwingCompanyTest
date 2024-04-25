export type informationType = {
  name: string;
  describe?: string;
};
export type adsType = {
  id?: number
  name: string;
  quantity: number;
};
export type subCamPaignItemType = {
    id: number,
    name: string;
    status: boolean;
    ads: Array<adsType>;
  }
export type subCamPaignItemTypeList = Array<subCamPaignItemType> ;
export interface CampaignState {
  information: informationType;
  subCampaigns: subCamPaignItemType;
}

export interface getDataFormType {
  data: informationType | subCamPaignItemType;
  type: "info" | "subCampaign";
}
