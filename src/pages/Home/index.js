import * as echarts from 'echarts';
import {useEffect, useRef} from "react";
import BarChart from "@/pages/Home/components/BarChart";

const Home = () => {

    return <div>
        <BarChart title={"Title 1"}/>
        <BarChart title={"Title 2"}/>
    </div>
}

export default Home