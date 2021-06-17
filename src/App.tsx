import React, { useEffect } from "react";
import Message404 from "./views/Message/Message404";
import Form from "./views/Form";
import Applications from "./views/Applications/Applications";
import Profile from "./views/Profile/Profile";
import "./App.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Welcome from "./views/Message/Welcome";
import GenericMessage from "./views/Message/GenericMessage";
import { media, pro, developer, tip } from "./config/typeform_config";
import Logout from "./components/Actions/Logout";
import CalendarPage from "./views/Calendar/Calendar";
import EventPage from "./views/Message/Event";
import * as Sentry from "@sentry/react";
import { useAuth0 } from "@auth0/auth0-react";
import AuthRoute from "./components/Actions/AuthRoute";
import GsuiteProtectedRoute from "./components/Actions/GsuiteRoute";
import { jwt } from "./api/state";
import { useRecoilState } from "recoil";
import CustomForm from "./views/Message/CustomForm";
import Authorize from "./components/Actions/Authorize";

/**
 * Note: Use Component with Capital C when using a protected route
 * AProtectedRoute = protected by Auth0
 * GProtectedRoute = protected by GSuite
 * Refactor at some point so that we have one protected route with prop?
 * Now that we have protected routes there's no point in protecting individual components
 * <Form /> has built in authentication verification, results in 2 api calls to the same endpoint
 */
function App() {
  const { isLoading, isAuthenticated, getAccessTokenSilently, user } =
    useAuth0();
  const [token, setToken] = useRecoilState(jwt);

  useEffect(() => {
    const fn = async () => {
      if (isAuthenticated && !token.isSet) {
        setToken({ token: await getAccessTokenSilently(), isSet: true });
        Sentry.setUser({
          email: user.email,
          id: user.sub,
        });
      }
    };
    fn();
  }, [
    isLoading,
    isAuthenticated,
    token,
    setToken,
    getAccessTokenSilently,
    user,
  ]);

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Welcome} exact />
          <AuthRoute
            path="/newprofile"
            Component={
              <Form typeform_id={pro} endpoint="/auth0/create-blank-profile" />
            }
            exact
          />
          <AuthRoute path="/calendar" Component={<CalendarPage />} exact />
          <AuthRoute path="/profile" Component={<Profile />} exact />
          <AuthRoute path="/applications" Component={<Applications />} exact />
          <AuthRoute path="/checkin" Component={<EventPage />} />
          <AuthRoute path="/forms" Component={<CustomForm />} />
          <AuthRoute
            path="/tip"
            Component={<Form typeform_id={tip} endpoint="/auth0/developer" />}
            exact
          />
          <AuthRoute
            path="/media"
            Component={<Form typeform_id={media} endpoint="/auth0/developer" />}
            exact
          />
          <AuthRoute
            path="/developer"
            Component={
              <Form typeform_id={developer} endpoint="/auth0/developer" />
            }
            exact
          />
          <Route path="/gsuite" component={Authorize} />
          <GsuiteProtectedRoute
            path="/tothemoon"
            Component={<GenericMessage title="Yay gsuite auth works! 🚀" />}
          />
          <Route path="/logout" component={Logout} exact />
          <Route path="/*" component={Message404} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
