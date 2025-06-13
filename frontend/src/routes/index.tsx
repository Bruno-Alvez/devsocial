import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/HomePage';
import Login from '../pages/LoginPage';
import Register from '../pages/RegisterPage';
import CreatePost from '../pages/CreatePost';
import MyPosts from '../pages/MyPost';
import Profile from '../pages/ProfilePage';
import PublicProfile from '../pages/ProfilePage/PublicProfilePage';
import ProtectedRoute from '../components/ProtectedRoute';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post/new"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-posts"
          element={
            <ProtectedRoute>
              <MyPosts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="/users/:username" element={<PublicProfile />} />
      </Routes>
    </BrowserRouter>
  );
}
