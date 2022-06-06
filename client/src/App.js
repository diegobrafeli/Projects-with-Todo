import "./styles/global.scss";
import { TodoApp } from "./components/TodoApp";
import { TransactionsProvider } from './hooks/useTransactions';

function App() {

  return (
    <TransactionsProvider>
      <TodoApp />
    </TransactionsProvider>
    // <TodoApp />
  );
}

export default App;
