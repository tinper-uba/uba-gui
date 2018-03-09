import React, { Component } from 'react';
import { Card, Avatar } from 'antd';
import { actions } from 'mirrorx';
import './ProjectCard.less';
import ut from 'static/ut.png';

const { Meta } = Card;

const gridStyle = {
    width: '100%',
    textAlign: 'left'
};


class ProjectCard extends Component {
    cardClick = (index,item) => {
        let obj = {
            selectId : item.id,
            selectName : item.name
        }
        actions.init.selectTemplate(obj);
    }
    render() {
        let { data } = this.props;
        return (<div className="project-card">
            <Card>
                {
                    data.map((item, index) => (
                        <Card.Grid onClick={this.cardClick.bind(this,index,item)} key={index} style={gridStyle}>
                            <Card bordered={false} style={{ width: '100%' }}>
                                <Meta
                                    avatar={<Avatar src={ut} />}
                                    title={item.name}
                                    description={item.description}
                                />
                            </Card>
                        </Card.Grid>
                    ))
                }
            </Card></div>
        );
    }
}

export default ProjectCard;
