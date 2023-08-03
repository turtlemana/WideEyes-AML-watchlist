import Image from "next/image";
import { useSearch } from "contexts/SearchStateContext";
import {State,Action} from "contexts/SearchStateContext";
import download from "assets/icons/aml/download.svg";
import Item from "components/templates/aml/BusinessMain/items";
import Pagination from "components/organisms/Pagination";
import {useState, useEffect,useCallback} from 'react'; 
import { CSVLink } from "react-csv";
import {businessResult } from "interfaces/search";


interface Props {
  searchResult:businessResult;
  searchKey:string;
  searchValid:boolean;
}

const Main = ({searchValid, searchKey,searchResult }: Props) => {
  const {state,dispatch} :{state:State, dispatch:React.Dispatch<Action>}=useSearch();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const convertDataToCSV = useCallback((data:businessResult['data']) => {
    return data.map((item:{    
        WE_CD:number;
      TRUE_NAME:string | null;
      NATION_NAME:string | null;}) => ({
      WE_CD: item.WE_CD || '',
      NAME:item.TRUE_NAME || '',
      NATION_NAME: item.NATION_NAME || '',
    
    }));
  },[])

  const csvData =  convertDataToCSV(searchResult.data);

  return (
    <main className="mb-7">
      {
      searchResult.data?.length===0 ? 
      <div>
      <section className="flex justify-between mb-10 mx-8">
      <h5 className="text-[#111111] text-lg">
        <span className="text-[#0198FF]">{searchResult.total} matches for </span>
      {searchKey}
      </h5>

    </section>
    <div className={'flex justify-center items-center h-[200px]'}>
      No Result
    </div>
    </div>
 :
      searchValid ?  <div role="status" className={'py-20 flex justify-center items-center'} >
      <svg aria-hidden="true" className="w-12 h-12  text-gray-200 animate-spin dark:text-gray-600 fill-blue-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
  </div> : (
        <>
          <section className="flex justify-between mb-10 mx-8">
            <h5 className="text-[#111111] text-lg">
              <span className="text-[#0198FF]">{searchResult.total} matches for </span>
            {searchKey}
            </h5>
            {isClient && <CSVLink data={csvData} filename={'search_results.csv'} className="flex gap-[5px] px-2.5 py-1.5 border border-solid border-[#0198ff] rounded-20 bg-blue-rgba hover:bg-[#CCEAFF]">
              <p className="text-[#0198FF] text-xs">Download Results</p>
              <Image src={download} alt="" />
            </CSVLink>}
          </section>
          <div className="max-w-1320 w-full mx-auto bg-white rounded-20 overflow-hidden">
            <table className="w-full h-full">
              <colgroup>
                <col width="25%" />
                <col width="33%" />
                <col width="50%" />
              </colgroup>
              <thead className="border-gray-200 border-b-[1px]">
                <tr className="text-[14px] text-gray-600 h-11">
                  <th className="text-left pl-8">QR Code</th>
                  <th className="text-left">Name</th>
                  <th className=" text-left">Countries</th>
                  {/* <th className="text-left">Datasets</th> */}
                  {/* <th className="px-8">Match</th> */}
                </tr>
              </thead>
              <tbody>
                {searchResult?.data.map((result:{ WE_CD:number;
    TRUE_NAME:string | null;
    NATION_CODE:string | null;
    NATION_NAME:string | null;}, i:number) => (
                  <Item data={result} key={i} />
                ))}
              </tbody>
            </table>
            <Pagination
              total={searchResult.total}
              page={state.businessPage}
              setPage={(page) => dispatch({ type: 'SET_BUSINESS_PAGE', payload: page })}
              views={state.businessViews}
            />
          </div>
        </>
      )}
    </main>
  );
};

export default Main;
