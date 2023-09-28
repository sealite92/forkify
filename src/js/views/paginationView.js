import view from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends view {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;

      handler(goToPage);
      console.log(handler);
    });
  }
  _generateMarkeup() {
    const numPages = Math.ceil(
      this._data.result.length / this._data.resultPerPage
    );
    const currentPage = this._data.page;
    console.log(currentPage);
    // Page 1 and other pages
    if (currentPage === 1 && numPages > 1) {
      return `
       <button data-goto="${
         currentPage + 1
       }" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
      `;
    }
    // Last page
    if (currentPage === numPages && numPages > 1) {
      return ` <button data-goto="${
        currentPage - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>`;
    }
    // Some other pages
    if (currentPage < numPages && currentPage > 1) {
      return ` <button data-goto="${
        currentPage - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
          
           <button data-goto="${
             currentPage + 1
           }" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
          `;
    }
    // Page 1 and no other pages
    return '';
  }
}

export default new PaginationView();
