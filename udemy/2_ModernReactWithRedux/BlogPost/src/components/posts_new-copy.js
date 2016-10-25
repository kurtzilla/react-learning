import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

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

  render()  {
    // fields: field configuration objects
    const { fields: { title, categories, content }, handleSubmit } = this.props;
    // equiv - const title = this.props.fields.title; etc

    return (
      // pass an action creator to handle submit
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create A New Post</h3>

        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>Title</label>
          {/* <!-- destructure title objects keys and values into the input element
                    reduxForm maps input properties to the "title" field configuration object defined above
            --> */}
          <input type="text" className="form-control" {...title} />
          <div className="text-help form-control-feedback">
            {(title.touched) ? title.error : ''}
          </div>
        </div>

        <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
          <label>Categories</label>
          <input type="text" className="form-control" {...categories} />
          <div className="text-help form-control-feedback">
            {(categories.touched) ? categories.error : ''}
          </div>
        </div>

        <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
          <label>Content</label>
          <textarea className="form-control" {...content}/>
          <div className="text-help form-control-feedback">
            {(content.touched) ? content.error : ''}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

// match errors to field configuration objects defined above
function validate(values){
  const errors = {};

  if(!values.title){
    errors.title = 'Enter Username';
  }
  if(!values.categories){
    errors.categories = 'Enter Categories';
  }
  if(!values.content){
    errors.content = 'Enter Content';
  }

  return errors;
}


// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
  // form config
  form: 'PostsNewForm',
  fields: ['title', 'categories', 'content'],
  validate
}, null, {createPost})(PostsNew);
