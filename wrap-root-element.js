const React = require('react');
const { ThemeProvider } = require('theme-ui');
const { deep } = require("@theme-ui/presets");

const myTheme = {
    ...deep,
    sizes: { container: 1024 }
};

export const wrapRootElement = ({ element }) => {
    return (
        <ThemeProvider theme={myTheme}>
            {element}
        </ThemeProvider>
    )
}

