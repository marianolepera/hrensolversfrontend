import './App.css';
import { Switch, Route, BrowserRouter as Router,Redirect } from "react-router-dom";
import LoginScreen from "./screens/Login";
import SignUpScreen from "./screens/SignUp";
import ArchivesScreen from "./screens/Archives"
import NotesScreen from "./screens/Notes"
import ProtectedRoute from './routes/ProtectedRoute';
import Typography from '@material-ui/core/Typography';
import PublicRoute from './routes/PublicRoute'; 


function App() {
  return (
    <Router>
        <div className="container">   
          <Switch>
              <PublicRoute exact={true} path="/login"  component={LoginScreen}></PublicRoute>
              <PublicRoute exact={true} path="/signup"  component={SignUpScreen}></PublicRoute>
              <ProtectedRoute  exact={true} path="/"  component={NotesScreen}></ProtectedRoute>
              <ProtectedRoute  exact={true} path="/archivos"  component={ArchivesScreen}></ProtectedRoute>

            {/* <ProtectedRoute exact={true} path="/" component={BandsScreen}></ProtectedRoute> */}
            {/* <ProtectedRoute exact={true} path="/bands/:id" component={BandsDetailsScreen}></ProtectedRoute>    */}
            <Route path="*">
              <Typography variant="h2">404 Not Found</Typography>
            </Route>
          </Switch>
        </div>
    </Router>
  );
}

export default App;