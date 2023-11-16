import { useState } from 'react';
import { isValidHttpUrl } from '../utils/isValidHttpUrl';
import { CATEGORIES } from '../data';
import supabase from '../supabase';

const NewProductForm = ({ setProducts, setShowForm }) => {
  const [text, setText] = useState('');
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;

  async function handleSubmit(e) {
    // 1. Prevent browser reload
    e.preventDefault();

    // 2. Check if data is valid. If so, create a new product
    if (text && source && category && textLength <= 50) {
      // 3. Create a new product object
      // const newProduct = {
      //   id: Math.round(Math.random() * 10000000),
      //   text,
      //   source,
      //   category,
      //   votesGood: 0,
      //   votesAmazing: 0,
      //   votesBad: 0,
      //   createdIn: new Date().getFullYear(),
      // };

      // 3. Upload product to Supabase and receive the new product object
      setIsUploading(true);
      const { data: newProduct, error } = await supabase
        .from('products')
        .insert([{ text, source, category }])
        .select();
      setIsUploading(false);

      // 4. Add the new product to the UI: add the product to state
      if (!error) setProducts((products) => [newProduct[0], ...products]);

      // 5. Reset input fields
      setText('');
      setSource('');
      setCategory('');

      // 6. Close the form
      setShowForm(false);
    }
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share a product..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isUploading}
      />
      <span className="text-span">{50 - textLength}</span>
      <input
        value={source}
        type="text"
        placeholder="https://example.com..."
        // defaultValue="https://example.com"
        className="source-input"
        onChange={(e) => setSource(e.target.value)}
        disabled={isUploading}
      />
      <span className="source-span">Source</span>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={isUploading}
      >
        <option value="">Choose category:</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large" disabled={isUploading}>
        Post
      </button>
    </form>
  );
};
export default NewProductForm;
