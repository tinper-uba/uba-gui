import React, { Component } from 'react';
import { Switch, Route } from 'mirrorx';
import EmptyHome from 'containers/EmptyHome';
import Init from 'containers/Init';
import MySpace from 'containers/MySpace';
import Welcome from 'containers/Welcome';



class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Welcome} />
            </Switch>
        );
    }
}

export default Routes;