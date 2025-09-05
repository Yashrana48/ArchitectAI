import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useUser();

  const handleLogout = () => {
    logout();
    // Redirect to home page after logout
    window.location.href = '/';
  };

  return (
    <nav className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-slate-200 px-6 py-4 fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="text-2xl">🏗️</div>
          <div className="font-bold text-xl text-slate-800">ArchitectAI</div>
        </Link>
        
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
            Home
          </Link>
          <Link to="/questionnaire" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
            Get Recommendations
          </Link>
          <Link to="/comparison" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
            Comparison
          </Link>
          <Link to="/learning" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
            Learning Hub
          </Link>
          {isAuthenticated && (
            <Link to="/dashboard" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
              Dashboard
            </Link>
          )}
          <Link to="/chatbot" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
            AI Chat
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-medium text-sm">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-slate-700 font-medium text-sm hidden sm:block">
                  {user?.name}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-slate-600 hover:text-red-600 font-medium transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;