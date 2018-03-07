import React, { Component } from 'react';
import { Card } from 'antd';
import './ProjectCard.less';

const gridStyle = {
    width: '50%',
    textAlign: 'left',
};

class ProjectCard extends Component {
    render() {
        let { data } = this.props;
        return (<div className="project-card">
            <Card>
                {
                    data.map((item, index) => (
                        <Card.Grid key={index} style={gridStyle}>{item.name}</Card.Grid>
                    ))
                }
            </Card></div>
        );
    }
}

export default ProjectCard;
