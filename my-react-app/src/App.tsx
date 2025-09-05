import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import Navbar from './components/Navbar';
import Home from './pages/Home.tsx';
import QuestionnairePage from './pages/Questionnaire.tsx';
import LoginPage from './pages/Login.tsx';
import RegisterPage from './pages/Register.tsx';
import LearningHubPage from './pages/LearningHub.tsx';
import ChatbotPage from './pages/Chatbot.tsx';
import Dashboard from './pages/Dashboard.tsx';
import ArchitectureComparison from './pages/ArchitectureComparison.tsx';

function App() {
  console.log('App component rendering...');
  
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/questionnaire" element={<QuestionnairePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/learning" element={<LearningHubPage />} />
              <Route path="/chatbot" element={<ChatbotPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/comparison" element={<ArchitectureComparison />} />
            </Routes>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;