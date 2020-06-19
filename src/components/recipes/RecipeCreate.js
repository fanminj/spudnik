import React from "react";
import { Field, FieldArray, reduxForm } from "redux-form";

import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
//import FormControl from "@material-ui/core/FormControl";
//import Select from "@material-ui/core/Select";

import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: "35ch",
        },
    },
    card: { margin: "auto" },
    button: { margin: "auto" },
});

class RecipeCreate extends React.Component {
    renderInput = ({
        input,
        label,
        meta: { touched, invalid, error },
        ...custom
    }) => {
        return (
            <TextField
                label={label}
                variant="outlined"
                placeholder={label}
                error={touched && invalid}
                helperText={touched && error}
                {...input}
                {...custom}
            />
        );
    };

    renderFormHelper = ({ touched, error }) => {
        if (!(touched && error)) {
            return;
        } else {
            return <FormHelperText>{touched && error}</FormHelperText>;
        }
    };

    /*renderSelectField = ({
        input,
        label,
        meta: { touched, error },
        children,
        ...custom
    }) => {
        return (
            <FormControl error={touched & error}>
                <Select
                    native
                    {...input}
                    {...custom}
                    inputProps={{
                        name: "servings",
                    }}
                >
                    {children}
                </Select>
                {this.renderFormHelper({ touched, error })}
            </FormControl>
        );
    };*/

    renderIngredients = ({ fields, meta: { error } }) => {
        return (
            <ul>
                <List>
                    <h2>Ingredients</h2>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => fields.push()}
                    >
                        Add ingredient
                    </Button>
                </List>
                {fields.map((ingredient, index) => (
                    <List key={index}>
                        <ListItem alignItems="center">
                            <Field
                                name={`${ingredient}.ingredient`}
                                type="text"
                                component={this.renderInput}
                                label={`Ingredient #${index + 1}`}
                            />
                            <Field
                                name={`${ingredient}.amount`}
                                type="text"
                                component={this.renderInput}
                                label={`Amount of Ingredient #${index + 1}`}
                            />
                            <ListItemSecondaryAction>
                                <IconButton
                                    onClick={() => fields.remove(index)}
                                    edge="end"
                                    aria-label="delete"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                ))}
                {error && <li className="error">{error}</li>}
            </ul>
        );
    };

    renderDirections = ({ fields, meta: { error } }) => {
        return (
            <ul>
                <List>
                    <h2>Directions</h2>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => fields.push()}
                    >
                        Add direction
                    </Button>
                </List>
                {fields.map((direction, index) => (
                    <List key={index}>
                        <ListItem alignItems="center">
                            <Field
                                name={direction}
                                type="text"
                                component={this.renderInput}
                                label={`Direction #${index + 1}`}
                            />
                            <ListItemSecondaryAction>
                                <IconButton
                                    onClick={() => fields.remove(index)}
                                    edge="end"
                                    aria-label="delete"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                ))}
                {error && <li className="error">{error}</li>}
            </ul>
        );
    };

    greaterThan = (otherField) => (value, previousValue, allValues) =>
        value > allValues[otherField] ? value : previousValue;

    onSubmit(formValues) {
        console.log(formValues);
    }

    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h6" component="span" align="center">
                        <h2>Create Recipe!</h2>
                    </Typography>
                </CardContent>
                <Grid container alignItems="center">
                    <form
                        className={classes.root}
                        onSubmit={this.props.handleSubmit(this.onSubmit)}
                    >
                        <div>
                            <Field
                                name="name"
                                component={this.renderInput}
                                label="Enter name of Recipe"
                            />
                        </div>
                        <div>
                            <Field
                                name="duration"
                                component={this.renderInput}
                                label="Enter time required"
                                type="number"
                            />
                        </div>
                        <div>
                            <Field
                                name="servings"
                                component={this.renderInput}
                                label="Enter number of Servings"
                                type="number"
                            />
                        </div>
                        <div>
                            <FieldArray
                                name="ingredients"
                                component={this.renderIngredients}
                            />
                            <FieldArray
                                name="directions"
                                component={this.renderDirections}
                            />
                        </div>
                        <div>
                            <Button
                                className="classes.button"
                                variant="contained"
                                color="primary"
                                component="span"
                                onClick={this.props.handleSubmit(this.onSubmit)}
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                </Grid>
            </Card>
        );
    }
}

export default reduxForm({
    form: "recipeCreate",
})(withStyles(useStyles)(RecipeCreate));
