import {request} from "@/utils";

export const getChannelAPI = () => {
    return request({
        url: '/channels',
        method: 'GET',
    })
}
