import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TodoPage from '../pages/TodoPage';

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<TodoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
