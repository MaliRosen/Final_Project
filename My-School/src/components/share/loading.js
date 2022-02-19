import {useSelector} from 'react-redux'
import React, { useState, useEffect } from "react";

export default function Loading(){
    const showLoader =useSelector(state=>{; return state.loader})
    return showLoader? <h1>loading...</h1>:''
}