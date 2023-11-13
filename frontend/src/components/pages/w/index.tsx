
import Top from "components/templates/aml/Top";
import Main from "components/templates/aml/Main";
import BusinessMain from "components/templates/aml/BusinessMain";
import useSWR from 'swr';
import axios from 'axios';
import { useSearch } from "contexts/SearchStateContext";
import {State} from "contexts/SearchStateContext";

const fetcher = (url:string) => axios.get(url).then((res) => res.data)

const AML = () => {
  const {state} :{state:State}=useSearch();

  const buildQrSearchURL = (state: State) => {
    if (state.qrCode && state.isQrSearchClicked) {
      return `http://localhost:7878/api/qrSearch?&search=${state.qrCode}&page=${state.page}&view=${state.views}`
    }
    return null;
  }
  
  const buildMainSearchURL = (state: State) => {
    if (state.name && state.isNameSearchClicked) {
      return `http://localhost:7878/api/mainSearch?&search=${state.name}&page=${state.page}&view=${state.views}&birthdate=${state.birth}&birthdateStart=${state.birthStart}&birthdateEnd=${state.birthEnd}&nations=${state.nation}&datasets=${state.dataset}`
    }
    return null;
  }

  const buildBusinessQrSearchURL = (state: State) => {

    if (state.businessQrCode && state.isBusinessQrSearchClicked) {
      return `http://localhost:7878/api/businessQrSearch?&search=${state.businessQrCode}&page=${state.businessPage}&view=${state.businessViews}`
    }
    return null;
  }
  
  const buildBusinessMainSearchURL = (state: State) => {

    if (state.businessName && state.isBusinessNameSearchClicked) {
      return `http://localhost:7878/api/businessMainSearch?&search=${state.businessName}&page=${state.businessPage}&view=${state.businessViews}&nations=${state.businessNation}`
    }
    return null;
  }

  const { data:qrSearchResult, isValidating:qrSearchValid, mutate:qrSearchMutate } = useSWR(
    buildQrSearchURL(state),
    fetcher,
    {
      dedupingInterval: 60000, 
      revalidateOnFocus: false 
    }
  );
  
  const { data:mainSearchResult, isValidating:mainSearchValid, mutate:mainSearchMutate } = useSWR(
    buildMainSearchURL(state),
    fetcher,
    {
      dedupingInterval: 60000,
      revalidateOnFocus: false 
    }
  );
  const { data:businessQrSearchResult, isValidating:businessQrSearchValid, mutate:businessQrSearchMutate } = useSWR(
    buildBusinessQrSearchURL(state),
    fetcher,
    {
      dedupingInterval: 60000, 
      revalidateOnFocus: false 
    }
  );
  
  const { data:businessMainSearchResult, isValidating:businessMainSearchValid, mutate:businessMainSearchMutate } = useSWR(
    buildBusinessMainSearchURL(state),
    fetcher,
    {
      dedupingInterval: 60000,
      revalidateOnFocus: false 
    }
  );

  return (
    <main className="px-5 my-[42px] min-w-[1280px]">
      <div className="max-w-1320 mx-auto rounded-20 py-8 bg-white">
        <h1 className="ml-8 text-[30px] text-[#111111] mb-8">Wide Eyes Watchlist</h1>
        <Top  />
        {qrSearchResult&&!qrSearchValid ? 
        <Main searchValid={qrSearchValid} searchResult={qrSearchResult} searchKey={state.qrCode} /> : 
      (mainSearchResult&&!mainSearchValid ? 
        <Main searchValid={mainSearchValid} searchResult={mainSearchResult} searchKey={state.name} /> : 
     businessQrSearchResult && ! businessQrSearchValid ?
     <BusinessMain searchValid={businessQrSearchValid} searchResult={businessQrSearchResult} searchKey={state.businessQrCode}/> :
     businessMainSearchResult && ! businessMainSearchValid ?
     <BusinessMain searchValid={businessMainSearchValid} searchResult={businessMainSearchResult} searchKey={state.businessName}/> :
     
        qrSearchValid || mainSearchValid ||businessMainSearchValid || businessQrSearchValid ? 
      <div role="status" className={'py-20 flex justify-center items-center'} >
      <svg aria-hidden="true" className="w-12 h-12  text-gray-200 animate-spin dark:text-gray-600 fill-blue-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
  </div> : 
      null)}
      </div>
    </main>
  );
};

export default AML;
