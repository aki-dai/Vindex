import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router';
import {Top} from '../Top/TopPage'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {Caption} from '../Top/TopComponents/Caption'
import {NewMovies} from '../Top/TopComponents/NewMovies'
import {SearchBox} from '../components/SearchBox'
import { Provider } from 'react-redux';
import store, {persistor} from '../store' 

configure({ adapter: new Adapter() });

it('renders without crashing ', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
        <App />
      </MemoryRouter>
    </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('Top Page displayed collectly',() => {
  it('Components should exist',() => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <App />
        </MemoryRouter>
      </Provider>);
      expect(wrapper.find(Top).length).toEqual(1)
      expect(wrapper.find(Header).length).toEqual(1)
      expect(wrapper.find(Caption).length).toEqual(1)
      expect(wrapper.find(NewMovies).length).toEqual(1)
      expect(wrapper.find(SearchBox).length).toEqual(1)
      expect(wrapper.find(Footer).length).toEqual(1)
  })
})
