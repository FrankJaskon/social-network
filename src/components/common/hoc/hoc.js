import React, { Suspense } from 'react'
import { Navigate } from 'react-router'
import { connect } from 'react-redux';
import ErrorPage from '../error/error-page';
import { getIsAuth } from '../../../redux/auth-selectors';

const mapStateToPropsForRedirect= (state) => ({isAuth: getIsAuth(state)});

const HOC = {
    redirectProfileWrapperComponent(Component) {
        class ContainerComponent extends React.Component {
            render() {
                const {isAuth} = this.props;

                if (isAuth) return <Navigate to={'/profile'} />
                else return <Component {...this.props} />;
            }
        }
        return connect(mapStateToPropsForRedirect, {})(ContainerComponent);
    },
    showPageErrorWrapperComponent(Component) {
        class ContainerComponent extends React.Component {
            componentDidUpdate(prevProps) {
                // if (prevProps.match.url !== this.props.match.url) {
                //     this.props.setLoadingError('', '');
                // }
            }
            componentWillUnmount() {
                this.props.loadingError && this.props.loadingError.code && this.props.setLoadingError('', '');
            }
            render() {
                const {loadingError} = this.props;

                if (loadingError && loadingError.code) return (
                    <ErrorPage loadingError={loadingError}
                        responseWarning={this.props.responseWarning}
                        setResponseWarning={this.props.setResponseWarning}
                    />
                )
                else return <Component {...this.props} />;
            }
        }
        return connect(mapStateToPropsForRedirect, {})(ContainerComponent);
    },
    wrapComponentSuspense(Component, Preloader) {
        const NewComponent = (props) => {
            return <Suspense fallback={Preloader}>
                <Component {...props} />
            </Suspense>
        }
        return NewComponent;
    }
}

export default HOC;