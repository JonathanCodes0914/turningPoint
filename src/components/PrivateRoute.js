import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectToken } from '../features/userSlice';
import { Component } from 'react';



export const PrivateRoute = ({ component: Component, ...rest }) => {
    const token = useSelector(selectToken)
    return (
      <Route {...rest} render={props => token
        ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      } />
    )
  }