import { StaticImageData } from "next/image";

export interface AML {
  qr: string;
  image: StaticImageData;
  birth: string;
  countries: string;
  match: string;
  dataSet: string[];
  id: number;
  name: string;
}

export interface SANCTIONS {
  types: { id: number; title: string }[];
  measures: { id: number; title: string }[];
  events: {
    id: number;
    title: string;
    date: string;
    evidence: {
      id: number;
      title: string;
      captured: string;
      published: string;
      source: string;
      datasets: string[];
      summary: string;
      score: string;
    }[];
  }[];
}
export interface RISKS {
  id: number;
  title: string;
  content: string;
  event: {
    id: number;
    title: string;
    date: string;
    evidence: {
      id: number;
      title: string;
      captured: string;
      source: string;
      datasets: string[];
      summary: string;
      score: string;
    }[];
  }[];
}
export interface OTHERS {
  id: number;
  event: {
    id: number;
    title: string;
    date: string;
    evidence: {
      id: number;
      title: string;
      captured: string;
      source: string;
      datasets: string[];
      summary: string;
      score: string;
    }[];
    position: {
      id: number;
      title: string;
      content: string;
      date: string;
    }[];
  }[];
}

export interface EVIDENCE {
  id: number;
  title: string;
  evidence: {
    id: number;
    captured: string;
    published: string;
    title: string;
    source: string;
    datasets: string[];
    summary: string;
    score: string;
  };
}
