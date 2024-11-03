import React from 'react';
import { Button } from 'antd';
import { useNavigate } from "react-router-dom";
import './NotFound.scss'; // Import the new CSS

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <h1 className="not-found-title">404</h1>
                <p className="not-found-subtitle">Oops! The page you're looking for doesn't exist.</p>
                <p className="not-found-text">
                    It seems you’ve found a broken link or entered a URL that doesn’t exist on this site.
                </p>
                <Button
                    type="primary"
                    size="large"
                    className="not-found-button"
                    onClick={() => navigate('/')}
                >
                    Go Back to Home
                </Button>
            </div>
        </div>
    );
};

export default NotFound;
