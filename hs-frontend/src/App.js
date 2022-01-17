import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { AuthContextProvider, ModeContextProvider } from './contexts';
import * as Pages from './components/Pages';

const App = () => { 
    document.title = 'System wspólnoty mieszkaniowej'
    return (
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <ModeContextProvider>
          <Router>
            <Switch>
              <Route exact path="/" >
                <Pages.AnnouncementsPage />
              </Route>
              <Route exact path="/login">
                <Pages.AuthPage />
              </Route>
              <Route exact path="/users">
                <Pages.UsersPage />
              </Route>
              <Route exact path="/users/details/:userId" render={(props) => <Pages.UserDetailsPage {...props} /> }/>
              <Route exact path="/announcements">
                <Pages.AnnouncementsPage />
              </Route>
              <Route exact path="/documents">
                <Pages.DocumentsPage />
              </Route>
              <Route exact path="/issues">
                <Pages.IssuesPage />
              </Route>
              <Route exact path="/profile">
                <Pages.ProfilePage />
              </Route>
              <Route exact path="/buildings">
                <Pages.BuildingsPage />
              </Route>
              <Route exact path="/building/:buildingId" render={(props) => <Pages.BuildingDetailsPage {...props} /> }/>
              <Route exact path="/locals">
                <Pages.LocalsPage />
              </Route>
            </Switch>
          </Router>
        </ModeContextProvider>
      </AuthContextProvider>
    </ChakraProvider> 
)}
export default App;
