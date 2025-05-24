import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Alumno {
  id: number;
  nombre: string;
  asistio: boolean;
  observacion: string;
}

export default function RegistrarAsistencia() {
  const [cursoSeleccionado, setCursoSeleccionado] = useState<string>("");
  const [gradoSeleccionado, setGradoSeleccionado] = useState<string>("");
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const fechaActual = format(new Date(), "EEEE d 'de' MMMM 'de' yyyy", {
    locale: es,
  });

  // Función para manejar cambios en la asistencia
  const handleAsistenciaChange = (id: number, checked: boolean) => {
    setAlumnos(
      alumnos.map((alumno) =>
        alumno.id === id ? { ...alumno, asistio: checked } : alumno
      )
    );
  };

  // Función para manejar cambios en observaciones
  const handleObservacionChange = (id: number, observacion: string) => {
    setAlumnos(
      alumnos.map((alumno) =>
        alumno.id === id ? { ...alumno, observacion } : alumno
      )
    );
  };

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Registro de Asistencia</CardTitle>
          <p className="text-sm text-gray-500">{fechaActual}</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Curso</label>
              <Select
                value={cursoSeleccionado}
                onValueChange={setCursoSeleccionado}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un curso" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="matematicas">Matemáticas</SelectItem>
                  <SelectItem value="lenguaje">Lenguaje</SelectItem>
                  <SelectItem value="ciencias">Ciencias</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Grado</label>
              <Select
                value={gradoSeleccionado}
                onValueChange={setGradoSeleccionado}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un grado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Primer Grado</SelectItem>
                  <SelectItem value="2">Segundo Grado</SelectItem>
                  <SelectItem value="3">Tercer Grado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Alumno</TableHead>
                <TableHead className="w-[100px]">Asistencia</TableHead>
                <TableHead>Observación</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alumnos.map((alumno) => (
                <TableRow key={alumno.id}>
                  <TableCell>{alumno.nombre}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={alumno.asistio}
                      onCheckedChange={(checked) =>
                        handleAsistenciaChange(alumno.id, checked as boolean)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Textarea
                      placeholder="Observación..."
                      value={alumno.observacion}
                      onChange={(e) =>
                        handleObservacionChange(alumno.id, e.target.value)
                      }
                      className="h-20"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex justify-end mt-6 space-x-4">
            <Button variant="outline">Cancelar</Button>
            <Button>Guardar Asistencia</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
