import {request} from "@/utils";

export const getChannelAPI = () => {
    return request({
        url: '/channels',
        method: 'GET',
    })
}

export const getArticleListAPI = (params) => {
    return request({
        url: '/mp/articles',
        method: 'GET',
        params,

    })
}

export const publishArticleAPI = (data) => {
    return request({
        url: '/mp/articles?draft=false',
        method: 'POST',
        data
    })
}

export const deleteArticleAPI = (id) => {
    return request({
        url: `/mp/articles/${id}`,
        method: 'DELETE',
    })
}

export const getArticleById = (id) => {
    return request({
        url: `/mp/articles/${id}`,
        method: 'GET'
    })
}

export const updateArticleAPI = (data) => {
    return request({
        url: `/mp/articles/${data.id}?draft=false`,
        method: 'PUT',
        data
    })
}