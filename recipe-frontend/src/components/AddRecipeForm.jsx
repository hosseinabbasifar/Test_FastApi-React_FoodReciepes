import { useState } from 'react';
import axios from 'axios';

function AddRecipeForm() {
  const [formData, setFormData] = useState({
    label: '',
    source: '',
    url: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // جلوگیری از رفرش شدن صفحه
    try {
      await axios.post('http://localhost:8001/recipes/', formData);
      alert('Recipe added successfully!');
      setFormData({ label: '', source: '', url: '' }); // خالی کردن فرم
    } catch (err) {
      alert('Failed to add recipe');
      console.error(err);
    }
    window.location.href = '/recipes';
  };

  return (
    <div>
      <h1>Add New Recipe</h1>
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
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
}

export default AddRecipeForm;
