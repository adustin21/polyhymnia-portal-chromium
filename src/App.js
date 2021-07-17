import './App.css';
import React from "react"
import { useDispatch, useSelector } from 'react-redux';
import Desctop from './componenets/desctop/desctop';
import Verification from './componenets/desctop/verification/verification';
import Loader from './componenets/desctop/_tools/loader/loader';
import HeadWarning from './componenets/desctop/_tools/warning/head-warning'
import { getUserData } from './redux/actions/getUserData';
import { useEffect } from 'react';
import AuthHomepage from './componenets/desctop/auth/homepage/homepage';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserData());
  }, [state.preload.isAuth, dispatch])
  return (
    <div className="App">
      <BrowserRouter >
      <HeadWarning messages={state.headWarning.messages}/>
      {
        state.preload.isAuth  ?
        state.preload.isFirstDataLoad                   ?
          state.preload.isVerified                        ?
            <Desctop state={state} dispatch={dispatch}/>  :
            <Verification state={state.userData} dispatch={dispatch}/>                :
          <Loader />        :
        <AuthHomepage state={state} dispatch={dispatch}/>
      }
      </BrowserRouter>
    </div>
  );
}

export default App;
