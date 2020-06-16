import React from'react'
import { shallow, configure} from 'enzyme';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import store, {persistor} from '../store' 
import Header from '../components/Header'
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router'
import { AppBar, Typography, Toolbar, Button, Grid, IconButton, Hidden, ListItem, ListItemText, Drawer, SwipeableDrawer } from '@material-ui/core';


/*
describe('Header displayed collectly',() => {
    let mount:any, shallow:any, wrapper:any;

    beforeAll(() => {
      mount = createMount()
      shallow = createShallow()
      wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/']} initialIndex={0}>
            <Header />
          </MemoryRouter>
        </Provider>);      
    });
    afterAll(() => {
        mount.cleanUp()
        shallow.cleanUp()
    });
    it('should work',() => {  
      mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/']} initialIndex={0}>
            <Header />
          </MemoryRouter>
        </Provider>);
    })

    it('Header should exist',() => {  
        expect(wrapper.find(AppBar).length).toEqual(1)
        expect(wrapper.find(IconButton).length).toEqual(1)
    })
  })
  */
  