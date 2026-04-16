//====================Configuración====================

const LATENCIA_MAXIMA = 0;
const TIEMPO_MAXIMO_DE_ESPERA = 5;


const apiDePrueba = {
  "tasks": [
    {
      "id": "tk-101",
      "title": "Aprender Async/Await en JS",
      "description": "Dominar el uso de try/catch y la lógica de promesas para evitar el callback hell.",
      "status": "pending",
      "priority": "high",
      "createdAt": "2023-10-25T10:00:00Z",
      "dueDate": "2023-10-30T23:59:59Z",
      "tags": ["javascript", "learning", "backend"],
      "assignedTo": {
        "userId": "u-55",
        "name": "Programador Pro"
      }
    },
    {
      "id": "tk-102",
      "title": "Diseñar interfaz de usuario",
      "description": "Crear los mockups en Figma para la vista de dashboard principal.",
      "status": "pending",
      "priority": "medium",
      "createdAt": "2023-10-26T08:30:00Z",
      "dueDate": "2023-11-05T18:00:00Z",
      "tags": ["design", "frontend", "ui/ux"],
      "assignedTo": null
    },
    {
      "id": "tk-103",
      "title": "Corregir bug de login",
      "description": "El sistema no maneja correctamente cuando el servidor devuelve un error 500.",
      "status": "completed",
      "priority": "critical",
      "createdAt": "2023-10-20T12:00:00Z",
      "completedAt": "2023-10-22T09:15:00Z",
      "tags": ["bug", "security"],
      "assignedTo": {
        "userId": "u-12",
        "name": "Ana Dev"
      }
    }
  ],
  "metadata": {
    "totalTasks": 3,
    "version": "1.0.4"
  }
}

//================================== Comportamiento Back de la APP ======================================

const generarLatencia = (data) =>{
  
  return new Promise((resolve, reject) => {
    
    const latencia = (Math.floor(Math.random() * LATENCIA_MAXIMA) + 1)* 1000;
    
    if(latencia > TIEMPO_MAXIMO_DE_ESPERA * 1000){
      setTimeout(() => reject(`El tiempo de espera (${latencia/1000}s) fue demasiado largo, intentelo nuevamente`), latencia);
    }else{
      setTimeout(() => resolve(data), latencia);
    }
  });
};



//====================================== Funciones ======================================

const conectarBd = async () =>{
  try {
    console.log(`Conectando con la base de datos...`);
    const res = await generarLatencia(apiDePrueba);
    console.log(`Se han obtenido los datos correctamente`);
    return res
  } catch (error) {
    console.log("Ha ocurrido un error")
    throw error;
  }
}

const generarReporte = async (obj) => {
  const data = await obj;
  const reporte = {};
  const tareasCompletadas = obj.tasks.filter(task=> task.status === "completed").map(task => task.title);
  const tareasPendientes = obj.tasks.filter(task=> task.status === "pending").map(task => task.title);

  reporte.tareasCompletadas = tareasCompletadas;
  reporte.tareasPendientes = tareasPendientes;

  return reporte;
}

const crearTarea = async (nuevaTarea, listaActual) => {
  try {
    const camposObligatorios = ["id", "title", "status", "priority"];
    
    for (const campo of camposObligatorios) {
      if (!nuevaTarea[campo]) {
        throw new Error(`El campo '${campo}' es obligatorio para crear la tarea.`);
      }
    }


    await generarLatencia();

    listaActual.tasks.push(nuevaTarea);

    console.log(`--------------------------------------------------`);
    console.log(`Tarea "${nuevaTarea.title}" añadida correctamente.`);
    console.log(`--------------------------------------------------`);
    return listaActual;

  } catch (error) {
    throw error; 
  }
};



//Implementación secuencial

const main = async () =>{
  let data = await conectarBd();
  const reporte = await generarReporte(data);
  console.log(reporte);
  await new Promise(resolve => setTimeout(resolve, 2000));
  console.log("Añadiendo nueva tarea");

  const tareaNueva = {
      id: "tk-104",
      title: "Configurar Servidor de Producción",
      description: "Subir la App a AWS.",
      status: "pending",
      priority: "high",
      createdAt: new Date().toISOString()
    };

  data = await crearTarea(tareaNueva, data);


}


//Inicialización

main();