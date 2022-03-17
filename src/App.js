import { motion } from 'framer-motion';
import TaskForm from './components/TaskForm';
import TasksFilter from './components/TasksFilter';
import TasksList from './components/TasksList';
import './styles/style.scss';

function App() {
  return (
    <div className="container">
      <motion.div transition={{duration: .5}} initial={{opacity: 0, y: 300}} animate={{opacity: 1, y: 0 }}className="row mt-4 text-center">
        <div className="col">
          <h1>todo<span className="badge bg-success">list</span></h1>
        </div>
      </motion.div>
      <motion.div transition={{duration: .5, delay: .5}} initial={{opacity: 0}} animate={{ opacity: 1 }}>
        <TaskForm />
        <TasksFilter />
        <TasksList />
      </motion.div>
    </div>
  );
}

export default App;
