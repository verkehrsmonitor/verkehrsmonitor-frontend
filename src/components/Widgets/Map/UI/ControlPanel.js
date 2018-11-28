import React, { PureComponent } from 'react';
import styled from 'styled-components';
import AntButton from 'antd/lib/button';

const StyledControPanel = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 1000;
  background-color: ${props => config.colors.roads[props.roadType]};
  padding: 4px 8px;
  border-radius: 50px;


  display: flex;
  flex-dircetion: row;
  align-items: center;
  justify-content: space-around;

  .anticon-close {
    margin-top: 4px;
  }
`;


const RoadLabel = styled.div`
  padding: 4px 8px 2px 8px;
  font-weight: 700;
  color: ${props => (props.roadType === 'A' ? '#FFF' : '#000')};
  background-color: ${props => config.colors.roads[props.roadType]};
`;

export default class ControlPanel extends PureComponent {
  render() {
    return (
      <StyledControPanel roadType={this.props.roadType}>
        <RoadLabel roadType={this.props.roadType}>
          {this.props.label}
        </RoadLabel>
        <AntButton
          shape="circle"
          icon="close"
          onClick={this.props.onClick}
          size="small"
        />
      </StyledControPanel>
    );
  }
}
