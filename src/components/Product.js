import { useState } from 'react';
import { CATEGORIES } from '../data';
import supabase from '../supabase';

const Product = ({ product, setProducts }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const isTerrible =
    product.votesGood + product.votesAmazing < product.votesBad;

  async function handleVote(columnName) {
    setIsUpdating(true);
    const { data: updatedProduct, error } = await supabase
      .from('products')
      .update({ [columnName]: product[columnName] + 1 })
      .eq('id', product.id)
      .select();
    setIsUpdating(false);

    if (!error)
      setProducts((products) =>
        products.map((f) => (f.id === product.id ? updatedProduct[0] : f))
      );
  }

  return (
    <li className="product">
      <p>
        {isTerrible ? <span className="disputed">[⛔️ Not Liked]</span> : null}
        {product.text}
        <a className="source" href={product.source} target="_blank">
          (Source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: CATEGORIES.find(
            (cat) => cat.name === product.category
          ).color,
        }}
      >
        {product.category}
      </span>
      <div className="vote-buttons">
        <button onClick={() => handleVote('votesGood')} disabled={isUpdating}>
          👍 {product.votesGood}
        </button>
        <button
          onClick={() => handleVote('votesAmazing')}
          disabled={isUpdating}
        >
          🤯 {product.votesAmazing}
        </button>
        <button onClick={() => handleVote('votesBad')} disabled={isUpdating}>
          ⛔️ {product.votesBad}
        </button>
      </div>
    </li>
  );
};

export default Product;
