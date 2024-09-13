import { BrowserRouter } from 'react-router-dom'
import './styles/global.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppRoutes } from './config/AppRoutes';
import { RootLayout } from './components/templates/RootLayout';

function App() {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <RootLayout>
          <AppRoutes />
        </RootLayout>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
