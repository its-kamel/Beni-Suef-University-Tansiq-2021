import React, { useState } from "react";
import Chart from "react-google-charts";

function DistributionChart(){

    const [data,setData] = useState([{uid:1,name:"غزل و نسيج",students_count:20},{uid:2,name:"ميكانيكا انتاج",students_count:30},{uid:3,name:"ميكانيكا أجهزة",students_count:12},{uid:4,name:"كهرباء تحكم آلي",students_count:40},{uid:5,name:"كهرباء الكترونيات",students_count:30},{uid:6,name:"عمارة",students_count:15},{uid:7,name:"مدني",students_count:20}])
    
    
    
    return(
        <Chart
            width={'1100px'}
            height={'500px'}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={[
                ['Department', 'Students count'],
                [data[0].name, data[0].students_count],
                [data[1].name, data[1].students_count],
                [data[2].name, data[2].students_count],
                [data[3].name, data[3].students_count],
                [data[4].name, data[4].students_count],
                [data[5].name, data[5].students_count],
                [data[6].name, data[6].students_count],
            ]}
            options={{
                title: 'توزيع الطلاب علي الاقسام',
                // Just add this option
                is3D: true,
            }}
            rootProps={{ 'data-testid': '2' }}
        />
    )
}

export default DistributionChart;