import bitcoin from "assets/icons/main/bitcoin.png";
import chart from "assets/icons/main/chart.svg";
import news from "assets/icons/main/news.png";
import { Colors } from "types/main";

export const COLORS: Colors = {
  Low: "bg-[#E6F5F0] text-[#34BB7A]",
  Moderate: "bg-[#FEF5E6] text-[#F99F01]",
  High: "bg-[#FFE4D9] text-[#FF4D00]",
  VeryHigh: "bg-[#FAE8E8] text-[#DF1525]",
};

export const RISKS = [
  { id: 0, country: "United States", coin: 2 },
  { id: 1, country: "Korea", coin: 211 },
  { id: 2, country: "Japan", coin: 2302 },
  { id: 3, country: "China", coin: 1232 },
  { id: 4, country: "Australia", coin: 662 },
  { id: 5, country: "Belgium", coin: 2352 },
  { id: 6, country: "Britain", coin: 1235722 },
  { id: 7, country: "Canada", coin: 1232 },
  { id: 8, country: "India", coin: 22 },
  { id: 9, country: "Germany", coin: 0 },
  { id: 10, country: "France", coin: 12 },
  { id: 11, country: "Egypt", coin: 112352 },
  { id: 12, country: "Mexico", coin: 1232 },
];

export const RISK_MENUS = [
  { id: 0, title: "Bitcoin" },
  { id: 1, title: "Ethereum" },
  { id: 2, title: "Stock" },
  { id: 3, title: "Index" },
];

export const TRENDING_MENUS = [
  { id: 0, title: "All" },
  { id: 1, title: "Crypto" },
  { id: 2, title: "Stock" },
];

export const TRENDING_LIST = [
  {
    id: 0,
    image: bitcoin,
    name: "Bitcoin",
    subName: "BTC-USD",
    risk: "Low",
    maximumLoss: 50,
    chartImage: chart,
    weatherIcon: "slightlyFalling",
    weather: "Slightly Falling",
  },
  {
    id: 1,
    image: bitcoin,
    name: "Bitcoin",
    subName: "BTC-USD",
    risk: "Moderate",
    maximumLoss: 60.5,
    chartImage: chart,
    weatherIcon: "sharplyFalling",
    weather: "Sharply Falling",
  },
  {
    id: 2,
    image: bitcoin,
    name: "Bitcoin",
    subName: "BTC-USD",
    risk: "High",
    maximumLoss: 70.5,
    chartImage: chart,
    weatherIcon: "maintaining",
    weather: "Maintaining",
  },
  {
    id: 3,
    image: bitcoin,
    name: "Bitcoin",
    subName: "BTC-USD",
    risk: "VeryHigh",
    maximumLoss: 80.8,
    chartImage: chart,
    weatherIcon: "slightlyRising",
    weather: "Slightly Rising",
  },
  {
    id: 4,
    image: bitcoin,
    name: "Bitcoin",
    subName: "BTC-USD",
    risk: "Low",
    maximumLoss: 60,
    chartImage: chart,
    weatherIcon: "sharplyRising",
    weather: "Sharply Rising",
  },
  {
    id: 5,
    image: bitcoin,
    name: "Bitcoin",
    subName: "BTC-USD",
    risk: "VeryHigh",
    maximumLoss: 90.1,
    chartImage: chart,
    weatherIcon: "extremelyRising",
    weather: "Extremely Rising",
  },
  {
    id: 6,
    image: bitcoin,
    name: "Bitcoin",
    subName: "BTC-USD",
    risk: "High",
    maximumLoss: 79.2,
    chartImage: chart,
    weatherIcon: "explosion",
    weather: "Risk of Explosion",
  },
  {
    id: 7,
    image: bitcoin,
    name: "Bitcoin",
    subName: "BTC-USD",
    risk: "Moderate",
    maximumLoss: 90.6,
    chartImage: chart,
    weatherIcon: "explosion",
    weather: "Risk of Explosion",
  },
  {
    id: 8,
    image: bitcoin,
    name: "Bitcoin",
    subName: "BTC-USD",
    risk: "Low",
    maximumLoss: 48.3,
    chartImage: chart,
    weatherIcon: "slightlyFalling",
    weather: "Slightly Falling",
  },
  {
    id: 9,
    image: bitcoin,
    name: "Bitcoin",
    subName: "BTC-USD",
    risk: "Low",
    maximumLoss: 50,
    chartImage: chart,
    weatherIcon: "slightlyFalling",
    weather: "Slightly Falling",
  },
  {
    id: 10,
    image: bitcoin,
    name: "Bitcoin",
    subName: "BTC-USD",
    risk: "Moderate",
    maximumLoss: 60.5,
    chartImage: chart,
    weatherIcon: "sharplyFalling",
    weather: "Sharply Falling",
  },
  {
    id: 11,
    image: bitcoin,
    name: "Bitcoin",
    subName: "BTC-USD",
    risk: "Moderate",
    maximumLoss: 60.5,
    chartImage: chart,
    weatherIcon: "sharplyFalling",
    weather: "Sharply Falling",
  },
  {
    id: 12,
    image: bitcoin,
    name: "Bitcoin",
    subName: "BTC-USD",
    risk: "High",
    maximumLoss: 70.5,
    chartImage: chart,
    weatherIcon: "maintaining",
    weather: "Maintaining",
  },
  {
    id: 13,
    image: bitcoin,
    name: "Bitcoin",
    subName: "BTC-USD",
    risk: "VeryHigh",
    maximumLoss: 80.8,
    chartImage: chart,
    weatherIcon: "slightlyRising",
    weather: "Slightly Rising",
  },
  {
    id: 14,
    image: bitcoin,
    name: "Bitcoin",
    subName: "BTC-USD",
    risk: "Low",
    maximumLoss: 60,
    chartImage: chart,
    weatherIcon: "sharplyRising",
    weather: "Sharply Rising",
  },
  {
    id: 15,
    image: bitcoin,
    name: "Bitcoin",
    subName: "BTC-USD",
    risk: "VeryHigh",
    maximumLoss: 90.1,
    chartImage: chart,
    weatherIcon: "extremelyRising",
    weather: "Extremely Rising",
  },
  {
    id: 16,
    image: bitcoin,
    name: "Bitcoin",
    subName: "BTC-USD",
    risk: "High",
    maximumLoss: 79.2,
    chartImage: chart,
    weatherIcon: "explosion",
    weather: "Risk of Explosion",
  },
  {
    id: 17,
    image: bitcoin,
    name: "Bitcoin",
    subName: "BTC-USD",
    risk: "Moderate",
    maximumLoss: 90.6,
    chartImage: chart,
    weatherIcon: "explosion",
    weather: "Risk of Explosion",
  },
  {
    id: 18,
    image: bitcoin,
    name: "Bitcoin",
    subName: "BTC-USD",
    risk: "Low",
    maximumLoss: 48.3,
    chartImage: chart,
    weatherIcon: "slightlyFalling",
    weather: "Slightly Falling",
  },
];

