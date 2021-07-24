import React, { useState, useEffect } from "react"
import Chart from "react-google-charts";
import { getBarData } from "../../Services/adminServices";

function ChoicesChart(){

    const [data,setData]=useState([{uid:1,name:"غزل و نسيج",first_count:20,second_count:10,third_count:3,fourth_count:9,fifth_count:13,sixth_count:40,seventh_count:15},
                                    {uid:2,name:"ميكانيكا انتاج",first_count:10,second_count:0,third_count:25,fourth_count:7,fifth_count:3,sixth_count:45,seventh_count:20},
                                    {uid:3,name:"ميكانيكا أجهزة",first_count:30,second_count:10,third_count:9,fourth_count:15,fifth_count:13,sixth_count:20,seventh_count:13},
                                    {uid:4,name:"كهرباء تحكم آلي",first_count:14,second_count:10,third_count:16,fourth_count:10,fifth_count:25,sixth_count:30,seventh_count:5},
                                    {uid:5,name:"كهرباء الكترونيات",first_count:2,second_count:30,third_count:7,fourth_count:40,fifth_count:13,sixth_count:4,seventh_count:14},
                                    {uid:6,name:"عمارة",first_count:20,second_count:10,third_count:28,fourth_count:20,fifth_count:13,sixth_count:4,seventh_count:15},
                                    {uid:7,name:"مدني",first_count:50,second_count:18,third_count:3,fourth_count:17,fifth_count:13,sixth_count:4,seventh_count:5}])
    

    useEffect( () =>{
        // get request
        // getBarData().then( response => {
        //     setData(response.data);
        // })
    },[data])
    
    return(
        <Chart
            width={'1200px'}
            height={'600px'}
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={[
                ['القسم','الرغبة الاولي','الرغبة الثانية','الرغبة الثالثة','الرغبة الرابعة','الرغبة الخامسة','الرغبةالسادسة','الرغبة السابعة'],
                [data[0].name, data[0].first_count, data[0].second_count,data[0].third_count,data[0].fourth_count,data[0].fifth_count,data[0].sixth_count,data[0].seventh_count],
                [data[1].name, data[1].first_count, data[1].second_count,data[1].third_count,data[1].fourth_count,data[1].fifth_count,data[1].sixth_count,data[1].seventh_count],
                [data[2].name, data[2].first_count, data[2].second_count,data[2].third_count,data[2].fourth_count,data[2].fifth_count,data[2].sixth_count,data[2].seventh_count],
                [data[3].name, data[3].first_count, data[3].second_count,data[3].third_count,data[3].fourth_count,data[3].fifth_count,data[3].sixth_count,data[3].seventh_count],
                [data[4].name, data[4].first_count, data[4].second_count,data[4].third_count,data[4].fourth_count,data[4].fifth_count,data[4].sixth_count,data[4].seventh_count],
                [data[5].name, data[5].first_count, data[5].second_count,data[5].third_count,data[5].fourth_count,data[5].fifth_count,data[5].sixth_count,data[5].seventh_count],
                [data[6].name, data[6].first_count, data[6].second_count,data[6].third_count,data[6].fourth_count,data[6].fifth_count,data[6].sixth_count,data[6].seventh_count],
            ]}
            options={{
                title: ' عدد طلبات الالتحاق بكل قسم حسب الرغبة ',
                chartArea: { width: '60%' },
                isStacked: true,
                hAxis: {
                title: 'مجموع طلبات الالتحاق',
                minValue: 0,
                },
                vAxis: {
                title: 'القسم',
                },
            }}
            // For tests
            rootProps={{ 'data-testid': '3' }}
        />
    )
}

export default ChoicesChart;