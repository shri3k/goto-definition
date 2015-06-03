'use strict';
var Mousetrap = require('mousetrap');
var horsey = require('horsey');
var modal = require('./modal');
var tmpl = require('./tmpl/modal.hbs')
var horse;

const ESC = 27;

var collectAnchors = () => {
  return document.querySelectorAll('a[href^="#"]:not([href$="#"])');
}

var getDOM = (selector) => {
  return document.querySelector(selector);
}

var getMasterElm = () => {
  return getDOM('#gssearch-master');
};
var getSearchBox = () => {
  return getDOM("#gssearch");
};

var extractTxt = domArray => {
  if (!domArray) {
    throw new Error("Must provide dom array");
  }
  var getTxt = dom => {
    return dom.hash;
  };

  return [].map.call(domArray, getTxt);
}
var horseMe = dom => {
  horse = new horsey(dom, {
    suggestions: extractTxt(collectAnchors())
  });
  var facebox = getDOM('.sey-list');
  facebox.classList.add("gss-default-size");
}
var rm = (e) => {
  let master = getMasterElm();
  if (e.keyCode === ESC) {
    try {
      document.body.removeChild(getDOM('#gssearch-master'));
      horse.destroy();
    } catch (e) {}
  }
};

var addEvents = () => {
  getDOM('#gssearch-master form').addEventListener("submit", function() {
    location.hash = this.firstChild.nextSibling.value;
    rm({
      keyCode: ESC
    });
  }, false);
}

var keyToggle = () => {
  document.body.innerHTML += tmpl();
  getSearchBox().focus();
  addEvents();
  horseMe(getSearchBox());
  getSearchBox().addEventListener('keydown', rm);
  getSearchBox().addEventListener('blur', () => {
    setTimeout(() => {
      rm({
        keyCode: ESC
      });
    }, 100);
  });
  getSearchBox().addEventListener('horsey-selected', function() {
    location.hash = this.value;
    rm({
      keyCode: ESC
    });
  });
  getSearchBox().addEventListener('focus', () => {
    horse.show();
  });
  horse.show();
}

Mousetrap.bind('alt+o', keyToggle);
