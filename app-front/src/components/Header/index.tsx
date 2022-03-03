import { Button } from 'antd'
import react from 'react'
import style from './style.module.css'


export default function Header(){
    return (
        <div className={style.wrap}>
            <span className={style.logo}>易聘网</span>
            <span>职位</span>
            <span>公司</span>

            <span>铃铛</span>
            <ul>
                <li>个人主页</li>
                <li>退出登录</li>
            </ul>
            <Button>注册</Button>
            <Button>登录</Button>
        </div>
    )
}