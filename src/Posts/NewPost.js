import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import PostForm from "./PostForm";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { ALL_POSTS_QUERY } from "./Posts";
import Loader from "../UI/Loader";
import HomeBtn from '../Buttons/HomeBtn';

const CREATE_POST_MUTATION = gql`
    mutation CREATE_POST_MUTATION($title: String!, $body: String!, $status: Status!) 
     {
        createPost(data: {title: $title, body: $body, status: $status}) {
            id
            title
            body
        }
    }
`

class NewPost extends Component {
    render() {
        return (

            <div>
                <div className="tags">
                    <div>
                        <HomeBtn />
                    </div>
                </div>
                <h1>New post</h1>
                <Mutation mutation={CREATE_POST_MUTATION} refetchQueries={[{ query: ALL_POSTS_QUERY }]}>
                    {(createPost, { loading, called, client }) => {
                        if (called && !loading) return <Redirect to="/" />
                        return (
                            <div className="post-form-container">
                                <Loader loading={loading} />
                                <div className="post-form" style={{ opacity: loading ? ".3" : "1" }}>
                                    <PostForm onSubmit={createPost} loading={loading} client={client} />
                                </div>
                            </div>
                        )
                    }}
                </Mutation>
            </div>

        );
    }
}

export default NewPost;