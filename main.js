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
  if (!title || title.trim().length < 3) {
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
  return newTask;
};

// 4) Completar tarea
const apiCompleteTask = async (taskId) => {
  // TODO:
  // - Esperar 300ms
  // - Buscar la tarea en db.tasks por id
  // - Si no existe => lanzar Error('Tarea no encontrada')
  // - Si existe => cambiar done a true
  // - Retornar la tarea actualizada
};

console.log(db.tasks);

console.log(db.tasks);

// ==================== REPORTES (COMPLETAR) ====================

// Construye resumen de un usuario
const buildUserSummary = async (userId) => {
  // TODO:
  // - Obtener el usuario con apiGetUserById(userId)
  // - Obtener tareas con apiGetTasksByUserId(userId)
  // - Calcular:
  //   - totalTasks = tareas.length
  //   - done = cuántas tienen done === true
  //   - pending = totalTasks - done
  // - Retornar un objeto con la forma:
  //   {
  //     user: user.name,
  //     totalTasks,
  //     done,
  //     pending,
  //     tasks: [{ id, title, done }, ...]
  //   }
};

// ==================== MAIN FLOW (COMPLETAR) ====================

const main = async () => {
  // TODO:
  // - Envolver todo en try/catch
  // - Elegir un userId (por ejemplo 1)
  // - Obtener summaryBefore (buildUserSummary)
  // - Crear una nueva tarea (apiCreateTask)
  // - Completar esa tarea (apiCompleteTask)
  // - Obtener summaryAfter (buildUserSummary)
  // - Construir report final
  // - Imprimir el reporte con JSON.stringify(report, null, 2)
};

main();