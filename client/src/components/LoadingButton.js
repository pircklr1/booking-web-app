import React from "react";
import { Button } from 'semantic-ui-react';

export default ({
                    isLoading,
                    text,
                    loadingText,
                    className = "",
                    disabled = false,
                    ...props
                }) =>
    <Button
        class="ui loading button"
        disabled={disabled || isLoading}
        {...props}
    >
        {isLoading && <i className="sync alternate icon"></i>}
        {!isLoading ? text : loadingText}
    </Button>;