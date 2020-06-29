const INIT_STATE = {
    error: null,
    comments: [],
    hasLikedRecipe: null,
    hasFavouritedRecipe: null,
    favouritedRecipes: [],
    likeCount: null
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            console.log("login success");
            return {
                ...state,
                error: null,
                comments: [],
                hasLikedRecipe: null,
                hasFavouritedRecipe: null,
                favouritedRecipes: [],
                likeCount: null
            };
        case "LOGIN_FAILED":
            console.log("login failed");
            return {
                ...state,
                error: action.payload.message
            };
        case "SIGNOUT_SUCCESS":
            console.log("signout success");
            return {
                ...state,
                error: null,
                comments: [],
                hasLikedRecipe: null,
                hasFavouritedRecipe: null,
                favouritedRecipes: [],
                likeCount: null
            };
        case "SIGNUP_SUCCESS":
            console.log("signup success");
            return {
                ...state,
                error: null,
                comments: [],
                hasLikedRecipe: null,
                hasFavouritedRecipe: null,
                favouritedRecipes: [],
                likeCount: null
            };
        case "SIGNUP_FAILED":
            console.log("signup failed");
            return {
                ...state,
                error: action.payload.message
            };
        case "PASSWORD_RESET_SUCCESS":
            console.log("password reset emailed sent");
            return {
                ...state,
                error: "Please check your email for password reset link."
            };
        case "PASSWORD_RESET_FAILED":
            console.log("password reset failed");
            return {
                ...state,
                error: action.payload.message
            };
        case "FETCH_COMMENTS":
            console.log("fetched comments");
            return {
                ...state,
                comments: action.payload
            };
        case "COMMENT_POSTED":
            console.log("comment posted");
            return state;
        case "COMMENT_EDITED":
            console.log("comment edited");
            return state;
        case "COMMENT_DELETED":
            console.log("comment deleted");
            return state;
        case "RECIPE_LIKED":
            console.log("recipe liked");
            return {
                ...state,
                hasLikedRecipe: true
            };
        case "HAS_LIKED_RECIPE":
            console.log("user has liked recipe");
            return {
                ...state,
                hasLikedRecipe: true
            };
        case "HAS_NOT_LIKED_RECIPE":
            console.log("user has not liked recipe");
            return {
                ...state,
                hasLikedRecipe: false
            };
        case "RECIPE_UNLIKED":
            console.log("recipe unliked");
            return {
                ...state,
                hasLikedRecipe: false
            };
        case "FETCH_LIKE_COUNT":
            console.log(`${action.payload} likes`);
            return {
                ...state,
                likeCount: action.payload
            };
        case "RECIPE_FAVOURITED":
            console.log("recipe favourited");
            return {
                ...state,
                hasFavouritedRecipe: true
            };
        case "RECIPE_UNFAVOURITED":
            console.log("recipe unfavourited");
            return {
                ...state,
                hasFavouritedRecipe: false
            };
        case "FETCH_FAVOURITES":
            console.log("fetched favourites");
            return {
                ...state,
                favouritedRecipes: action.payload
            };
        case "HAS_FAVOURITED_RECIPE":
            console.log("user has favourited recipe");
            return {
                ...state,
                hasFavouritedRecipe: true
            };
        case "HAS_NOT_FAVOURITED_RECIPE":
            console.log("user has not favourited recipe");
            return {
                ...state,
                hasFavouritedRecipe: false
            };
        case "RESET_STATE":
            console.log("state reset");
            return {
                ...state,
                error: null,
                comments: [],
                hasLikedRecipe: null,
                hasFavouritedRecipe: null,
                favouritedRecipes: [],
                likeCount: null
            };
        default:
            return state;
    }
};
