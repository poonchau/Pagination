export default Pagination = ({
  currentPage,
  noOfPages,
  handlePageChange,
  handleNextPage,
  handlePrevPage,
}) => {
  return (
    <div className="pagination-container">
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
  );
};
