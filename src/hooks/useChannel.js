import {useEffect, useState} from "react";
import {getChannelAPI} from "@/apis/article";

const useChannel = () => {

    const [channelList, setChannelList] = useState([]);
    const getChannelList = async () => {
        const res = await getChannelAPI();
        setChannelList(res.data.channels)
    }
    useEffect(() => {
        getChannelList()
    },[])

    return {
        channelList
    }
}

export { useChannel}