/**
 * Created by wyf on 2016/12/16.
 */
const qs = require('qs');
const mockjs = require('mockjs');

//数据持久对象
let tableListData = {};
const TOTAL = 100;
const PAGESIZE = 10;
if (!global[Symbol.for('tableListData')]) {
    const data = mockjs.mock({
        [`data|${TOTAL}`]: [{
            'id|+1': 1,
            name: '@cname',
            'age|11-99': 1,
            address: '@region'
        }],
        page: {
            total: TOTAL,
            current: 1
        }
    });
    tableListData = data;
    global[Symbol.for('tableListData')] = tableListData;
} else {
    tableListData = global[Symbol.for('tableListData')];
}

module.exports = {
    'GET /api/users': function (req, res) {
        const page = qs.parse(req.query);
        const pageSize = page.pageSize || PAGESIZE;
        const currentPage = page.page || 1;

        let data;
        let newPage;

        let newData = [...tableListData.data];

        if (page.field) {
            const d = newData.filter((item)=>item[page.field].indexOf(page.keyword) > -1);
            data = d.slice((currentPage - 1) * pageSize, currentPage * pageSize);
            newPage = {
                total: d.length,
                current: currentPage * 1
            };
        } else {
            data = tableListData.data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
            tableListData.page.current = currentPage * 1;
            newPage = {
                current: tableListData.page.current,
                total: tableListData.page.total
            };
        }


        res.json({
            success: true,
            data: data,
            page: newPage
        });
    },
    'POST /api/users': function (req, res) {
        const newData = qs.parse(req.body);

        newData.id = tableListData.data.length + 1;
        tableListData.data.unshift(newData);
        tableListData.page.total += 1;
        tableListData.page.current = 1;

        let data = tableListData.data.slice(0, PAGESIZE);

        res.json({
            success: true,
            data: data,
            page: tableListData.page
        });
        /*global[Symbol.for('tableListData')] = tableListData;*/
    },

    'PUT /api/users': function (req, res) {
        const newData = qs.parse(req.body);
        tableListData.data = tableListData.data.map(function (data) {
            if (data.id == newData.id) {
                return newData;
            }
            return data;
        });

        res.json({
            success: true,
            data: tableListData.data,
            page: tableListData.page
        });
    },

    'DELETE /api/users': function (req, res) {
        const deleteItem = qs.parse(req.body);
        tableListData.data = tableListData.data.filter(function (data) {
            return data.id != deleteItem.id;
        });
        tableListData.page.total -= 1;

        res.json({
            success: true,
            data: tableListData.data,
            page: tableListData.page
        });
    },
};