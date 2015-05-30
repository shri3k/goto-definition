'use strict';
var Mousetrap = require('mousetrap');
var horsey = require('horsey');
var modal = require('./modal');


var collectAnchors = () => {
  return document.querySelectorAll('a[href^="#"]:not([href$="#"])');
}

var getMasterElm = () => {
  return document.querySelector('#gssearch-master');
};
var getSearchBox = () => {
  return document.querySelector("#gssearch");
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
  horsey(dom, {
    suggestions: extractTxt(collectAnchors())
  });
}
var rm = () => {
  let master = getMasterElm();
  try {
    document.body.removeChild(master);
  } catch (e) {
  }
};
var init = () => {
  let master = document.createElement('div');
  master.id = "gssearch-master";
  master.className = "center";
  let childForm = document.createElement('form');
  childForm.action = "javascript:void(0);";
  childForm.addEventListener("submit", function() {
    location.hash = this.firstChild.value;
    rm();
  }, false);
  master.appendChild(childForm);
  let childInput = '<input type="search" placeholder="search" id="gssearch"/>';
  childForm.innerHTML = childInput;
  document.body.appendChild(master);
  getSearchBox().focus();
  getSearchBox().addEventListener('blur', rm);
  horseMe(getSearchBox());
};
Mousetrap.bind('alt+o', init);
