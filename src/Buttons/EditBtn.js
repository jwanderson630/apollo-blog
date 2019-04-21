import React from "react";
import { ApolloConsumer, Query } from "react-apollo";
import gql from "graphql-tag";



const EDIT_MODE_QUERY = gql`
    query EDIT_MODE_QUERY {
        isEditMode @client
    }
`

const EditBtn = props => {
    return (
        <Query query={EDIT_MODE_QUERY}>
            {({ data }) => {
                return (
                    <ApolloConsumer>
                        {client => (
                            <button onClick={() => {
                                client.writeData({ data: { isEditMode: !data.isEditMode } });
                            }} className={data.isEditMode ? "link-tag link-tag-active" : "link-tag"}><div className="btn-tag"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z" /></svg> Edit{data.isEditMode ? "ing" : ""}</div></button>

                        )}
                    </ApolloConsumer>
                )
            }}
        </Query>
    )
};

export default EditBtn;