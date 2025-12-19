import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import EditRecipeForm from './EditRecipeForm';
import axios from 'axios';

function RecipeDetail() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // برای نمایش/مخفی کردن فرم ویرایش

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8001/recipes/${recipeId}`
        );
        setRecipe(response.data);
      } catch (err) {
        setError('Failed to fetch recipe details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  // تابع برای حذف دستور
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        await axios.delete(`http://localhost:8001/recipes/${recipeId}`);
        alert('Recipe deleted successfully!');
        // بعد از حذف، کاربر را به صفحه‌ی لیست هدایت می‌کنیم
        window.location.href = '/recipes';
      } catch (err) {
        alert('Failed to delete recipe');
        console.error(err);
      }
    }
  };

  if (loading) return <div>Loading recipe...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!recipe) return <div>Recipe not found.</div>;

  // اگر در حالت ویرایش هستیم، فرم را نمایش بده
  if (isEditing) {
    return (
      <EditRecipeForm
        recipe={recipe}
        onEditComplete={() => setIsEditing(false)} // بعد از ویرایش، حالت ویرایش را خاموش کن
      />
    );
  }

  // حالت نمایش عادی
  return (
    <div>
      <h1>{recipe.label}</h1>
      <p>
        <strong>Source:</strong> {recipe.source}
      </p>
      <p>
        <strong>URL:</strong>
        <a href={recipe.url} target="_blank" rel="noopener noreferrer">
          {recipe.url}
        </a>
      </p>
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={() => setIsEditing(true)}
          style={{ marginRight: '10px' }}
        >
          Edit
        </button>
        <button onClick={handleDelete} style={{ color: 'red' }}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default RecipeDetail;
