import React, {Component, Fragment} from 'react';
import {Row, Button, Container} from "reactstrap";
import {loadAccount, logout} from "../actions/auth_actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Link, withRouter} from 'react-router-dom';

class MenuBar extends Component {

    componentDidUpdate() {
        this.checkAndLoadAccount();
    }

    componentDidMount() {
        this.checkAndLoadAccount();
    }

    checkAndLoadAccount() {
        if (this.props.account == null && this.props.isAuthorized) {
            this.props.loadAccount();
        }
    }

    onLogout = () => {
        this.props.logout();
    };

    getMenuActivePosition = () => {
        return this.props.history.location.pathname;
    };

    render() {
        const menuButtonClasses = 'main-menu-button button-color-one';
        const menuActiveButtonClasses = 'main-menu-button button-color-one-selected';
        const menuButtonStyle = {
            width: 100 / 5 + "%",
            cursor: "pointer"
        };
        return (
            <Fragment>
                <Row className="justify-content-center">
                    <Link to='/schedule' style={menuButtonStyle} className={this.getMenuActivePosition() === '/schedule' ? menuActiveButtonClasses : menuButtonClasses}>Расписание</Link>
                    <Link to='/getMostExpectedFilms' style={menuButtonStyle} className={this.getMenuActivePosition() === '/getMostExpectedFilms' ? menuActiveButtonClasses : menuButtonClasses}>Ожидаемые фильмы</Link>
                    <Link to='/vacancies' style={menuButtonStyle} className={this.getMenuActivePosition() === '/vacancies' ? menuActiveButtonClasses : menuButtonClasses}>Вакансии</Link>
                    <Link to='/profile' style={menuButtonStyle} className={this.getMenuActivePosition() === '/profile' ? menuActiveButtonClasses : menuButtonClasses}>Личный кабинет</Link>
                    <Button style={menuButtonStyle} className="main-menu-button btn-danger" onClick={this.onLogout}>Выйти</Button>
                </Row>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    isAuthorized: state.isAuthorized,
    account: state.account
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {logout, loadAccount},
    dispatch
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuBar));