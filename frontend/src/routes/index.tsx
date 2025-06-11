import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/HomePage';
import Login  from '../pages/LoginPage';
import Register from '../pages/RegisterPage';
import CreatePost from '../pages/CreatePost';
import MyPosts from '../pages/MyPost';
import Profile from '../pages/ProfilePage'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-posts" element={<MyPosts />} />
        <Route path="/post/new" element={<CreatePost />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
