import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { shallow, mount } from 'enzyme';
import App from './App';

/**
 This course is not designed to teach Test Driven Development.
 Feel free to use this file to test your application, but it
 is not required.
**/

describe('App component', () => {

    it('renders without crashing', () => {
        const wrapper = shallow(<App />);
    })

    it('renders 3 shelves for books', () => {
        const mountWrapper = mount(<BrowserRouter><App /></BrowserRouter>);
        const currently = <h2 className="bookshelf-title">Currently Reading</h2>;
        const wantToRead = <h2 className="bookshelf-title">Want to Read</h2>
        const read = <h2 className="bookshelf-title">Read</h2>

        expect(mountWrapper.contains(currently)).toEqual(true);
        expect(mountWrapper.contains(wantToRead)).toEqual(true);
        expect(mountWrapper.contains(read)).toEqual(true);
    })

})
