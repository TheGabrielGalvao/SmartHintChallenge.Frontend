import { BrowserRouter } from 'react-router-dom'
import './styles/global.css'
import { AppRoutes } from './config/AppRoutes';
import { RootLayout } from './components/templates/RootLayout';
import { QueryClient, QueryClientProvider } from 'react-query';
import { LayoutProvider } from './context/LayoutProvider';

function App() {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <LayoutProvider>
          <AppRoutes />
        </LayoutProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
