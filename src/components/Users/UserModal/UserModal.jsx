import React, {Component, PropTypes} from 'react';
import {Form, Input, Modal} from 'antd'
import styles from './index.css';

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 14
    }
};
const UserModal = ({
    item,
    type,
    visible,
    onConfirm,
    onCancel,
    form:{
        getFieldDecorator,
        validateFields,
        getFieldsValue,
    }
})=> {
    function handleConfirm() {
        validateFields((errors)=> {
            if (!!errors) {
                return;
            }
            let data = {...getFieldsValue(), key: item.key};
            onConfirm(data);
        })
    }

    function checkNumber(rule, value, callback) {
        if (!value) {
            callback(new Error("年龄未填写"));
        } else if (!/^[\d]{1,2}$/.test(value)) {
            callback(new Error("年龄不合法"));
        } else {
            callback();
        }
    }

    const modalOpts = {
        title: type == 'create' ? '新增用户' : '修改用户',
        visible,
        onOk: handleConfirm,
        onCancel,
    };
    return (
        <Modal {...modalOpts} className={styles.modal}>
            <Form horizontal>
                <FormItem label='姓名：' hasFeedback {...formItemLayout}>
                    {
                        getFieldDecorator('name', {
                            initialValue: item.name,
                            rules: [
                                {required: true, message: '名称未填写'}
                            ]
                        })(
                            <Input type="text"/>
                        )
                    }
                </FormItem>
                <FormItem label="年龄：" hasFeedback {...formItemLayout}>
                    {
                        getFieldDecorator('age', {
                            initialValue: item.age,
                            rules: [
                                {validator: checkNumber}
                            ]
                        })(
                            <Input type='text'/>
                        )
                    }
                </FormItem>
                <FormItem label='住址：' hasFeedback {...formItemLayout}>
                    {
                        getFieldDecorator('address', {
                            initialValue: item.address,
                            rules: [
                                {required: true, message: '不能为空'}
                            ]
                        })(
                            <Input type="address"/>
                        )
                    }
                </FormItem>
            </Form>
        </Modal>
    );
};

UserModal.propTypes = {
    visible: PropTypes.any,
    form: PropTypes.object.isRequired,
    item: PropTypes.object,
    type: PropTypes.any,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
};

export default Form.create()(UserModal);