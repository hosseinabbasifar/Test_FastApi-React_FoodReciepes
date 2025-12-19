import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RecipeList from './Components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import AddRecipeForm from './components/AddRecipeForm';
import './App.css';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/add-recipe">Add Recipe</Link>
          </li>
          <li>
            <Link to="http://127.0.0.1:8001/docs">Api Docs</Link>
          </li>
        </ul>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipes/:recipeId" element={<RecipeDetail />} />
          <Route path="/add-recipe" element={<AddRecipeForm />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
