import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Homepage from './screens/Homepage';
import theme from './theme';

const queryClient = new QueryClient();

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <QueryClientProvider client={queryClient}>
                <Homepage />
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export default App;
