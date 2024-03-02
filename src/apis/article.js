import {request} from "@/utils";

export const getChannelAPI = () => {
    return request({
        url: '/channels',
        method: 'GET',
    })
}


export const publishArticleAPI = (data) => {
    return request({
        url: '/mp/articles?draft=false',
        method: 'POST',
        data
    })
}