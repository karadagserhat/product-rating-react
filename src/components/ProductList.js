import Product from './Product';

const ProductList = ({ products, setProducts, filter }) => {
  if (products.length === 0)
    return (
      <p className="message">
        No products for this category yet! Create the first one ✌️
      </p>
    );

  return (
    <section>
      <ul className="products-list">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            setProducts={setProducts}
          />
        ))}
      </ul>
      <p>There are {products.length} products in the database. Add your own!</p>
    </section>
  );
};
export default ProductList;
