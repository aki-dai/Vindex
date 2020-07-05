import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer'

import {Top} from './Top/TopPage';
import {Watch} from './Watch/WatchPage';
import {WatchModal} from './Watch/WatchModal';
import {Search} from './Search/SearchPage';
import {Editor} from './Editor/Editor'
import {About} from './Static/about'
import {Update} from './Static/update'
import {Auth} from './Auth/Auth'
import {UseTerm} from './Static/useTerm'
import {PrivacyPolicy} from './Static/privacyPolicy'

import * as H from 'history'
import { Container, Grid, Box, makeStyles, Theme, createStyles } from '@material-ui/core';
import { MyPage } from './MyPage/MyPage';
import { UserInfoEffect, TitleChangeEffect } from './components/customHooks';

//Modal.setAppElement('#root')
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root:{
            minWidth: 270,
            width: '100%',
            maxWidth: 1080,
            margin: 'auto',
        },
        topItems:{
            margin: 'auto',
            width: '100%',
        }
    })
)



const App: React.FC = () => {
  let location: H.Location<any> = useLocation()
  //console.log({location})
  let background = location.state && location.state.background
  const classes = useStyles()
  return (
    <>
      <TitleChangeEffect title="Vindex"/>
      <UserInfoEffect />
      <Header />
        <Container maxWidth="lg">
          <Grid container justify="center" className={classes.root}>
            <Grid item className={classes.topItems}>
              <Box m={10} />
              <Switch location={background || location}>
                <Route exact path="/" component={Top} />
                <Route path="/watch/:id">
                  <Watch tagType={"movie"}/>
                </Route>
                <Route path="/search">
                  <Search />
                </Route>
                <Route path="/registration">
                  <Editor />
                </Route>
                <Route path="/mypage">
                  <MyPage />
                </Route>
                <Route path="/about">
                  <About />
                </Route>
                <Route path="/update">
                  <Update />
                </Route>
                <Route path="/useTerm">
                  <UseTerm />
                </Route>
                <Route path="/privacyPolicy">
                  <PrivacyPolicy />
                </Route>
                <Route path="/auth">
                  <Auth />
                </Route>
              </Switch>

              {background && <Route path="/watch/:id" children={<WatchModal/>} />}

            </Grid>
          </Grid>
        </Container>
      <Footer />
    </>
  );
}

export default App;
