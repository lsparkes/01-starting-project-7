import { useState } from 'react';
import NewProject from './components/NewProject.jsx';
import NoProjectSelected from './components/NoProjectSelected.jsx';
import ProjectsSidebar from './components/ProjectsSidebar.jsx';
import SelectedProject from './components/SelectedProject.jsx'; 

function App() {
  const [ projectState, setProjectState ] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  function handleAddTask(text) {
    setProjectState(prevState => {
      const newTask = {
        ...prevState,
        id: Math.random().toString(),
        text: text,
        projectId: prevState.selectedProjectId,
      }
      return {
        ...prevState,
        tasks: [
          ...prevState.tasks,
          newTask
        ],
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter(task => task.id !== id),
      };
    }); 
  }

  function handleSelectProject(id) {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  function handleStartAddProject() {
      setProjectState(prevState => {
        return  {
          ...prevState,
          selectedProjectId: null,
        };
      });
    }


  function handleAddProject(projectData) {
    setProjectState(prevState => {
      const newProject = {
        ...projectData,
        id: Math.random().toString(),
      }
      return {
        ...prevState,
        projects: [
          ...prevState.projects,
          newProject
        ],
        selectedProjectId: undefined,
      };
    });
  }

  function handleCancelAddProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleDeleteProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        projects: prevState.projects.filter(project => project.id !== prevState.selectedProjectId),
        selectedProjectId: undefined,
      };
    }); 
  }


  const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId);

  let content = (
    <SelectedProject  
      project={selectedProject} 
      onDelete={handleDeleteProject}  
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectState.tasks}
    />
  );

  if (projectState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject}  onCancel={handleCancelAddProject} />;
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  // Render the main layout with sidebar and content
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar  
        onStartAddProject ={handleStartAddProject} 
        projects={projectState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectState.selectedProjectId}
      />
     {content}
    </main>
  );
}

export default App;
