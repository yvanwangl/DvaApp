import React, { Component, PropTypes } from 'react';
import { Table, message, Popconfirm } from 'antd';
require('./index.css');

const UserList = ({
    total,
    current,
    loading,
    dataSource,
    onPageChange
})=>{
    const columns = [
        {
            title:'姓名',
            dataIndex: 'name',
            key: 'name',
            render: (text)=><a href="#">{text}</a>,
        },
        {
            title:'年龄',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title:'地址',
            dataIndex: 'address',
            key: 'address'
        },
        {
            title:'操作',
            key:'operation',
            render: (text, record)=>(
                <p>
                    <a onClick={()=>{}}>编辑</a>
                    &nbsp;
                    <Popconfirm title="Confirm to delete?" onConfirm={()=>{}}>
                        <a>删除</a>
                    </Popconfirm>
                </p>
            )
        }
    ];

    const pagination = {
        total,
        current,
        pageSize:10,
        onChange:{onPageChange},
    };

    return (
        <div>
            <Table
                columns={columns}
                dataSource={dataSource}
                loading={loading}
                rowKey={record=>record.id}
                pagination={pagination}
            />
        </div>
    );
};
export default UserList;