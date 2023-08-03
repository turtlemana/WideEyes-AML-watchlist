import React, { createContext, useContext, ReactNode,Dispatch, SetStateAction, useState } from 'react';

export type State = {
  searchOption : string;

  page: number;
  isQrSearchClicked: boolean;
  isNameSearchClicked: boolean;

  isBusinessQrSearchClicked:boolean;
  isBusinessNameSearchClicked:boolean;

  views: number;
  qrCode: string;
  name: string;
  nation: string;

  businessPage:number;
  businessViews: number;
  businessQrCode: string;
  businessName: string;
  businessNation: string;


  dataset: string;
  birth: string;
  birthStart:string; 
  birthEnd:string;
};

export type Action = 

| { type: 'SET_SEARCH_OPTION', payload: string }

  | { type: 'SET_PAGE', payload: number }
  | { type: 'SET_QR_SEARCH_CLICKED', payload: boolean }
  | { type: 'SET_NAME_SEARCH_CLICKED', payload: boolean }

  | { type: 'SET_BUSINESS_PAGE', payload: number }
  | { type: 'SET_BUSINESS_QR_SEARCH_CLICKED', payload: boolean }
  | { type: 'SET_BUSINESS_NAME_SEARCH_CLICKED', payload: boolean }
 
  | { type: 'SET_VIEWS', payload: number }
  | { type: 'SET_QR_CODE', payload: string }
  | { type: 'SET_NAME', payload: string }
  | { type: 'SET_NATION', payload: string }

  | { type: 'SET_BUSINESS_VIEWS', payload: number }
  | { type: 'SET_BUSINESS_QR_CODE', payload: string }
  | { type: 'SET_BUSINESS_NAME', payload: string }
  | { type: 'SET_BUSINESS_NATION', payload: string }

  | { type: 'SET_DATASET', payload: string }
  | { type: 'SET_BIRTH', payload: string }
  | { type: 'SET_BIRTH_START', payload: string }
  | { type: 'SET_BIRTH_END', payload: string }
  | { type: 'RESET_VALUE'};
  ;

type SearchContextType = {
  state: State;
  dispatch: Dispatch<Action>;
};

type SearchStateProviderProps = {
    children: ReactNode;
  };
  

export const initialState: State = {
    searchOption:"individual",
  page: 1,
  isQrSearchClicked: false,
  isNameSearchClicked: false,

  businessPage:1,
  isBusinessQrSearchClicked: false,
  isBusinessNameSearchClicked: false,

  views: 20,
  qrCode: '',
  name: '',
  nation: '',

  businessViews: 20,
  businessQrCode: '',
  businessName: '',
  businessNation: '',

  dataset: '',
  birth: '',
  birthStart:'',
  birthEnd:''
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

const searchReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_SEARCH_OPTION':
      return { ...state, searchOption: action.payload };
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    case 'SET_QR_SEARCH_CLICKED':
      return { ...state, isQrSearchClicked: action.payload };
    case 'SET_NAME_SEARCH_CLICKED':
    return { ...state, isNameSearchClicked: action.payload };

    case 'SET_BUSINESS_PAGE':
      return { ...state, businessPage: action.payload };
    case 'SET_BUSINESS_QR_SEARCH_CLICKED':
      return { ...state, isBusinessQrSearchClicked: action.payload };
    case 'SET_BUSINESS_NAME_SEARCH_CLICKED':
      return { ...state, isBusinessNameSearchClicked: action.payload };

    case 'SET_VIEWS':
      return { ...state, views: action.payload };
    case 'SET_QR_CODE':
      return { ...state, qrCode: action.payload };
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_NATION':
      return { ...state, nation: action.payload };

    case 'SET_BUSINESS_VIEWS':
      return { ...state, businessViews: action.payload };
    case 'SET_BUSINESS_QR_CODE':
      return { ...state, businessQrCode: action.payload };
    case 'SET_BUSINESS_NAME':
      return { ...state, businessName: action.payload };
    case 'SET_BUSINESS_NATION':
      return { ...state, businessNation: action.payload };
   
      case 'SET_DATASET':
      return { ...state, dataset: action.payload };
    case 'SET_BIRTH':
      return { ...state, birth: action.payload };
    case 'SET_BIRTH_START':
      return { ...state, birthStart: action.payload };
    case 'SET_BIRTH_END':
      return { ...state, birthEnd: action.payload };
    case 'RESET_VALUE':
        return initialState;  
    default:
      return state;
  }
};

export const SearchProvider = ({ children }:SearchStateProviderProps) => {
  const [state, dispatch] = React.useReducer(searchReducer, initialState);

  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
