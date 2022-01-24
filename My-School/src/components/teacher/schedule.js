import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import MainMenu from '../mainMenu';
import Avatar from '@material-ui/core/Avatar';
import { connect, useDispatch } from "react-redux";

const Schedule = (props) => {
    const scheduleFromServer = () => {
        //פניה לשרת
    }
    return (<div>
        
        <MainMenu />
        <div>
            {scheduleFromServer()}
        </div>
    </div>
    )
}
const mapStateToProps = (state) => {

    return {
        fname: state.user?.user?.firstName,
    };
};
export default connect(mapStateToProps, {})(Schedule);
