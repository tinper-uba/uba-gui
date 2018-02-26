import React, { Component } from 'react';
import {Switch,Route} from 'mirrorx';
import Home from 'components/Home';


class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
            </Switch>
        );
    }
}

export default Routes;