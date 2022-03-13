import {useSelector} from 'react-redux'
import React, { useState, useEffect } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import './share.css'

export default function Loading(){
    const showLoader =useSelector(state=>{; return state.loader})

    return  showLoader? <div className="loader-backdrop"> <CircularProgress disableShrink /></div>: ''
  
}