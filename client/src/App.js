import React,{useState,useEffect} from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Profile from './components/ProfilePage/Profile';
import ProfileAdmin from './components/ProfileAdmin/Profile';
import {BrowserRouter,Route} from 'react-router-dom';
import {connect} from 'react-redux'
import {fetchUserAction} from './actions/myaction';
import PlagiarismSearch from './components/PlagiarismSearch/PlagiarismSearch';

function App(props) {
    useEffect(()=>{
        props.fetch_user()
    },[])
  return (
 
    <BrowserRouter>
      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/profile" component={Profile} />
	  <Route path="/plagiarismSearch" component={PlagiarismSearch} />
      <Route path="/profileAdmin" component={ProfileAdmin} />
1
    </BrowserRouter>
  );
}
const mapStateToProps = (state)=>{
    return {
        user:state.auth
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        fetch_user:()=>{dispatch(fetchUserAction())}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
