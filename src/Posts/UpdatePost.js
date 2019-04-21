import React, { Component } from 'react';
import PostForm from "./PostForm";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Loader from "../UI/Loader";

const UPDATE_POST_MUTATION = gql`
    mutation UPDATE_POST_MUTATION($title: String!, $body: String!, $id: ID!) {
        updatePost(where: {id: $id}, data: {
            body: $body
            title: $title
        }) {
            id
            title
            body
        }
    }
`

class UpdatePost extends Component {


    render() {
        const { id, title, body } = this.props;

        return (
            <Mutation mutation={UPDATE_POST_MUTATION} variables={{ id }}>
                {(updatePost, { loading, client }) => {

                    const onSuccess = () => client.writeData({ data: { isEditMode: false } });

                    return (
                        <div>
                            <h1><strong>Update post:</strong> {title}</h1>
                            <div className="post-form-container">
                                <Loader loading={loading} />
                                <div className="post-form" style={{ opacity: loading ? ".3" : "1" }}>
                                    <PostForm title={title} body={body} onSubmit={updatePost} onSuccess={onSuccess} />
                                </div>
                            </div>
                        </div>
                    )
                }}
            </Mutation>
        );
    }
}

export default UpdatePost;