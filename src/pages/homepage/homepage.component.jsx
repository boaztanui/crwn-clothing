import React from 'react';

import Directory from '../../components/directory/directory.component';

import {HomepageContainer} from './homepage.styles';

const HomePage = ({history}) => (
    <HomepageContainer className='homepage'>
        <Directory history={history}/>
    </HomepageContainer>
);

export default HomePage;