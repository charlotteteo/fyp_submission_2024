import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import LandingPage from './Pages/LandingPage/LandingPage';
import SignInPage from './Pages/SignInPage/SignInPage';
import SignUpPage from './Pages/SignUpPage/SignUpPage';
import DashboardPage from './Pages/DashboardPage/DashboardPage';
import OverallPage from './Pages/DashboardPage/OverallPage';
import SectoralExposurePage from './Pages/DashboardPage/SectoralExposurePage';
import DetailedPortfolio from './Pages/DashboardPage/DetailedPortfolio';
import ConstituentAnalysis from './Pages/DashboardPage/ConstituentAnalysis';
import WatchlistPage from './Pages/DashboardPage/WatchlistPage';
import AnalyticsPage from './Pages/DashboardPage/AnalyticsPage';
import RoboChatPage from './Pages/RoboChatPage/RoboChatPage';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import SettingsPage from './Pages/SettingsPage/SettingsPage';
import PortfolioExplorerPage from './Pages/PortfolioExplorerPage/PortfolioExplorerPage';
import PortfolioSimRec from './Pages/PortfolioExplorerPage/Tabs/PortfolioSimRec';
import NewsFeedPage from './Pages/NewsFeedPage/NewsFeedPage';
import PortfolioRecPage from './Pages/PortfolioExplorerPage/Tabs/PortfolioRecPage';
import PortfolioNovelRecPage from './Pages/PortfolioExplorerPage/PortfolioNovelRecPage';
import Main from './components/layout/Main';
import './App.less';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user data exists in localStorage to maintain logged-in state on page refresh
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
      setLoggedIn(true);
    }
    setLoading(false); // Data loading completed
  }, []);

  const handleLogin = (userData) => {
    setLoggedIn(true);
    setUserData(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserData(null);
    localStorage.removeItem('userData');
  };
  

const today = new Date();

// Format the date as 'YYYY-MM-DD'
const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

  if (loading) {
    return <div>Loading...</div>; // Render loading indicator
  }

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/sign-in" exact>
            <SignInPage onLogin={handleLogin} />
          </Route>
          <Route path="/sign-up" exact component={SignUpPage} />
          <Route path="/" exact component={LandingPage} /> 
        </Switch>
        <Main onLogout={handleLogout}>
        <Route path="/dashboard">
            {loggedIn ? (
                
                <DashboardPage>
                  <Switch>
                    <Route path="/dashboard/overall">
                      <OverallPage tickers={userData?.portfolio?.stocks} weights={userData?.portfolio?.weights} start_date={userData?.portfolio?.start_date[0]} end_date={formattedDate} initial_investment={userData?.portfolio?.initial_investment} />
                    </Route>
                    <Route path="/dashboard/SectoralExposure">
                      <SectoralExposurePage tickers={userData?.portfolio?.stocks} weights={userData?.portfolio?.weights} start_date={userData?.portfolio?.start_date[0]} end_date={formattedDate} initial_investment={userData?.portfolio?.initial_investment} />
                    </Route>
                    <Route path="/dashboard/watchlist" component={WatchlistPage} />
                    <Route path="/dashboard/analytics">
                      <AnalyticsPage tickers={userData?.portfolio?.stocks} weights={userData?.portfolio?.weights} start_date={userData?.portfolio?.start_date[0]} end_date={formattedDate} initial_investment={userData?.portfolio?.initial_investment} />
                    </Route>
                    <Route path="/dashboard/DetailedPortfolio">
                      <DetailedPortfolio tickers={userData?.portfolio?.stocks} weights={userData?.portfolio?.weights} start_date={userData?.portfolio?.start_date[0]} end_date={formattedDate} initial_investment={userData?.portfolio?.initial_investment} />
                    </Route>
                    <Route path="/dashboard/ConstituentAnalysis">
                      <ConstituentAnalysis tickers={userData?.portfolio?.stocks} weights={userData?.portfolio?.weights} start_date={userData?.portfolio?.start_date[0]} end_date={formattedDate} initial_investment={userData?.portfolio?.initial_investment} />
                    </Route>
                  </Switch>
                </DashboardPage>
             
            ) : (
              <Redirect to="/sign-in" />
            )}
          </Route>
          <Route exact path="/test">
            <PortfolioSimRec/>
          </Route>
          <Route exact path="/robochat">
            {loggedIn ? (
              <RoboChatPage user_id={userData?._id} name={userData?.personalInformation?.fullName} />
            ) : (
              <Redirect to="/sign-in" />
            )}
          </Route>

          <Route exact path="/profile">
            {loggedIn ? (
              <ProfilePage name={userData?.personalInformation?.fullName || ''} email={userData?.personalInformation?.email || ''} contact={userData?.personalInformation?.contact || ''} />
            ) : (
              <Redirect to="/sign-in" />
            )}
          </Route>

          <Route exact path="/settings">
            {loggedIn ? (
              <SettingsPage />
            ) : (
              <Redirect to="/sign-in" />
            )}
          </Route>

          <Route exact path="/portfolioexplorer">
            {loggedIn ? (
              <PortfolioExplorerPage user_id={userData?._id} name={userData?.personalInformation?.fullName} />
            ) : (
              <Redirect to="/sign-in" />
            )}
          </Route>

          <Route exact path="/portfolioexplorer/simulation">
            {loggedIn ? (
              <PortfolioRecPage />
            ) : (
              <Redirect to="/sign-in" />
            )}
          </Route>

          <Route exact path="/portfolioexplorer/novel">
            {loggedIn ? (
              <PortfolioNovelRecPage />
            ) : (
              <Redirect to="/sign-in" />
            )}
          </Route>

          <Route exact path="/newsfeed">
            {loggedIn ? (
              <NewsFeedPage />
            ) : (
              <Redirect to="/sign-in" />
            )}
          </Route>
        </Main>
        
      </div>
    </Router>
  );
}

export default App;
