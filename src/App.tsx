import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import TodoListScreen from './screens/TodoListScreen';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <TodoListScreen />
    </LocalizationProvider>
  );
}

export default App;
