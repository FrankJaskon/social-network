import Dialogs from './dialogs';
import { addMessage } from '../../redux/dialogs-reducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { redirectToAuth } from '../common/hoc/newHoc';


const mapStateToProps = ({auth: {isAuth}, dialogs}) => {
    return {
        dialogs,
        isAuth
    };

}

export default compose(
    connect(mapStateToProps, {addMessage}),
    redirectToAuth,
)(Dialogs);

