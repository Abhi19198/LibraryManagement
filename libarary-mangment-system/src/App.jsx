import { useState } from 'react';
import AboutSection from './components/AboutSection';
import AudienceSection from './components/AudienceSection';
import BenefitsSection from './components/BenefitsSection';
import FeaturesSection from './components/FeaturesSection';
import FooterSection from './components/FooterSection';
import HeroSection from './components/HeroSection';
import HowItWorksSection from './components/HowItWorksSection';
import StatsSection from './components/StatsSection';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';

function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'login' | 'dashboard'

  const handleGetStarted = () => {
    setCurrentView('login');
  };

  const handleLogin = () => {
    setCurrentView('dashboard');
  };

  const handleBack = () => {
    if (currentView === 'dashboard') {
      setCurrentView('login');
    } else if (currentView === 'login') {
      setCurrentView('landing');
    }
  };

  // Landing Page
  if (currentView === 'landing') {
    return (
      <div className="app">
        <HeroSection onGetStarted={handleGetStarted} />
        <main>
          <AboutSection />
          <FeaturesSection />
          <HowItWorksSection />
          <BenefitsSection />
          <StatsSection />
          <AudienceSection />
        </main>
        <FooterSection />
      </div>
    );
  }

  // Login Page
  if (currentView === 'login') {
    return <LoginPage onLogin={handleLogin} onBack={handleBack} />;
  }

  // Dashboard (Main Page)
  return <MainPage onBack={handleBack} />;
}

export default App;