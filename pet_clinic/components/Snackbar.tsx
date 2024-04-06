import React from 'react';

interface SnackbarProps {
    text: string;
}

const Snackbar: React.FC<SnackbarProps> = ({ text }) => {
    return <div id="snackbar" className='show'>{text}</div>;
};

export default Snackbar;