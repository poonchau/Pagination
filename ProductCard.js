export default ProductCard = ({ image, title }) => {
  return (
    <div className="product-cart">
      <img className="product-image" src={image} alt={title} />
      <span>{title}</span>
    </div>
  );
};
