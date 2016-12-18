import expect from 'expect';
import example from '../../models/users';

describe('example', () => {

    describe('reducer', () => {
        it('it should save', () => {
            expect(example.reducers['example/save']({}, {payload: {a: 1}})).toEqual({a: 1});
        });
    })
});
