function createProject(name) {
  return {
    id: Date.now().toString(),
    name,
    todos: [],
  };
}

export default createProject;
