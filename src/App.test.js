import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App, {Button, Search, Table} from './App';

Enzyme.configure({ adapter: new Adapter()});

describe('App', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('create snapshot', () => {
    const component = renderer.create(
      <App/>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});

describe('Search', () => {

  it('renderes without crashing', () => {
    const div = document.createElement('dev');
    ReactDOM.render(<Search>Search</Search>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('create snapshot', () => {
    const component = renderer.create(
      <Search>Search</Search>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Button', () => {

  it('renderes without crashing', () => {
    const div = document.createElement('dev');
    ReactDOM.render(<Button>Click me!</Button>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('create snapshot', () => {
    const component = renderer.create(
      <Button>Click me!</Button>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });


});

describe('Table', () => {
  const props = {
    list: [
      { title: '1', author: '1', num_comments: 10, points: 2, objectID: 'y'},
      { title: '2', author: '2', num_comments: 20, points: 1, objectID: 'z'},
      { comment_text: 'text', author: '111', num_comments: 1, points: 100, objectID: 'a'},
    ],
  };

  it('renderes without crashing', () => {
    const div = document.createElement('dev');
    ReactDOM.render(<Table {...props}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('create snapshot', () => {
    const component = renderer.create(
      <Table {...props}/>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });


  it('shows two items in list', () => {
    const element = shallow(
      <Table {...props}/>
    );

    expect(element.find('.table-row').length).toBe(3);
  });

  it('shows one comment answer in list', () => {
    const element = shallow(
      <Table {...props}/>
    );

    expect(element.find('.table-row-comment').length).toBe(1);
  });
});
