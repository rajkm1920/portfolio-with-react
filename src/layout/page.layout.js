import React, { Component } from 'react';

class BlankLayout extends Component {
    componentDidMount() {

    }
    render() {
        return (
            <div className="full-height">
                {this.props.children}
            </div>
        );
    }
}

export default BlankLayout;