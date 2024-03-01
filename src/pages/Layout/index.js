import {Layout, Menu, Popconfirm} from 'antd'
import {
    HomeOutlined,
    DiffOutlined,
    EditOutlined,
    LogoutOutlined,
} from '@ant-design/icons'
import './index.scss'
import {Outlet} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useLocation} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearUserInfo, fetchUserInfo, setToken} from "@/store/slices/user";

const {Header, Sider} = Layout

const items = [
    {
        label: '首页',
        key: '/',
        icon: <HomeOutlined/>,
    },
    {
        label: '文章管理',
        key: '/article',
        icon: <DiffOutlined/>,
    },
    {
        label: '创建文章',
        key: '/publish',
        icon: <EditOutlined/>,
    },
]

const GeekLayout = () => {
    const navigate = useNavigate()
    const onMenuClickHandler = (e) => {
        navigate(e.key)
    }
    const location = useLocation()
    const selectedPath = location.pathname

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchUserInfo())
    },[dispatch])

    const userInfo = useSelector(state => state.user.userInfo)
    const onLogOutConfirmHandler = () => {
        // 1. 清除Token
        dispatch(clearUserInfo())
        // 2. 跳转到首页
        navigate("/login")
    }

    return (
        <Layout>
            <Header className="header">
                <div className="logo"/>
                <div className="user-info">
                    <span className="user-name">{userInfo.name}</span>
                    <span className="user-logout">
            <Popconfirm title="Are you sure you want to log out？" okText="Log Out" cancelText="Cancel" onConfirm={onLogOutConfirmHandler}>
              <LogoutOutlined/> Log Out
            </Popconfirm>
          </span>
                </div>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        theme="dark"
                        selectedKeys={selectedPath}
                        items={items}
                        style={{height: '100%', borderRight: 0}}
                        onClick={onMenuClickHandler}
                    ></Menu>
                </Sider>
                <Layout className="layout-content" style={{padding: 20}}>
                    <Outlet/>
                </Layout>
            </Layout>
        </Layout>
    )
}
export default GeekLayout