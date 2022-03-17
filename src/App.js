import TaskForm from './components/TaskForm';
import TasksFilter from './components/TasksFilter';
import TasksList from './components/TasksList';
import './styles/style.scss';

function App() {
  return (
    <div className="container">
      <div className="row mt-4 text-center">
        <div className="col">
          <h1>todo<span className="badge bg-success">list</span></h1>
        </div>
      </div>
      <TaskForm />
      <TasksFilter />
      <TasksList />
    </div>
  );
}

export default App;
