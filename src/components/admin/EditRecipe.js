import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Field, FieldArray, reduxForm } from "redux-form";
import { editRecipe } from "../actions/recipeActions";
import { getRecipesThunk } from "../actions/recipeActions";
import {
    renderInput,
    renderIngredients,
    renderDirections,
} from "../recipes/RenderRecipeForm";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { withStyles } from "@material-ui/core/styles";

const number = (value) =>
    isNaN(Number(value)) ? "Must be a number" : undefined;
const required = (value) => (value ? undefined : "Required");
const minValue = (min) => (value) =>
    value && value < min ? `Must be at least ${min}` : undefined;
const maxLength = (max) => (value) =>
    value && value.length > max
        ? `Must be ${max} characters or less`
        : undefined;
const maxLength30 = maxLength(30);
const minValue1 = minValue(1);
const useStyles = (theme) => ({
    card: { margin: "auto" },
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
        },
        width: "80%",
        align: "center",
        margin: "auto",
        padding: "auto",
    },
});

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class EditRecipe extends React.Component {
    componentDidMount() {
        this.props.initialize(this.props.recipe); // here add this line to initialize the form
        if (!this.props.recipe) {
            this.props.getRecipesThunk();
        }
    }

    handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        this.setState({
            open: false,
        });
    };

    onSubmit = (formValues) => {
        //console.log(formValues);

        if (window.confirm("Are you sure?")) {
            this.props.editRecipe(formValues);
        }

        setTimeout(() => {
            this.props.history.push("/admin/recipes");
        }, 1500);
    };

    render() {
        const { classes } = this.props;

        if (!this.props.recipe || !this.props.user.isAdmin) {
            return null;
        }

        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h6" component="span" align="center">
                        <h2>Edit {this.props.recipe.name} Recipe</h2>
                    </Typography>
                </CardContent>
                <Grid container justify="center" direction="column" spacing={2}>
                    <form
                        className={classes.root}
                        onSubmit={this.props.handleSubmit(this.onSubmit)}
                    >
                        <Grid container justify="center">
                            <Grid item xs={12} sm={6}>
                                <Field
                                    name="name"
                                    component={renderInput}
                                    label="Enter Name of Recipe"
                                    validate={[required, maxLength30]}
                                />
                            </Grid>
                        </Grid>
                        <Grid container justify="center">
                            <Grid item xs={12} sm={6}>
                                <Field
                                    name="duration"
                                    component={renderInput}
                                    label="Enter Time required in Minutes"
                                    type="number"
                                    validate={[number, minValue1]}
                                />
                            </Grid>
                        </Grid>
                        <Grid container justify="center">
                            <Grid item xs={12} sm={6}>
                                <Field
                                    name="servings"
                                    component={renderInput}
                                    label="Enter Number of Servings"
                                    type="number"
                                    validate={[number, minValue1]}
                                />
                            </Grid>
                        </Grid>
                        <Grid container justify="center">
                            <Grid item xs={12} sm={8}>
                                <FieldArray
                                    name="ingredients"
                                    component={renderIngredients}
                                />
                                <Divider />
                            </Grid>
                        </Grid>
                        <Grid container justify="center">
                            <Grid item xs={12} sm={8}>
                                <FieldArray
                                    name="directions"
                                    component={renderDirections}
                                />
                            </Grid>
                        </Grid>
                        <Grid container justify="center">
                            <Grid item xs={12} sm={6}>
                                <Field
                                    name="image"
                                    component={renderInput}
                                    label="Enter image URL"
                                    validate={[required]}
                                />
                            </Grid>
                        </Grid>
                        <Grid container justify="center">
                            <Grid item xs={12} sm={6}>
                                <Field
                                    name="video"
                                    component={renderInput}
                                    label="Enter video URL(optional)"
                                />
                            </Grid>
                        </Grid>
                        <Grid container justify="center">
                            <Grid item xs={12} sm={6}>
                                <Field
                                    name="details"
                                    component={renderInput}
                                    label="Enter recipe details"
                                    validate={[required]}
                                    multiline
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            justify="center"
                            style={{ padding: "20px" }}
                        >
                            <Button
                                className="classes.button"
                                variant="contained"
                                color="primary"
                                component="span"
                                onClick={this.props.handleSubmit(this.onSubmit)}
                            >
                                Save Edited Recipe
                            </Button>
                        </Grid>
                        <div>
                            {this.props.submitSucceeded ? (
                                <div>
                                    <Snackbar
                                        open={true}
                                        autoHideDuration={6000}
                                        onClose={this.handleClose}
                                    >
                                        <Alert
                                            onClose={this.handleClose}
                                            severity="success"
                                        >
                                            Recipe edited successfully!
                                        </Alert>
                                    </Snackbar>
                                </div>
                            ) : null}
                        </div>
                    </form>
                </Grid>
            </Card>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getRecipesThunk: () => dispatch(getRecipesThunk()),
        editRecipe: (editedRecipe) => dispatch(editRecipe(editedRecipe)),
    };
};

const mapStateToProps = (state, ownProps) => {
    let recipe = null;

    const recipes = state.recipes;

    if (Array.isArray(recipes)) {
        recipe = recipes.find(({ id }) => id === ownProps.match.params.id);
    }

    return {
        recipes: recipes,
        recipe: recipe,
        intitialValues: recipe,
        user: state.user,
    };
};

export default compose(
    reduxForm({
        form: "EditRecipe",
    }),
    withStyles(useStyles),
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(EditRecipe);
