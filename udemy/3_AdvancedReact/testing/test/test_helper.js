import jsdom from 'jsdom';// jsdom fakes the browser at the terminal
import _$ from 'jquery';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import chai, { expect } from 'chai';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/reducers';
import chaiJquery from 'chai-jquery';


// SETUP testing environment to run like a browser in the command line
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
// overwrite the typical $ for jquery called on OUR particular window
const $ = _$(global.window);

// BUILD 'renderComponent' helper that should render a given react class
// returns a jquery wrapped element
function renderComponent(ComponentClass, props, state) {
  const componentInstance = TestUtils.renderIntoDocument(
    <Provider store={createStore(reducers, state)}>
      <ComponentClass {...props} />
    </Provider>
    );

  return $(
    ReactDOM.findDOMNode(componentInstance)// this produces html
  );
}


// BUILD helper for simulating events
$.fn.simulate = function(eventName, value) {
  if(value){
    this.val(value);
  }
  TestUtils.Simulate[eventName](this[0]) //just do this on the first found element
}


// setup chai-jquery
chaiJquery(chai, chai.util, $);


export { renderComponent, expect };
