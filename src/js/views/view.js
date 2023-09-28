import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  /**
   *
   * @param {*} data
   * @param {*} render
   * @returns
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markUp = this._generateMarkeup();

    if (!render) return markUp;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  update(data) {
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError();
    this._data = data;
    const newMarkUp = this._generateMarkeup();

    const newDom = document.createRange().createContextualFragment(newMarkUp);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      // update chenged text content
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('❤', newEl.firstChild?.nodeValue.trim() !== '');
        curEl.textContent = newEl.textContent;
      }
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  _clear() {
    this._parentElement.innerHTML = ``;
  }

  renderSpinner(parentEl) {
    const markUp = `
<div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  //   renderError(message = this._errorMessage) {
  //     const markUp = `
  //           <div class="error">
  //             <div>
  //               <svg>
  //                 <use href="${icons}_icon-alert-triangle"></use>
  //               </svg>
  //             </div>
  //             <p>${message}</p>
  //           </div>
  // `;
  //     this._clear();
  //     this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  //   }
  renderError(message = this._errorMessage) {
    const markUp = `
          <div class="error">
            <div>
              <svg>
                <use href="${icons}_icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }
  renderMessage(message = this._message) {
    const markUp = `
          <div class="message">
            <div>
              <svg>
                <use href="${icons}_icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }
}
