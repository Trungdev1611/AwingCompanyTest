import { subCamPaignItemType, subCamPaignItemTypeList } from "./type";



export const initData =     {
  id: 0,
  name: "Chiến dịch con 1",
  status: true,
  ads: [
    {
      name: "Quảng cáo 1",
      quantity: 0,
    },
  ],
}

export function generateNewCampaign(length: number) {
  return {
    id: length,
    name: `Chiến dịch con ${length + 1}`,
    status: true,
    ads: [
      {
        name: "Quảng cáo 1",
        quantity: 0,
      },
    ],
  }
}


export const isValid = (dataNeeValid: subCamPaignItemType): boolean => {
  return dataNeeValid.ads.some((subcampaign) => {
    return !subcampaign.name || !subcampaign.quantity ||subcampaign.quantity <=0 ;
  });
};


export function validateCampaigns(subCampaigns: subCamPaignItemTypeList) {
 // [1,2, [3,4], [5], 6]  => [1,2,3,4,5,6]   flattening the result by one level
  const allAds = subCampaigns.flatMap(campaign => campaign.ads);
  // Kiểm tra mỗi quảng cáo
  return allAds.some(ad => !ad.name || ad.quantity <= 0);
}