import view from './view.js';

class SearchView extends view {
  _parentElement = document.querySelector('.search');

  getQuerry() {
    const querry = this._parentElement.querySelector('.search__field').value;
    this._clearView();
    return querry;
  }

  _clearView() {
    this._parentElement.querySelector('.search__field').value = '';
  }

  addHandlerSearchResult(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();

      handler();
    });
  }
}

export default new SearchView();
