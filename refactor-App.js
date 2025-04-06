import { useEffect, useState } from "react";
import { PAGE_SIZE } from "./constant.js";
import ProductCard from "./components/ProductCard";
import Pagination from "./components/Pagination";
import "./styles.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchData = async () => {
    const data = await fetch("https://dummyjson.com/products?limit=500");
    const json = await data.json();
    console.log(`list of Products - ${json}`);
    setProducts(json.products);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalProducts = products.length;
  const noOfPages = Math.ceil(totalProducts / PAGE_SIZE);

  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const handlePageChange = (selectedPageNumber) => {
    setCurrentPage(selectedPageNumber);
  };

  const handlePrevPage = () => {
    setCurrentPage((currentPageNumer) => currentPageNumer - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((currentPageNumer) => currentPageNumer + 1);
  };

  return !products.length ? (
    <h1>No Product Found</h1>
  ) : (
    <div className="App">
      <h1>Pagination</h1>
      <Pagination
        currentPage={currentPage}
        noOfPages={noOfPages}
        handlePageChange={handlePageChange}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
      />
      <div className="products-container">
        {products.slice(start, end).map((p) => (
          <ProductCard key={p.id} image={p.thumbnail} title={p.title} />
        ))}
      </div>
    </div>
  );
}
