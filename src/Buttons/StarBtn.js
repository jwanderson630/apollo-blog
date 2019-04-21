import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { SINGLE_POST_QUERY } from "../Posts/Post";

const UPDATE_CHECK_MUTATION = gql`
    mutation UPDATE_CHECK_MUTATION($check: Boolean $id: ID!) {
        updatePost(where: {id: $id}, data: {
            check: $check
        }) {
            check
        }
    }
`

const StarBtn = props => {
    const { id, check } = props;
    return (
        <Mutation mutation={UPDATE_CHECK_MUTATION} variables={{ id: id, check: !check }} optimisticResponse={{
            __typename: "Mutation",
            updatePost: {
                __typename: "Post",
                check: !check
            }
        }} update={(cache, { data: { updatePost } }) => {
            const updatedData = cache.readQuery({
                query: SINGLE_POST_QUERY,
                variables: {
                    id
                }
            });
            updatedData.post.check = updatePost.check
            cache.writeQuery({
                query: SINGLE_POST_QUERY,
                data: {
                    ...updatedData,
                    post: updatedData.post
                }
            })
        }}>
            {(updatePost) => {
                return (
                    <div style={{ textAlign: "right" }}>
                        <input type="checkbox" id="cbx" checked={check} onChange={updatePost} style={{ display: "none" }} />
                        <label htmlFor="cbx"><svg className={check ? "star star-active" : "star"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" /></svg></label>
                    </div>
                )
            }}
        </Mutation>
    )
}

export default StarBtn;