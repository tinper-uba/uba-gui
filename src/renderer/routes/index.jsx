import React, { Component } from 'react';
import { Switch, Route } from 'mirrorx';
import EmptyHome from 'containers/EmptyHome';
import Init from 'containers/Init';


class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={EmptyHome} />
                <Route exact path="/init" component={Init} />
            </Switch>
        );
    }
}

export default Routes;