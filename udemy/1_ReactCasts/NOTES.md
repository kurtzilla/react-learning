
# JSX
let's us write html within our javascript
```
{
  render: function() {
    return <div>Hello</div>
  }
}
```
this JSX code gets converted (compiled/transpiled) to javascript
```
// compile to JS

{
  render: function() {
    return React.createElement('div', null, 'Hello');
  }
}
```

** course note: transformer link  <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/JSXTransformer.js"></script>


Passing props  
{...props}  
pass in the entire object instead of picking of individual elements  

State  
never directly set the state props. Always use the setState method  
setState ensures that our object is re-rendered when state is updated  
```
this.state.open = false                 // BAD!!!
this.setState({open: !this.state.open}) // GOOD
```

componentWillMount - runs one time when the component is mounted to the DOM  
* initializations

componentWillReceiveProps - not called on the initial render. Called when say, a  
link is clicked that will bring us back to the same page with different prop

mixins is a group of methods on one object that gets copied to over to another object  

SASS files, when newly created, require gulp to be restarted to be re-compiled  
















//
