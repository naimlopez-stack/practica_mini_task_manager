// ==================== FAKE DB (NO MODIFICAR) ====================
const db = {
  users: [
    { id: 1, name: 'Ana' },
    { id: 2, name: 'Luis' }
  ],
  tasks: [
    { id: 101, userId: 1, title: 'Preparar reporte', done: false },
    { id: 102, userId: 1, title: 'Enviar correo', done: true },
    { id: 103, userId: 2, title: 'Revisar PR', done: false }
  ]
};

// Simula latencia de red
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ==================== FAKE API (COMPLETAR) ====================

// 1) Obtener usuario por ID
const apiGetUserById = async (userId) => {
  await wait(300);
  const query = db.users.find(user => user.id === userId);
  if (query) {
    return query;
  } else {
    throw new Error('Usuario no encontrado');
  }
};


// 2) Obtener tareas por userId
const apiGetTasksByUserId = async (userId) => {
  await wait(300);
  const query = db.tasks.filter(task => task.userId === userId);
  if (query) {
    return query;
  } else {
    throw new Error('No se pueden traer las tareas por que el usuario no existe');
  }
};

// 3) Crear tarea
const apiCreateTask = async ({ userId, title }) => {
  await wait(300);
  if (!title) {
    console.log(title);
    throw new Error('Título inválido (mínimo 3 caracteres)');
  }

  const user = await apiGetUserById(userId);
  if (!user) {
    throw new Error('No puedes crear tareas para un usuario inexistente');
  }
  const newTask = {
    id: Date.now(),
    userId,
    title: title.trim(),
    done: false
  };
  db.tasks.push(newTask);
  console.log(`Se ha creado la tarea: "${newTask.title}" exitosamente`);

  return newTask;
};

// 4) Completar tarea
const apiCompleteTask = async (taskId) => {
  await wait(300);
  const task = db.tasks.find(task => task.id === taskId);
  if (!task) {
    throw new Error('Tarea no encontrada');
  }
  task.done = true;
  console.log(`¡Felicidades! 
    Se ha completado la tarea: "${task.title}" exitosamente`);
  return task;
};


// ==================== REPORTES (COMPLETAR) ====================

const buildUserSummary = async (userId) => {
  const tasks = await apiGetTasksByUserId(userId);
  const user = await apiGetUserById(userId);

  //Creacion del reporte de usuuario
  const totalTasks = tasks.length;
  const done = tasks.filter(task => task.done).length;
  const pending = totalTasks - done;

  const report = {
    user: user.name,
    totalTasks,
    done,
    pending,
    tasks: tasks.map(task => ({ id: task.id, title: task.title, done: task.done }))
  };

  return report;
};

// ==================== MAIN FLOW (COMPLETAR) ====================

const main = async () => {
  userId = 1;
  try {
    const summaryBefore = await buildUserSummary(userId);
    console.log(summaryBefore);


    const taskPrueba = { userId: 1, title: "Completar documentación de Expeddi" };
    const taskCreada = await apiCreateTask(taskPrueba);

    await apiCompleteTask(taskCreada.id);
    
    const summaryAfter = await buildUserSummary(userId);
    console.log(JSON.stringify(summaryAfter, null, 2));


  } catch (error) {
    throw error;
  }
};

main();