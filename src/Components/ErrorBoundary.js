/*error handling */
import React, { Component } from 'react';

class ErrorBoundary extends Component {
    state = {
         error: null, 
         errorInfo: null 
        };
    
    
    componentDidCatch(error, errorInfo) {
      // Catch errors in any components below and re-render with error message
      this.setState({
        error: error,
        errorInfo: errorInfo
      })
      // You can also log error messages to an error reporting service here
    }
    
    render() {
      if (this.state.errorInfo) {
       
        return (
          <div>
            <h2>Something went wrong</h2>
              <p>Please make sure that the dates entered is in the following format: </p>
              <p>Year-MM-DD or you could just enter the year</p>
              <br />

          </div>
        );
      }
      // Normally, just render children
      return this.props.children;
    }  
  }

export default ErrorBoundary