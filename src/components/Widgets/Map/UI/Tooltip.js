import React, { PureComponent } from 'react';
import TooltipWrapper from '~/components/Common/TooltipWrapper';
import { isNumeric, isDefined, formatToLocalString } from '~/helper/utils';
import styled from 'styled-components';
import RoadLabel from '~/components/Common/RoadLabel';

const StyledMapTooltip = styled.div`
  font-size: 12px;
  font-weight: 300;
`;

const StyledRoadName = styled.span`
  font-weight: 600;
`;

const ValueWrapper = styled.div`
  margin-top: 16px;
`;

const MetaKey = styled.span`
  font-weight: 600;
`;

export default class Tooltip extends PureComponent {
  render() {
    const { data, pos, isVisible } = this.props;
    return isDefined(data) && (
      <TooltipWrapper pos={pos} isVisible={isVisible}>
        <StyledMapTooltip>
          <RoadLabel roadType={data.type}>{`${data.type} ${data.roadid}`}</RoadLabel>
          <StyledRoadName>{`${data.name} (${data.land})`}</StyledRoadName>
          <ValueWrapper>
            <MetaKey>Messungen: </MetaKey>
            <span>{isNumeric(data.val) ? formatToLocalString(data.val) : data.val}</span>
          </ValueWrapper>
        </StyledMapTooltip>
      </TooltipWrapper>
    );
  }
}
