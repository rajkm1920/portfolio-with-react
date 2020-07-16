import React, { Component } from 'react'
import HeaderUi from './Header.container'
import $ from 'jquery'
import ProfileSettingPopup from '../../presentational/Layout/ProfileSetting.popup'
import SideNavUi from './SideNav.container'
import { STRING } from '../../../utils/Constant'
import Route from '../../../Layout/Routes'
import { ToastContainer } from 'react-toastify';
import GlobalSearchPage from '../Includes/GlobalSearch.container'
import { globalSearchApi, logoutApi } from '../actionCreator'
import LocalStore from '../../../utils/localStorageUtil'

class PageLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dashboardMenuState: false,
            profileSettingState: false,
            pageTitle: STRING.HOME,
            mainMenuState: false,
            AdvanceSearchPageState: false,
            globalSearchState: false,
            globalSearchData: '',
            globalSearching: ''
        }
    }

    componentDidMount() {
        if(LocalStore.getFromLocalStorage('access_token') === null){
            this.props.history.push(Route.LOGIN)
        }
    }

    render() {
        return (
            <div className={"full-height kognetics-theme Karla"}>
                <HeaderUi
                    dashboardSettingHandler={this.dashboardSettingHandler.bind(this)}
                    profileSettingHandler={this.profileSettingHandler.bind(this)}
                    mainMenuHandler={this.mainMenuHandler.bind(this)}
                    globalSearchHandler={this.globalSearchHandler.bind(this)}
                    AdvanceSearchPageHandler={this.AdvanceSearchPageHandler.bind(this)}
                    activeClassName={this.state.activeClassName}
                    getPageTitle={this.getPageTitle.bind(this)}
                    globalPageHandler={this.globalPageHandler.bind(this)}
                    globalSearching={this.state.globalSearching}
                />
                {this.state.profileSettingState ?
                    <ProfileSettingPopup
                        logoutHandler={this.logoutHandler.bind(this)}
                    />
                    : null}
                <div className="d-flex" style={{ height: 'calc(100% - 50px)' }}>
                    <SideNavUi
                        getPageTitle={this.getPageTitle.bind(this)}
                        mainMenuState={this.state.mainMenuState}
                    />
                    <div className="full-width full-height overflow-auto">
                        {/* <div className="breadcrumb">{this.state.pageTitle}</div> */}
                        <div className="pt-15px" style={{ height: "calc(100% )" }} onClick={this.closeAllPopupHandler.bind(this)}>
                            {this.state.globalSearchState ?
                                <GlobalSearchPage
                                    globalPageHandler={this.globalPageHandler.bind(this)}
                                    globalSearchData={this.state.globalSearchData}
                                    history={this.props.history}
                                />
                                : this.props.children}
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        )
    }

    globalPageHandler(e, val) {
        this.setState({
            globalSearchState: val,
            globalSearching: !val ? '' : this.state.globalSearching
        })
    }

    AdvanceSearchPageHandler() {
        this.setState({ AdvanceSearchPageState: !this.state.AdvanceSearchPageState })
    }

    globalSearchHandler(e) {
        globalSearchApi(e.target.value, callBack => {
            this.setState({
                globalSearchData: callBack
            })
        }, e => {

        })
        this.setState({
            globalSearching: e.target.value
        })
    }

    closeAllPopupHandler() {
        this.setState({
            profileSettingState: false,
            dashboardMenuState: false,
            activeClassName: ''
        })
    }

    getPageTitle(e, title) {
        if (title !== "") {
            this.setState({ pageTitle: title })
        }
        this.globalPageHandler(e, false)
    }

    mainMenuHandler() {
        this.setState({
            mainMenuState: !this.state.mainMenuState
        })
    }

    dashboardSettingHandler() {
        this.setState({
            dashboardMenuState: !this.state.dashboardMenuState
        }, () => {
            if (this.state.dashboardMenuState) {
                $("#drawer-content").animate({ "margin-right": 0 }, "slow");
            } else {
                $("#drawer-content").animate({ "margin-right": -250 }, "slow");
            }
        })
    }

    profileSettingHandler(type) {
        if (type === STRING.USER_MGMNT) {
            this.setState({
                profileSettingState: !this.state.profileSettingState,
            })
        } else {
            this.setState({
                profileSettingState: false,
            })
        }
        this.setState({
            activeClassName: type
        })
    }

    logoutHandler() {
        logoutApi(callBack => {

        }, e => {

        })
        this.props.history.push(Route.LOGIN)
        LocalStore.deleteFromLocalStorage('access_token')
    }
}

export default PageLayout;