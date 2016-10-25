import { renderComponent, expect } from '../test_helper';
import App from '../../src/components/app';

// use describe to group together similar tests
describe('App', () => {
  let component;

  beforeEach(() => {
    component = renderComponent(App);
  });

  // // use 'it' to test a single attribute of a target
  // it('Shows the correct text', () => {
  //   // create an instane of App
  //   const component = renderComponent(App);
  //   // use 'expect' to make an assertion about a target
  //   expect(component).to.contain('React simple starter');
  // });

  it('shows a comment box', () => {
    expect(component.find('.comment-box')).to.exist;
  });

  it('shows a comment list', () => {
    expect(component.find('.comment-list')).to.exist;
  });

});// describe App
