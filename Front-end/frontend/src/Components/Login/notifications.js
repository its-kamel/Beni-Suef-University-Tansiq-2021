import React from 'react';
import ReactDom from 'react-dom';
import Popup from 'react-popup';

ReactDom.render(
    <Popup />,
    document.getElementById('popupContainer')
);

Popup.alert('I am alert, nice to meet you');