export const RISK_LEVELS = [
  { id: 0, title: "VeryHigh" },
  { id: 1, title: "High" },
  { id: 2, title: "Moderate" },
  { id: 3, title: "Low" },
];

export const NEWS = [
  {
    id: 0,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 1,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 2,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 3,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 4,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 5,
    title:
      "2[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 6,
    title:
      "2[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 7,
    title:
      "2[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 8,
    title:
      "2[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 9,
    title:
      "2[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 10,
    title:
      "3[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 11,
    title:
      "3[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 12,
    title:
      "3[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 13,
    title:
      "3[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 14,
    title:
      "3[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 15,
    title:
      "4[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 16,
    title:
      "4[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 17,
    title:
      "4[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 18,
    title:
      "4[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 19,
    title:
      "4[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 20,
    title:
      "5[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 21,
    title:
      "5[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 22,
    title:
      "5[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 23,
    title:
      "5[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 24,
    title:
      "5[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 25,
    title:
      "6[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 26,
    title:
      "6[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 27,
    title:
      "6[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 28,
    title:
      "6[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 29,
    title:
      "6[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 30,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 31,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 32,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 33,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 34,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 35,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 36,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 37,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 38,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 39,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 40,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 41,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 42,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 43,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 44,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 45,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 46,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 47,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 48,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 49,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 50,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 11,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 51,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 52,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 53,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 54,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 55,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 56,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 57,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 58,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 59,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 60,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 61,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 62,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 63,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 64,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 65,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 66,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 67,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 68,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 69,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 70,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
  {
    id: 71,
    title:
      "[News] Elon Musk Reaffirms Offer to Eat Happy Meal on TV if McDonald's Accepts Dogecoin",
    subTitle: "McDonald's Accepts Dogecoin",
    date: "2023.01.05",
    image: news,
  },
];
