import React, { Component } from 'react';
import PropTypes from "prop-types";

class PostForm extends Component {

    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        onSuccess: PropTypes.func,
    }

    static defaultProps = {
        post: {},
        onSuccess: () => null
    }

    state = {
        title: this.props.title || "",
        body: this.props.body || ""
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = async (e, onSubmit, client) => {
        e.preventDefault();
        const { title, body } = this.state;
        onSubmit({
            variables: {
                title,
                body,
                status: "DRAFT"
            }
        }).then(this.props.onSuccess());
    }

    render() {
        return (
            <form onSubmit={e => this.handleSubmit(e, this.props.onSubmit, this.props.client)}>
                <div>
                    <input required placeholder="Title" value={this.state.title} onChange={this.handleChange} type="text" name="title" />
                </div>
                <div>
                    <textarea required placeholder="Body" value={this.state.body} onChange={this.handleChange} type="text" name="body"></textarea>
                </div>
                <button className="btn" type="submit">Submit</button>
            </form>
        );
    }
}

export default PostForm;