import React, {Component, PropTypes} from 'react';
import {Form, Input, Select, Button} from 'antd';
import styles from './index.css';
const FormItem = Form.Item;
const Option = Select.Option;

const UserSearch = ({
    field,
    keyword,
    onSearch,
    onAdd,
    form:{
        getFieldDecorator,
        getFieldsValue,
        validateFields
    },
})=> {
    function onSubmit(e) {
        e.preventDefault();
        validateFields((errors)=> {
            if (!!errors) {
                return false;
            }
            onSearch(getFieldsValue());
        })
    }

    return (
        <div className={styles.normal}>
            <div className={styles.search}>
                <Form inline onSubmit={onSubmit}>
                    <FormItem>
                        {
                            getFieldDecorator('field', {
                                initialValue: field || 'name'
                            })(
                                <Select>
                                    <Option value='name'>姓名</Option>
                                    <Option value='address'>地址</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem>
                        {
                            getFieldDecorator('keyword', {
                                initialValue: keyword || ''
                            })(
                                <Input type="text"/>
                            )
                        }
                    </FormItem>
                    <Button style={{marginRight: '20px'}} type="primary" htmlType='submit'>搜索</Button>
                </Form>
            </div>
            <div className={styles.create}>
                <Button type='ghost' onClick={onAdd}>添加</Button>
            </div>
        </div>
    );
};

UserSearch.propTypes = {
    form: PropTypes.object.isRequired,
    onSearch: PropTypes.func,
    onAdd: PropTypes.func,
    field: PropTypes.string,
    keyword: PropTypes.string
};

export default Form.create()(UserSearch);