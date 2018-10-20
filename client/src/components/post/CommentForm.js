import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import components
import TextAreaFieldGroup from "../common/TextAreaFieldGroup.js";
// import actions
import { addComment } from "../../actions/postActions.js";

class CommentForm extends Component {
   constructor(props) {
      super(props);

      this.state = {
         text: "",
         errors: {},
      };
   }

   onSubmit = event => {
      event.preventDefault();
      const { user } = this.props.auth;
      const { postId } = this.props;

      const newComment = {
         text: this.state.text,
         name: user.name,
         avatar: user.avatar,
         handle: user.handle,
      };

      this.props.addComment(newComment, postId);
      if (this.state.text.length >= 10) {
         this.setState({
            text: "",
         });
      }
   };

   onChange = event => {
      this.setState({
         [event.target.name]: event.target.value,
      });
   };

   componentWillReceiveProps(nextProps) {
      if (nextProps.errors) {
         this.setState({
            errors: nextProps.errors,
         });
      }
   }

   render() {
      const { errors } = this.state;

      return (
         <div className="post-form mb-3">
            <div className="card card-info">
               <div className="card-header bg-info text-white">Make a comment...</div>
               <div className="card-body">
                  <form onSubmit={ this.onSubmit }>
                     <div className="form-group">
                        <TextAreaFieldGroup
                           placeholder="Reply to post"
                           name="text"
                           value={ this.state.text }
                           onChange={ this.onChange }
                           error={ errors.text }
                        />
                     </div>
                     <button type="submit" className="btn btn-dark">
                        Submit
							</button>
                  </form>
               </div>
            </div>
         </div>
      );
   }
}

CommentForm.propTypes = {
   addComment: PropTypes.func.isRequired,
   postId: PropTypes.string.isRequired,
   auth: PropTypes.object.isRequired,
   errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
   auth: state.auth,
   errors: state.errors,
});

CommentForm = connect(
   mapStateToProps,
   { addComment },
)(CommentForm);

export default CommentForm;
