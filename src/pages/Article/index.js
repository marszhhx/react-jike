import {Link, useNavigate} from 'react-router-dom'
import {Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Popconfirm} from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'

import {Table, Tag, Space} from 'antd'
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import img404 from '@/assets/error.png'
import {useChannel} from "@/hooks/useChannel";
import {useEffect, useState} from "react";
import {deleteArticleAPI, getArticleListAPI} from "@/apis/article";


const {Option} = Select
const {RangePicker} = DatePicker


const Article = () => {

    const {channelList} = useChannel()

    const status = {
        1: <Tag color='warning'>Pending</Tag>,
        2: <Tag color='success'>Approved</Tag>
    }

    // This is a configuration array
    const columns = [
        {
            title: '封面',
            dataIndex: 'cover',
            width: 120,
            render: cover => {
                return <img src={cover.images[0] || img404} width={80} height={60} alt=""/>
            }
        },
        {
            title: '标题',
            dataIndex: 'title',
            width: 220
        },
        {
            title: '状态',
            dataIndex: 'status',
            // data为后端返回的status
            // data === 1 => pending approval
            // data === 2 => approved
            render: data => status[data]
        },
        {
            title: '发布时间',
            dataIndex: 'pubdate'
        },
        {
            title: '阅读数',
            dataIndex: 'read_count'
        },
        {
            title: '评论数',
            dataIndex: 'comment_count'
        },
        {
            title: '点赞数',
            dataIndex: 'like_count'
        },
        {
            title: '操作',
            render: data => {
                return (
                    <Space size="middle">
                        <Button type="primary" shape="circle" icon={<EditOutlined/>} onClick={() => onEditClickHandler(data)}/>
                        <Popconfirm
                            title="Delete the article"
                            description="Are you sure to delete this task?"
                            onConfirm={()=>onDeleteConfirmHandler(data)}
                            okText="Yes"
                            cancelText="No"
                            >
                            <Button
                                type="primary"
                                danger
                                shape="circle"
                                icon={<DeleteOutlined/>}
                            />
                        </Popconfirm>
                    </Space>
                )
            }
        }
    ]
    // // 准备表格body数据
    // const data = [
    //     {
    //         id: '8218',
    //         comment_count: 0,
    //         cover: {
    //             images: [],
    //         },
    //         like_count: 0,
    //         pubdate: '2019-03-11 09:00:00',
    //         read_count: 2,
    //         status: 2,
    //         title: 'wkwebview离线化加载h5资源解决方案'
    //     }
    // ]

    // get article list
    const [articleList, setArticleList] = useState([])
    const [count, setCount] = useState(0)

    async function getArticleList() {
        const res = await getArticleListAPI(reqData)
        setArticleList(res.data.results)
        setCount(res.data.total_count)
    }

    // Filter Article
    const [reqData, setReqData] = useState({
        status: '',
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: '',
        page: 1,
        per_page: 4
    })

    const onFinishHandler = (formData) => {
        setReqData({
            ...reqData,
            channel_id: formData.channel_id,
            status: formData.status,
            begin_pubdate: formData.date[0].format('YYYY-MM-DD'),
            end_pubdate: formData.date[1].format('YYYY-MM-DD'),
        })
    }

    const onPageChangeHandler = (page) => {
        console.log(page)
        setReqData({
            ...reqData,
            page
        })
    }

    const onDeleteConfirmHandler = async (data) => {
        // console.log("delete clicked", data)
        await deleteArticleAPI(data.id)
        // update article list
        setReqData({
            ...reqData
        })
    }

    const navigate = useNavigate()
    const onEditClickHandler = (data) => {
        navigate(`/publish?id=${data.id}`)
    }

    useEffect(() => {
        getArticleList()
    },[reqData])



    return (
        <div>
            <Card
                title={
                    <Breadcrumb items={[
                        {title: <Link to={'/'}>首页</Link>},
                        {title: '文章列表'},
                    ]}/>
                }
                style={{marginBottom: 20}}
            >
                <Form initialValues={{status: ''}} onFinish={onFinishHandler}>
                    <Form.Item label="状态" name="status">
                        <Radio.Group>
                            <Radio value={''}>全部</Radio>
                            <Radio value={0}>草稿</Radio>
                            <Radio value={2}>审核通过</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="频道" name="channel_id">
                        <Select
                            placeholder="请选择文章频道"
                            defaultValue=""
                            style={{width: 120}}
                        >
                            {channelList.map(item => <Option value={item.id} key={item.id}>{item.name}</Option>)}
                        </Select>
                    </Form.Item>

                    <Form.Item label="日期" name="date">
                        {/* 传入locale属性 控制中文显示*/}
                        <RangePicker locale={locale}></RangePicker>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{marginLeft: 40}}>
                            筛选
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
                <Table rowKey="id"
                       columns={columns}
                       dataSource={articleList}
                       pagination={{
                           total: count,
                           pageSize: reqData.per_page,
                           onChange: onPageChangeHandler
                       }}
                />
            </Card>
        </div>
    )
}

export default Article