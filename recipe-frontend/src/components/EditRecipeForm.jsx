import { useState } from 'react';
import axios from 'axios';

function EditRecipeForm({ recipe, onEditComplete }) {
  const [formData, setFormData] = useState({
    label: recipe.label || '',
    source: recipe.source || '',
    url: recipe.url || '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ارسال درخواست PUT برای به‌روزرسانی
      await axios.put(`http://localhost:8001/recipes/${recipe.id}`, formData);
      alert('Recipe updated successfully!');
      onEditComplete(); // به کامپوننت والد اطلاع بده که ویرایش تمام شد
      window.location.href = '/recipes';
    } catch (err) {
      setError('Failed to update recipe');
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Edit Recipe</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Label:</label>
          <input
            type="text"
            name="label"
            value={formData.label}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Source:</label>
          <input
            type="text"
            name="source"
            value={formData.source}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>URL:</label>
          <input
            type="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Recipe</button>
        <button
          type="button"
          onClick={onEditComplete}
          style={{ marginLeft: '10px' }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditRecipeForm;
