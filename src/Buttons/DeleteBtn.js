import React from "react";
import { Mutation } from "react-apollo";
import { Redirect } from "react-router-dom"
import gql from "graphql-tag";
import { ALL_POSTS_QUERY } from "../Posts/Posts";


const DELETE_POST_MUTATION = gql`
mutation DELETE_POST_MUTATION($id: ID) {
    deletePost(where: {id: $id}) {
        id
        title
        body
    }
}
`

const handleDelete = (deletePost) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
        deletePost()
    }
}

const DeleteBtn = props => {
    return (
        <Mutation mutation={DELETE_POST_MUTATION} variables={{ id: props.id }} refetchQueries={[{ query: ALL_POSTS_QUERY }]}>
            {(deletePost, { loading, called }) => {
                if (called && !loading) return <Redirect to="/" />
                return (
                    <button className="link-tag danger" onClick={() => handleDelete(deletePost)}><div className="btn-tag"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" /></svg> Delete</div></button>
                )
            }}
        </Mutation>
    )
}

export default DeleteBtn;