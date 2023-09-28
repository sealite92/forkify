import view from './view.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class ResultView extends view {
  _parentElement = document.querySelector('.results');
  _errorMessage = `❗No results found in your querry. Please try another one`;
  _message = '';

  _generateMarkeup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultView();
