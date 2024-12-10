import { QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { queryClient } from './config/react-query'
import { Provider } from 'react-redux'
import { store } from './config/redux/store'

function App() {

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <>
          Hello
        </>
      </QueryClientProvider>
    </Provider>
  )
}

export default App
