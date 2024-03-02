import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'
import { Link } from 'react-router-dom'
import './index.scss'
import {useEffect, useState} from "react";
import {publishArticleAPI, getChannelAPI} from "@/apis/article";

const { Option } = Select

const Publish = () => {
    const [channelList, setChannelList] = useState([]);
    const getChannelList = async () => {
        const res = await getChannelAPI();
        setChannelList(res.data.channels)
    }
    useEffect(() => {
        getChannelList()
    },[])


    const onFinishHandler = (formData) => {
        const {title, content, channel_id} = formData
        const reqData = {
            title,
            content,
            cover: {
                type: 0,
                images: []
            },
            channel_id,
        }
        publishArticleAPI(reqData)
    }

    const [imageList, setImageList] = useState([])
    const onChangeHandler = (imageData) => {
        setImageList(imageData.fileList)
        console.log("uploading...", imageData.fileList)
    }

    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>首页</Link> },
                        { title: '发布文章' },
                    ]}
                    />
                }
            >
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ type: 1 }}
                    onFinish={onFinishHandler}
                >
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: '请输入文章标题' }]}
                    >
                        <Input placeholder="请输入文章标题" style={{ width: 400 }} />
                    </Form.Item>
                    <Form.Item
                        label="Channel"
                        name="channel_id"
                        rules={[{ required: true, message: '请选择文章频道' }]}
                    >
                        <Select placeholder="请选择文章频道" style={{ width: 400 }}>
                            {channelList.map(item => <Option value={item.id} key={item.id}>{item.name}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="封面">
                        <Form.Item name="type">
                            <Radio.Group>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Upload
                            name='image'
                            listType="picture-card"
                            showUploadList
                            action={'http://geek.itheima.net/v1_0/upload'}
                            onChange={onChangeHandler}
                        >
                            <div style={{ marginTop: 8 }}>
                                <PlusOutlined />
                            </div>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        label="Content"
                        name="content"
                        rules={[{ required: true, message: '请输入文章内容' }]}
                    >
                        <ReactQuill
                            className='publish-quill'
                            theme='snow'
                            placeholder='Enter article'
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                发布文章
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Publish