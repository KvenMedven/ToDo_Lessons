import React, {Component} from 'react';

class Form extends React.Component<any, any> {
    handleSubmitClick = () => {
        const name = this.;
        // do something with `name`
    }
    render() {
        return (
            <div>
                <input type="text" ref={input => this._name = input} />
                <button onClick={this.handleSubmitClick}>Sign up</button>
            </div>
        );
    }
}