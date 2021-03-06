import React from "react";

// Components
import RecipeList from "./components/recipes/RecipeList";
import RecipeDetails from "./components/recipes/RecipeDetails";
import SubmitRecipe from "./components/recipes/SubmitRecipe";
import StickyFooter from "./components/layout/StickyFooter";
import Login from "./components/user/Login";
import SignUp from "./components/user/SignUp";
import MainAppBar from "./components/layout/AppBar";
import Favourites from "./components/user/Favourites";
import ScrollToTop from "./components/layout/ScrollToTop";
import EditRecipe from "./components/admin/EditRecipe";
import ForgetPassword from "./components/user/ForgetPassword";

// Theme
import { createMuiTheme } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AdminRecipeList from "./components/admin/AdminRecipeList";
import AdminDashboard from "./components/admin/AdminDashboard";
import CreateRecipe from "./components/admin/CreateRecipe";
import SubmissionApproval from "./components/admin/SubmissionApprovalList";
import SubmissionEditRecipe from "./components/admin/SubmissionEditRecipe";
import LandingPage from "./components/layout/LandingPage";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#00bcd4",
            light: "#88ffff",
            dark: "#009faf",
        },
        secondary: {
            main: "#ec407a",
            light: "#ff77a9",
            dark: "#b4004e",
        },
    },
});

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <ScrollToTop />
                <div className="App">
                    <MuiThemeProvider theme={theme}>
                        <MainAppBar />
                        <Switch>
                            <Route path="/" exact component={LandingPage} />
                            <Route
                                path="/recipes"
                                exact
                                component={RecipeList}
                            />
                            <Route
                                path="/recipes/:id"
                                component={RecipeDetails}
                            />

                            <Route path="/login" component={Login} />
                            <Route path="/signup" component={SignUp} />
                            <Route path="/favourites" component={Favourites} />
                            <Route
                                path="/password/reset"
                                component={ForgetPassword}
                            />
                        </Switch>
                        <Route
                            path="/recipes/submit"
                            component={SubmitRecipe}
                        />
                        <Route path="/admin" exact component={AdminDashboard} />
                        <Route
                            path="/admin/recipes"
                            exact
                            component={AdminRecipeList}
                        />
                        <Route
                            path="/admin/create-recipe"
                            component={CreateRecipe}
                        />
                        <Route
                            path="/admin/recipes/:id"
                            component={EditRecipe}
                        />
                        <Route
                            exact
                            path="/admin/submissions"
                            component={SubmissionApproval}
                        />
                        <Route
                            path="/admin/submissions/:id"
                            component={SubmissionEditRecipe}
                        />
                    </MuiThemeProvider>
                </div>
                <div>
                    <StickyFooter />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
