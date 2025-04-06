import { useEffect, useState } from "react";
import "./styles.css";

const ProductCart = ({ image, title }) => {
  return (
    <div className="product-cart">
      <img className="product-image" src={image} alt={title} />
      <span>{title}</span>
    </div>
  );
};

const PAGE_SIZE = 10;
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
      <div>
        <button disabled={currentPage === 0} onClick={() => handlePrevPage()}>
          ◀️
        </button>
        {[...Array(noOfPages).keys()].map((n) => (
          <button
            //className="page-number  active"
            //className=` "page-number" {n==currentPage? "active" : ""}`
            className={`page-number ${n == currentPage ? "active" : ""}`}
            key={n}
            onClick={() => handlePageChange(n)}
          >
            {n}
          </button>
        ))}
        <button
          disabled={currentPage == noOfPages - 1}
          onClick={() => handleNextPage()}
        >
          ▶️
        </button>
      </div>
      <div className="products-container">
        {products.slice(start, end).map((p) => (
          <ProductCart key={p.id} image={p.thumbnail} title={p.title} />
        ))}
      </div>
    </div>
  );
}
