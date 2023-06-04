import React, {PropsWithChildren} from 'react';
import {ThemeProvider} from 'styled-components';
import useTheme from '@hooking/useTheme';

const Providers = ({children}: PropsWithChildren) => {
    const theme = useTheme();
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
};

export default Providers;
