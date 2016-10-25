import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

const FIELDS = {
  title: {
    type: 'input',
    label: 'Title for Post'
  },
  categories: {
    type: 'input',
    label: 'Enter some categories for this Post'
  },
  content: {
    type: 'textarea',
    label: 'Post Content'
    // add a validation function here
  }
}
//['title', 'categories', 'content'];

class PostsNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    this.props.createPost(props)
    .then(() => {
      // post has been created - navigate to the index
      // we navigate with push
      this.context.router.push('/');
    });
  }

  renderField(fieldConfig, field){
    // console.log('config', fieldConfig);
    // console.log('field', field);

    const fieldHelper = this.props.fields[field];

    return(
      <div key={field} className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : ''}`}>
        <label>{fieldHelper.label}</label>
        <fieldConfig.type type="text" className="form-control" {...fieldHelper} />
        <div className="text-help form-control-feedback">
          {(fieldHelper.touched) ? fieldHelper.error : ''}
        </div>
      </div>
    );
  }

  render()  {
    // fields: field configuration objects
    const { handleSubmit } = this.props;

    return (
      // pass an action creator to handle submit
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create A New Post</h3>

        {_.map(FIELDS, this.renderField.bind(this))}

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

// match errors to field configuration objects defined above
function validate(values){
  const errors = {};

  _.each(FIELDS, (type, field) => {
    if(!values[field]){
      errors[field] = `Enter a ${field}`;
    }
  });

  return errors;
}


// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
  // form config
  form: 'PostsNewForm',
  fields: _.keys(FIELDS),
  validate
}, null, {createPost})(PostsNew);
