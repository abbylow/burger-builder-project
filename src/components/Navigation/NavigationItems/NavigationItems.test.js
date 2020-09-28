import React from 'react';

import { configure, shallow } from 'enzyme'; //use for unit test / isolated test (can test w/o entire react app)
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

// first argument of describe: description of this test bundle (appear in console)
// second argument of describe: testing function
describe('<NavigationItems/>', () => {
    let wrapper;

    beforeEach(() => {
    // shallow rendering: don't render the full component tree 
        wrapper = shallow(<NavigationItems />);
    });

    // first argument of it: description (appear in console)
    // second argument of it: testing function
    it('should render two <NavigationItems/> elements if not authenticated', () => {
        // find function will find the matched element by using type / css selector
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three <NavigationItems/> elements if authenticated', () => {
        // wrapper = shallow(<NavigationItems isAuth />); //first method to change the prop for the component
        wrapper.setProps({ isAuth: true }); //second method to change the prop for the component
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should render logout navigation elements if authenticated', () => {
        wrapper.setProps({ isAuth: true });
        // contains function will look for exact match, so use exact jsx
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });
})