import React, { useEffect, useState } from "react"
import './TansiqModal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import getUserChoices from "../../Services/userServices"
import getIsEnabled from "../../Services/adminServices";

function TansiqModal(props){

    const drag = <FontAwesomeIcon icon={faBars} color="#f5ba13"/>
    // const [majors,setMajors] = useState([{name:"ميكانيكا انتاج",uid:1},{name:"ميكانيكا أجهزة",uid:2},{name:"كهرباء تحكم آلي",uid:3},{name:"كهرباء الكترونيات",uid:4},{name:"عمارة",uid:5},{name:"مدني",uid:6},{name:"غزل و نسيج",uid:7}])
    const [majors,setMajors] = useState([{name:" ",uid:1},{name:" ",uid:2},{name:"  ",uid:3},{name:" ",uid:4},{name:"",uid:5},{name:"",uid:6},{name:"  ",uid:7}])
    // const [majors,setMajors] = useState([])
    const [majorsOrder,setMajorsOrder] = useState([])
    const array = [0,1,2,3,4,5,6]
    const [isEnabled , setIsEnabled] = useState(true)

    // dragging behaviour
    useEffect( () =>{

        // get requests
        // getIsEnabled().then( response => {
        //     setIsEnabled(response.data);
        // })
        // getUserChoices().then( response => {
        //     setMajors(response.data);
        // }) 
        
        // (async () => {
        //     const response = await getIsEnabled();
        //     setIsEnabled(response.data.is_enabled);
        //   })(); 

        (async () => {
            const response = await getUserChoices();
            setMajors(response.data);
          })();

        if (isEnabled == true){

        (function dragBehaviour() {
        "use strict";
        
        const table = document.getElementById('drag-table');
        const tbody = table.querySelector('tbody');

        function init() {
            bindMouse();
        }
        
        var currRow = null,
            dragElem = null,
            mouseDownX = 0,
            mouseDownY = 0,         
            mouseX = 0,
            mouseY = 0,      
            mouseDrag = false;  
        

        
        function bindMouse() {
            document.addEventListener('mousedown', (event) => {
            if(event.button != 0) return true;
            
            let target = getTargetRow(event.target);
            if(target) {
                currRow = target;
                addDraggableRow(target);
                currRow.classList.add('is-dragging');


                let coords = getMouseCoords(event);
                mouseDownX = coords.x;
                mouseDownY = coords.y;      

                mouseDrag = true;   
            }
            });
            
            document.addEventListener('mousemove', (event) => {
            if(!mouseDrag) return;
            
            let coords = getMouseCoords(event);
            mouseX = coords.x - mouseDownX;
            mouseY = coords.y - mouseDownY;  
            
            moveRow(mouseX, mouseY);
            reOrder()
            });
            
            document.addEventListener('mouseup', (event) => {
            if(!mouseDrag) return;
            
            currRow.classList.remove('is-dragging');
            table.removeChild(dragElem);
            
            dragElem = null;
            mouseDrag = false;
            });    
        }
        
        
        function swapRow(row, index) {
            let currIndex = Array.from(tbody.children).indexOf(currRow),
                row1 = currIndex > index ? currRow : row,
                row2 = currIndex > index ? row : currRow;
                
            tbody.insertBefore(row1, row2);
            // reOrder()
        }
            
        function moveRow(x, y) {
            dragElem.style.transform = "translate3d(" + x + "px, " + y + "px, 0)";
            
            let	dPos = dragElem.getBoundingClientRect(),
                currStartY = dPos.y, currEndY = currStartY + dPos.height,
                rows = getRows();

            for(var i = 0; i < rows.length; i++) {
            let rowElem = rows[i],
                rowSize = rowElem.getBoundingClientRect(),
                rowStartY = rowSize.y, rowEndY = rowStartY + rowSize.height;

            if(currRow !== rowElem && isIntersecting(currStartY, currEndY, rowStartY, rowEndY)) {
                if(Math.abs(currStartY - rowStartY) < rowSize.height / 2)
                swapRow(rowElem, i);
            }
            }    
        }
        
        function addDraggableRow(target) {    
            dragElem = target.cloneNode(true);
            dragElem.classList.add('draggable-table__drag');
            dragElem.style.height = getStyle(target, 'height');
            dragElem.style.background = getStyle(target, 'backgroundColor');     
            for(var i = 0; i < target.children.length; i++) {
                let oldTD = target.children[i],
                    newTD = dragElem.children[i];
                newTD.style.width = getStyle(oldTD, 'width');
                newTD.style.height = getStyle(oldTD, 'height');
                newTD.style.padding = getStyle(oldTD, 'padding');
                newTD.style.margin = getStyle(oldTD, 'margin');
            }      
            
            table.appendChild(dragElem);

            
            let tPos = target.getBoundingClientRect(),
                dPos = dragElem.getBoundingClientRect();
            dragElem.style.bottom = ((dPos.y - tPos.y) - tPos.height) + "px";
            dragElem.style.left = "-1px";    
            
            document.dispatchEvent(new MouseEvent('mousemove',
                { view: window, cancelable: true, bubbles: true }
            ));    
        }  
        
        function getRows() {
            return table.querySelectorAll('tbody tr');
        }    
        
        function getTargetRow(target) {
            let elemName = target.tagName.toLowerCase();

            if(elemName == 'tr') return target;
            if(elemName == 'td') return target.closest('tr');     
        }
        
        function getMouseCoords(event) {
            return {
                x: event.clientX,
                y: event.clientY
            };    
        }  
        
        function getStyle(target, styleName) {
            let compStyle = getComputedStyle(target),
                style = compStyle[styleName];

            return style ? style : null;
        }  
        
        function isIntersecting(min0, max0, min1, max1) {
            return Math.max(min0, max0) >= Math.min(min1, max1) &&
                    Math.min(min0, max0) <= Math.max(min1, max1);
        } 
        
        function reOrder(){
            var table = document.getElementsByTagName('table')[0],
            rows = table.getElementsByTagName('tr'),
            orders = table.getElementsByClassName('order'),
            text = 'textContent' in document ? 'textContent' : 'innerText';


            for (var i = 0, len = orders.length; i < len; i++) {
                if (i != 0){
                    rows[i].children[1][text] = 'الرغبة ' + i;}
            }
        }
        
        init();
        
        })();
    }

        

    },[isEnabled])//end of useEffect

    //get current order
    function getOrder(){
        const newOrder = document.getElementsByClassName('order')
        array.forEach( index =>{
            const currentElement = newOrder[index]
            const id = currentElement.getAttribute('data-id');
            // setMajorsOrder(majorsOrder => [...majorsOrder,id]);
            majorsOrder.push(parseInt(id))
        })
        props.onConfirm(majorsOrder);
    }

    return(
        <div className="modal__backdrop" >
            <div className="modal__container">
                {!isEnabled && <span className="close" onClick={props.onClose}>&times;</span>}
                {/* Header */}
                <h1 className="modal__title">يرجي ترتيب الرغبات حسب الاولوية</h1>
                {/* body */}
                {isEnabled? 
                <>
                <div className="responsive-table">
                    <table id="drag-table" className="draggable-table">
                        <thead>
                            <tr>
                                <th>الرغبات</th>
                                <th>الترتيب</th>
                            </tr>
                        </thead>
                        <tbody >
                            <tr>
                                <td>{majors[0].name}</td>
                                <td className="order" data-id={majors[0].uid}>الرغبة 1</td>
                            </tr>
                            <tr>
                                <td>{majors[1].name}</td>
                                <td className="order" data-id={majors[1].uid}>الرغبة 2</td>
                            </tr>
                            <tr>
                                <td>{majors[2].name}</td>
                                <td className="order" data-id={majors[2].uid}>الرغبة 3</td>
                            </tr>
                            <tr>
                                <td>{majors[3].name}</td>
                                <td className="order" data-id={majors[3].uid}>الرغبة 4</td>
                            </tr>
                            <tr>
                                <td>{majors[4].name}</td>
                                <td className="order" data-id={majors[4].uid}>الرغبة 5</td>
                            </tr>
                            <tr>
                                <td>{majors[5].name}</td>
                                <td className="order" data-id={majors[5].uid}>الرغبة 6</td>
                            </tr>
                            <tr>
                                <td>{majors[6].name}</td>
                                <td className="order" data-id={majors[6].uid}>الرغبة 7</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p id="remark">*اسحب الرغبة الي مكانها المناسب، ثم احفظ التغيرات.</p>
                {/* submit button */}
                <button id="confirm" type="button" onClick={ () =>{
                    getOrder();}}>
                    حفظ التغيرات
                </button>
                </>
                :
                <p id="para">تم غلق التنسيق</p>
                }
            </div>
        </div>
    );
}

export default TansiqModal;