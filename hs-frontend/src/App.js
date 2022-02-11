import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { AuthContextProvider, ModeContextProvider } from './contexts';
import PrivateRoute from './components/PrivateRoute';
import * as Pages from './components/Pages';

const App = () => { 
    document.title = 'System wspólnoty mieszkaniowej'
    return (
    <ChakraProvider theme={theme}>
        <AuthContextProvider>
          <Router>
            <Switch>
              <Route exact path="/login">
                  <Pages.AuthPage />
                </Route>
                <PrivateRoute exact path="/" >
                  <Pages.AnnouncementsPage />
                </PrivateRoute>
                {/*<PrivateRoute exact path="/users/details/:userId" render={(props) => <Pages.UserDetailsPage {...props} /> }/> */}
                <PrivateRoute exact path="/users/:userId">
                  <Pages.UserDetailsPage  />
                </PrivateRoute>
                <PrivateRoute exact path="/users">
                  <Pages.UsersPage />
                </PrivateRoute>
                <PrivateRoute exact path="/announcements">
                  <Pages.AnnouncementsPage />
                </PrivateRoute>
                <PrivateRoute exact path="/documents">
                  <Pages.DocumentsPage />
                </PrivateRoute>
                <PrivateRoute exact path="/issues">
                  <Pages.IssuesPage />
                </PrivateRoute>
                <PrivateRoute exact path="/profile">
                  <Pages.ProfilePage />
                </PrivateRoute>
                <PrivateRoute exact path="/buildings/:buildingId">
                  <Pages.BuildingDetailsPage />
                </PrivateRoute> 
                <PrivateRoute exact path="/buildings">
                  <Pages.BuildingsPage />
                </PrivateRoute>
                <PrivateRoute exact path="/locals">
                  <Pages.LocalsPage />
                </PrivateRoute>
              </Switch>
            </Router>
        </AuthContextProvider>
    </ChakraProvider> 
)}
export default App;
