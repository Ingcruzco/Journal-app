import React from 'react';
import './styles/styles.scss'
import AppRouter from './routers/AppRouter';
import { Provider } from 'react-redux';
import { store } from './store/store';

const JournalApp = () => {
    return (
        <div >
            <Provider store={store}>
                <AppRouter/>    
            </Provider>
        </div>
    );
};

export default JournalApp;