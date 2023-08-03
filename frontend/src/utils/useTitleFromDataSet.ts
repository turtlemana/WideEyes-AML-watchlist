import { useCallback } from 'react';

const useTitleFromDataset = () => {
  const getTitleFromDataset = useCallback((dataset:string) => {
    if(dataset.includes("PEP")) return "Politically Exposed Person";
    if(dataset.includes("SAN")) return "Sanction";
    if(dataset.includes("RRE")) return "Reputational Risk Exposure";
    if(dataset.includes("INS")) return "Insolvency";
    if(dataset.includes("DD")) return "Disqualified Director";
    if(dataset.includes("POI")) return "Profile of Interest";
    if(dataset.includes("REL")) return "Regulatory Enforcement List";
    return dataset; 
  }, []);

  return getTitleFromDataset;
};

export default useTitleFromDataset;