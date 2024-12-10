import { QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { queryClient } from './config/react-query'

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <>
        Hello
      </>
    </QueryClientProvider>
  )
}

export default App
