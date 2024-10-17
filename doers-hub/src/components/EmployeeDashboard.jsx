import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, CheckCircle, Clock, User, X } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Progress } from "../components/ui/Progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/Tabs"; 

function EmployeeDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [workHours, setWorkHours] = useState(0);
  const [tasks, setTasks] = useState([
    { id: 1, title: "Completar propuesta de proyecto", completed: false },
    { id: 2, title: "Revisar retroalimentación del cliente", completed: true },
    { id: 3, title: "Reunión de equipo a las 14:00", completed: false },
  ]);
  const [notification, setNotification] = useState(null);
  const [intervalId, setIntervalId] = useState(null); 

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClockInOut = () => {
    if (isClockedIn) {
      clearInterval(intervalId);
      setIntervalId(null);
      showNotification("Has terminado tu jornada");
    } else {
      const interval = setInterval(() => {
        setWorkHours((prevHours) => prevHours + 1 / 3600);
      }, 1000);
      setIntervalId(interval); 
      showNotification("Has iniciado tu jornada");
    }
    setIsClockedIn(!isClockedIn);
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
    const task = tasks.find(t => t.id === taskId);
    showNotification(task.completed ? `Tarea desmarcada: ${task.title}` : `Tarea completada: ${task.title}`);
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="p-8 bg-gradient-to-br from-purple-50 to-indigo-100 min-h-screen">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white/50 backdrop-blur-sm border border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-black">Hora actual</CardTitle>
            <Clock className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">{currentTime.toLocaleTimeString()}</div>
            <p className="text-xs text-black">
              {currentTime.toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white/50 backdrop-blur-sm border border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-black">Horas trabajadas el día {currentTime.toLocaleDateString()}</CardTitle>
            <User className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">{workHours.toFixed(2)} horas</div>
            <Progress value={workHours / 8 * 100} className="mt-2" />
          </CardContent>
        </Card>
        <Card className="bg-white/50 backdrop-blur-sm border border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-black">Tareas completadas</CardTitle>
            <CheckCircle className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">
              {tasks.filter(task => task.completed).length} / {tasks.length}
            </div>
            <Progress
              value={tasks.filter(task => task.completed).length / tasks.length * 100}
              className="mt-2"
            />
          </CardContent>
        </Card>
        <Card className="bg-white/50 backdrop-blur-sm border border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-black">Próximo recordatorio</CardTitle>
            <Bell className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">Reunión de equipo</div>
            <p className="text-xs text-purple-600">Hoy a las 14:00</p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-6 flex justify-center">
        <Button
          onClick={handleClockInOut}
          variant={isClockedIn ? "destructive" : "default"}
          className="w-48 h-12 text-lg font-semibold"
        >
          {isClockedIn ? "Finalizar Jornada" : "Iniciar Jornada"}
        </Button>
      </div>
      <div className="mt-6">
        <Tabs defaultValue="tasks" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tasks">Tareas</TabsTrigger>
            <TabsTrigger value="calendar">Calendario</TabsTrigger>
          </TabsList>
          <TabsContent value="tasks">
            <Card className="bg-white/50 backdrop-blur-sm border border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-800">Tareas pendientes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tasks.map(task => (
                    <li key={task.id} className="flex items-center justify-between py-2 border-b border-purple-100 last:border-b-0">
                      <span className={`text-black ${task.completed ? "line-through" : ""}`}>
                        {task.title}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleTaskCompletion(task.id)}
                        className="border-purple-300 text-black hover:bg-purple-100"
                      >
                        {task.completed ? "Deshacer" : "Hecho"}
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="calendar">
            <Card className="bg-white/50 backdrop-blur-sm border border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-800">Próximos Eventos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-black">Integración de calendario próximamente...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <div className="mt-6">
        <Card className="bg-white/50 backdrop-blur-sm border border-purple-200">
          <CardHeader>
            <CardTitle className="text-purple-800">Integración con Clockify</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="border-purple-300 text-black hover:bg-purple-100">
              Conectar con Clockify
            </Button>
            <p className="mt-2 text-sm text-purple-600">
              Sincroniza tus horas de trabajo y tareas con Clockify para un seguimiento de tiempo perfecto.
            </p>
          </CardContent>
        </Card>
      </div>
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-purple-600 text-white p-4 rounded-lg shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span>{notification}</span>
              <button onClick={() => setNotification(null)} className="ml-4 text-white hover:text-purple-200">
                <X size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default EmployeeDashboard;
