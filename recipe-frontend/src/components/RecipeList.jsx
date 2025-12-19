import { useState, useEffect } from 'react';
import axios from 'axios';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // تابعی برای دریافت داده‌ها از API
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:8001/recipes/');
        setRecipes(response.data);
      } catch (err) {
        setError('Failed to fetch recipes');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []); // [] یعنی این افکت فقط یک بار بعد از اولین رندر اجرا می‌شود

  if (loading) return <div>Loading recipes...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h1>Recipe List</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <a href={`/recipes/${recipe.id}`}>{recipe.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeList;
