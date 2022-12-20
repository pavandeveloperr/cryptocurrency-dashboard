import { createContext, useLayoutEffect, useState } from "react";

//create context object
export const CryptoContext = createContext({});

//create the provider component
export const CryptoProvider = ({ children }) => {
  const [cryptoData, setCryptoData] = useState();
  const [currency, setCurrency] = useState("usd");
  const [sortBy, setSortBy] = useState("market_cap_desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(350);
  const [perPage, setPerPage] = useState(7);
  const [searchData, setSearchData] = useState(); 
  const [coinSearch, setCoinSearch] = useState("");



  const getCryptoData = async () => {

    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/list`
      )
        .then((res) => res.json())
        .then((json) => json);
        // setTotalPages(data.length);
    } catch (error) {
      console.log(error);
    }
  



    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sortBy}&page=${page}&per_page=${perPage}`
      )
        .then((res) => res.json())
        .then((json) => json);
      // console.log(data);
      setCryptoData(data);
      // console.log(data.length)
    } catch (error) {
      console.log(error);
    }
  };

  
  const getSearchResult = async (query) => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${query}`
      )
        .then((res) => res.json())
        .then((json) => json);

      console.log(data);
      setSearchData(data.coins);
    } catch (error) {
      console.log(error);
    }
  };

  const resetFunction = () => {
    setPage(1);
    setCoinSearch("");
  };


  useLayoutEffect(() => {
    getCryptoData();
  }, [currency, sortBy, page, perPage, coinSearch]);

  return (
    <CryptoContext.Provider
      value={{
        cryptoData,
        currency,
        setCurrency,
        sortBy,
        setSortBy,
        page,
        setPage,
        totalPages,
        setPerPage,
        perPage,
        searchData,
        getSearchResult,
        setCoinSearch,
        setSearchData,
        resetFunction
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
