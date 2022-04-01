职位、公司分别搜索（搜索框选择搜索条件），分两个页面

在线聊天：

- 按照时间顺序显示聊天内容
- 判断是对方还是自己 自己在右侧 颜色加深
- 按照图片来做
- 联系人列表：姓名、头像、公司、职位、最后发消息时间、是否含有未读消息
- 对话框内容：获取所有的对话信息（时间、头像、内容），对象数组

```js
// 对话信息列表
{
    user1:'xxx'
    user2:'xxx'
    contentList:[
        {
            id:'xxx',
            time:2022-3-20 15:28:19,
            content:'hello!I am here.'
            user:'xxx'// userId
        },{
            ...
        }
    ]
    user1Read:true
    user2Read:true
}   

```
