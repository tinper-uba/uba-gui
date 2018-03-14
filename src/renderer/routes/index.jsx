import React, { Component } from 'react';
import { Switch, Route } from 'mirrorx';
import EmptyHome from 'containers/EmptyHome';
import Init from 'containers/Init';
import MySpace from 'containers/MySpace';



class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={EmptyHome} />
                <Route exact path="/init" component={Init} />
                <Route exact path="/my" component={MySpace} />
            </Switch>
        );
    }
}

export default Routes;