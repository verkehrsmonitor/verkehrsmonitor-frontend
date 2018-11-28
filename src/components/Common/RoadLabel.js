import styled from 'styled-components';

export default styled.div`
  display: inline-block;
  padding: 4px 8px 2px 8px;
  border-radius: 2px;
  color: ${props => (props.roadType === 'A' ? '#FFF' : '#000')};
  font-weight: 600;
  background-color: ${props => config.colors.roads[props.roadType]};
  margin-right: 8px;
`;
