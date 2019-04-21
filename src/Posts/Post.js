import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import ReactMarkdown from "react-markdown";
import UpdatePost from "./UpdatePost";
import HomeBtn from "../Buttons/HomeBtn";
import DeleteBtn from "../Buttons/DeleteBtn";
import EditBtn from "../Buttons/EditBtn";
import StarBtn from "../Buttons/StarBtn";
import Loader from "../UI/Loader";



const SINGLE_POST_QUERY = gql`
query SINGLE_POST_QUERY($id: ID!) {
    post(where: {id: $id}) {
        title
        body
        id
        check
    }
    isEditMode @client
}
`



class Post extends Component {
    render() {
        const { id } = this.props.match.params;
        return (
            <Query query={SINGLE_POST_QUERY} variables={{ id }}>
                {({ data, loading }) => {
                    return (
                        <div>
                            <div className="tags">
                                <div>
                                    <HomeBtn />
                                </div>
                                <div className="right-tags">
                                    <EditBtn />
                                    <DeleteBtn id={id} />
                                </div>
                            </div>
                            <div className="post-form-container">
                                {loading || !data ? <Loader loading={loading} /> : (
                                    data.isEditMode ? <UpdatePost id={data.post.id} title={data.post.title} body={data.post.body} /> : (
                                        <div className="post-form" style={{ opacity: loading ? ".3" : "1" }}>
                                            <h1 style={{ color: data.post.check ? "#1a73e8" : "#3d3d3d", transition: "color .2s ease-in-out" }}>{data.post.title}</h1>
                                            <ReactMarkdown source={data.post.body} />
                                            <div style={{ textAlign: "right" }}>
                                                <StarBtn id={data.post.id} check={data.post.check} />
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    )
                }}
            </Query>

        );
    }
}

export default Post;
export { SINGLE_POST_QUERY };