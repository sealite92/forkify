import * as model from './model.js';
import recipeView from './views/recipeView.js';
// import icons from '../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { Fraction } from 'fractional';
import { async } from 'regenerator-runtime';
import searchView from './views/searchView.js';
import ResultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import BookMarkView from './views/bookmarkViews.js';
// import bookmarkViews from './views/bookmarkViews.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';
// import bookmarkViews from './views/bookmarkViews.js';

// recipeView.renderSpinner();

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    ResultView.update(model.getSearchPage());

    recipeView.renderSpinner();

    BookMarkView.update(model.state.bookmarks);

    //// fetching the recipe
    await model.loadRecipe(id);

    ///rendering the recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearch = async function () {
  try {
    ResultView.renderSpinner();
    //1. Get search querry
    const querry = searchView.getQuerry();
    if (!querry) return;
    // 2. Await searc result
    await model.loadSearchResult(querry);
    // 3. Render search results
    ResultView.render(model.getSearchPage());
    //4. Render initial pagination
    paginationView.render(model.state.search);
  } catch (err) {
    ResultView.renderError();
  }
};

const controlPagination = function (goToPage) {
  // 1. Render new search results
  ResultView.render(model.getSearchPage(goToPage));
  //2. Render initial pagination
  paginationView.render(model.state.search);
};

const controlServings = function (update) {
  /// update the Recipe servings (in state)
  model.updateServings(update);
  // update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const conrtolAddBookmark = function () {
  // Add or remove bookmarks
  if (!model.state.recipe.bookmarked) model.addBookmarks(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  //update recipe view
  recipeView.update(model.state.recipe);

  // Render bookmarks
  BookMarkView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  BookMarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    //Render reecipe
    recipeView.render(model.state.recipe);
    // render success message
    addRecipeView.renderMessage();
    // render bookmark view
    BookMarkView.render(model.state.bookmarks);
    // change url id
    history.pushState(null, '', `#${model.state.recipe.id}`);
    //\remove the window
    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('💥', err);
    addRecipeView.renderError(err.message);
  }
};

const newFeatures = function () {
  console.log('Welcome to the app');
};

const init = function () {
  BookMarkView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addhandlerAddbookmark(conrtolAddBookmark);
  searchView.addHandlerSearchResult(controlSearch);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  newFeatures();
};

init();
///////////////////////////////////////
