import view from './view.js';
import PreviewView from './previewView.js';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';

class BookMarkView extends view {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = `❗No bookarks yet. Find a nice recipe and bookmark it `;
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkeup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookMarkView();
