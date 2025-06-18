# DevSocial – Full Stack Social Network

DevSocial is a fully functional and scalable social media platform built from scratch with a modern full stack architecture. Designed to showcase strong backend architecture, frontend development, and DevOps practices, this project represents a key milestone in my transition from a previous career in the public sector into the world of professional software development.

Built to simulate a real-world application, ready to be showcased in a professional portfolio.

---

## Main Features

### Back-End (Python + Django REST)
- JWT authentication with refresh token rotation
- Custom User model with public/private profile modes
- Follow/unfollow system
- Post creation with text and image
- Like/dislike system
- Real-time-like notifications system
- Private/public API endpoints
- User suggestion carousel
- Comment system (soon)

### Front-End (React + TypeScript)
- Modular UI with styled-components
- Responsive design inspired by GitHub/Dark IDE aesthetics
- Home feed with post box, likes, and user suggestions
- Public profile pages with dynamic routing
- Full integration with REST API
- Environment-based API configuration (`VITE_API_URL`)

---

## DevOps and Architecture

- Dockerized development and production setup (`Dockerfile`, `docker-compose.yml`)
- CI with GitHub Actions:
  - Automated tests with Pytest
  - Build status validation
- Deployment:
  - Backend hosted on Render
  - Frontend hosted on Vercel
- PostgreSQL database
- Webhook-enabled for auto-deploy

---

## Live Demo

| Component    | URL                                                |
|--------------|-----------------------------------------------------|
| Frontend     | https://devsocial.vercel.app                        |
| Backend API  | https://devsocial-api.onrender.com                  |

---

## Project Structure

devsocial/
├── backend/ # Django REST Framework
├── frontend/ # React + TypeScript + Vite
├── .github/workflows/ # CI/CD pipelines
├── docker-compose.yml
├── README.md # This file


---

## Running Locally

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

Frontend

cd frontend
npm install
npm run dev

Docker (Full Stack)

docker compose up --build

Running Tests

cd backend
pytest

GitHub Actions automatically runs tests and lint checks on every push.
About Me

I'm Bruno Alves — a former military professional now fully focused on a career in technology. This project reflects my dedication to mastering modern web development, combining back-end engineering, front-end design, and DevOps automation.

Currently studying Full Stack Python at EBAC and Systems Analysis at Estácio de Sá University.

LinkedIn: https://www.linkedin.com/in/brunoalves-tech/
Screenshots

Add screenshots here to illustrate the user interface and key functionalities.
License

This project is for educational and portfolio purposes only.