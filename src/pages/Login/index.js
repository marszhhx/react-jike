import './index.scss'
import {Card, Form, Input, Button, message} from 'antd'
import logo from '@/assets/logo.png'
import {fetchLogin} from "@/store/slices/user";

import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onFinishHandler = async (values) => {
        await dispatch(fetchLogin(values))
        navigate('/')
        message.success('Login Successful!')
    }

    return (
        <div className="login">
            <Card className="login-container">
                <img className="login-logo" src={logo} alt="" />
                {/* 登录表单 */}
                <Form validateTrigger="onBlur" onFinish={onFinishHandler}>
                    <Form.Item
                        name="mobile"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone number',
                            },
                            {
                                pattern: /^1[3-9]\d{9}$/,
                                message: 'Please enter valid phone number',
                            },
                        ]}
                    >
                        <Input size="large" placeholder="enter your phone number" />
                    </Form.Item>
                    <Form.Item
                        name="code"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter valid verification code',
                            },
                            {
                                pattern: /^\d{6}$/,
                                message: 'Should be 6 digits',
                            },
                        ]}>
                        <Input size="large" placeholder="enter verification code" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login