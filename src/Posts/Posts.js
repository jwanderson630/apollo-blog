import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import LoadBtn from "../Buttons/LoadBtn";


const ALL_POSTS_QUERY = gql`
  query ALL_POSTS_QUERY($skip: Int) {
    posts(orderBy: createdAt_DESC, first: 4, skip: $skip) {
      title
      body
      id
      check
    }
  }
`;

class Posts extends Component {

    state = {
        skip: 4,
        loadedAll: false
    }

    render() {
        return (
            <Query query={ALL_POSTS_QUERY}>
                {({ data: { posts }, loading, client, fetchMore }) => {
                    client.writeData({ data: { isEditMode: false } });
                    return (
                        <>
                            <div className="posts-list">
                                {loading ? <div className="post-form-loader" style={{ display: loading ? "grid" : "none" }}>
                                    <div><div className="lds-dual-ring"></div></div>
                                </div> : <>
                                        {posts.map(post => (
                                            <Link key={post.id} className="list-item" to={`/post/${post.id}`} style={{ fontWeight: post.check ? "bold" : "normal", transition: "color .2s ease-in-out" }}>
                                                <div>{post.title}</div>
                                                <div style={{ justifyContent: "end", display: post.check ? "grid" : "none" }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#f1c40f" d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" /></svg></div>
                                            </Link>
                                        ))}
                                        <div className="loadBtn-row">
                                            <LoadBtn loadedAll={this.state.loadedAll} onClick={() => fetchMore({
                                                variables: {
                                                    skip: posts.length
                                                },
                                                updateQuery: (prev, { fetchMoreResult }) => {
                                                    if (fetchMoreResult.posts.length === 0) {
                                                        this.setState({
                                                            loadedAll: true
                                                        });
                                                        return prev;
                                                    }
                                                    this.setState({ skip: posts.length + 4, loadedAll: fetchMoreResult.posts.length < 4 ? true : false })
                                                    return Object.assign({}, prev, {
                                                        posts: [...prev.posts, ...fetchMoreResult.posts]
                                                    })
                                                }
                                            })} />
                                        </div>
                                    </>
                                }

                            </div>

                            <div className="new-post-row" style={{ marginTop: posts === undefined ? "0px" : "20px" }}>
                                <Link className="link-btn" to="/post/new">New Post</Link>
                            </div>
                        </>
                    )
                }}
            </Query>
        );
    }
}

export { ALL_POSTS_QUERY };
export default Posts;