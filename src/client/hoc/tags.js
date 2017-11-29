import { connect } from 'react-redux';
import { getTags } from '../selectors/tags';

const mapStateToProps = (state, props) => ({
  ...props,
  tags: getTags(state),
});
export const withTags = Component => connect(mapStateToProps)(Component);

export default withTags;