import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Post from "./Posts/Post";
import Posts from "./Posts/Posts";
// import NewPost from "./Posts/NewPost";
import AsyncComponent from "./UI/AsyncComponent";
import './App.css';


const NewPost = props => (
  <AsyncComponent load={() => import('./Posts/NewPost')}>
    {(Component) => Component === null
      ? null
      : <Component {...props} />}
  </AsyncComponent>
)

class App extends Component {
  render() {
    return (
      <Router>
        <>
          <header>
            <Link to="/">Apollo</Link>
          </header>
          <main className="app-main">
            <Switch>
              <Route path="/" exact component={Posts} />
              <Route path="/post/new" component={NewPost} />
              <Route path="/post/:id" component={Post} />
            </Switch>
          </main>
        </>
      </Router>
    );
  }
}

export default App;
