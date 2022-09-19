import { useState, useEffect, createContext } from "react";
import axios from "axios";
const NewsContext = createContext();

const NewsProvider = ({ children }) => {
  // general as default
  const [category, setCategory] = useState("general");
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalNews, setTotalNews] = useState(0);

  // callin the API every time category changes
  useEffect(() => {
    const getNews = async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${
        import.meta.env.VITE_API_KEY
      }`;
      const { data } = await axios(url);
      // We update the state with the API data
      setNews(data.articles);
      setTotalNews(data.totalResults);
      // If category changes, get us back to page number 1
      setPage(1);
    };
    getNews();
  }, [category]);
  // adjusting the page everytime page changes
  useEffect(() => {
    const getNews = async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=us&page=${page}&category=${category}&apiKey=${
        import.meta.env.VITE_API_KEY
      }`;
      const { data } = await axios(url);
      setNews(data.articles);
      setTotalNews(data.totalResults);
    };
    getNews();
  }, [page]);
  // handles
  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };
  const handleChangePage = (e, valor) => {
    setPage(valor);
  };
  return (
    <NewsContext.Provider
      value={{
        category,
        handleChangeCategory,
        news,
        totalNews,
        handleChangePage,
        page,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};
export { NewsProvider };
export default NewsContext;
