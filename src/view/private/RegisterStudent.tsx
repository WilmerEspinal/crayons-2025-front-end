"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import clsx from "clsx";
import axios from "axios";

const steps = [
  { id: 1, title: "Estudiante" },
  { id: 2, title: "Apoderado" },
  { id: 3, title: "Información Económica" },
  { id: 4, title: "Documentos" },
  { id: 5, title: "Confirmar" },
];

type Grado = {
  id: number;
  descripcion: string;
  created_at: string;
  updated_at: string;
};

export default function RegisterStudent() {
  const [step, setStep] = useState(0);
  const [grados, setGrados] = useState<Grado[]>([]);
  const [loading, setLoading] = useState(false);
  const [alumnoExiste, setAlumnoExiste] = useState(false);
  const [alumnoData, setAlumnoData] = useState<any>(null);
  const [message, setMessage] = useState<{
    text: string;
    isError: boolean;
  } | null>(null);

  // Form data state
  const [formData, setFormData] = useState({
    // Alumno
    alumno_dni: "",
    alumno_nombre: "",
    alumno_ap_p: "",
    alumno_ap_m: "",
    alumno_fecha_nacimiento: "",
    alumno_email: "",
    id_grado: "",

    // Apoderado
    apoderado_dni: "",
    apoderado_nombre: "",
    apoderado_ap_p: "",
    apoderado_ap_m: "",
    apoderado_fecha_nacimiento: "",
    apoderado_telefono: "",
    apoderado_relacion: "",

    // Documentos
    dni_entregado: false,
    certificado_estudios: false,

    // Económico
    matricula_precio: 0,
    c1: 0,
    c2: 0,
    c3: 0,
    c4: 0,
    c5: 0,
    c6: 0,
    c7: 0,
    c8: 0,
    c9: 0,
    c10: 0,
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  // Cargar grados al montar el componente
  useEffect(() => {
    const fetchGrados = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/grado/lista-grado"
        );
        setGrados(response.data.data);
      } catch (error) {
        setMessage({ text: "No se pudieron cargar los grados", isError: true });
      }
    };
    fetchGrados();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const verificarAlumno = async () => {
    if (!formData.alumno_dni) {
      setMessage({ text: "Ingrese el DNI del alumno", isError: true });
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/api/dni/buscar-dni/${formData.alumno_dni}`
      );

      if (response.data.status) {
        setAlumnoExiste(true);
        setAlumnoData(response.data.data);
        // Autocompletar datos del alumno existente
        setFormData((prev) => ({
          ...prev,
          alumno_nombre: response.data.data.nombres,
          alumno_ap_p: response.data.data.apellidoPaterno,
          alumno_ap_m: response.data.data.apellidoMaterno,
        }));

        setMessage({
          text: "Alumno encontrado. Puede editar los datos si lo desea",
          isError: false,
        });
      } else {
        setAlumnoExiste(false);
        setMessage({
          text: "Alumno no registrado. Complete los datos",
          isError: false,
        });
      }
    } catch (error) {
      setMessage({
        text: "Ocurrió un error al verificar el alumno",
        isError: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const verificarApoderado = async () => {
    if (!formData.apoderado_dni) {
      setMessage({ text: "Ingrese el DNI del apoderado", isError: true });
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/api/dni/buscar-dni/${formData.apoderado_dni}`
      );

      if (response.data.status) {
        // Autocompletar datos del apoderado
        setFormData((prev) => ({
          ...prev,
          apoderado_nombre: response.data.data.nombres,
          apoderado_ap_p: response.data.data.apellidoPaterno,
          apoderado_ap_m: response.data.data.apellidoMaterno,
        }));

        setMessage({
          text: "Apoderado encontrado. Puede editar los datos si lo desea",
          isError: false,
        });
      } else {
        setMessage({
          text: "Apoderado no registrado. Complete los datos",
          isError: false,
        });
      }
    } catch (error) {
      setMessage({
        text: "Ocurrió un error al verificar el apoderado",
        isError: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    // Validación básica
    if (
      !formData.alumno_dni ||
      !formData.alumno_nombre ||
      !formData.alumno_ap_p ||
      !formData.alumno_ap_m ||
      !formData.alumno_fecha_nacimiento
    ) {
      setMessage({
        text: "Complete todos los campos obligatorios del alumno",
        isError: true,
      });
      return;
    }

    if (!formData.apoderado_dni) {
      setMessage({ text: "Complete el DNI del apoderado", isError: true });
      return;
    }

    if (!formData.id_grado) {
      setMessage({ text: "Seleccione un grado", isError: true });
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/das/matricula",
        formData
      );

      setMessage({
        text: "Matrícula registrada correctamente",
        isError: false,
      });

      // Mostrar credenciales generadas
      if (response.data.data) {
        const { username, password } = response.data.data;
        setMessage({
          text: `Matrícula exitosa! Usuario: ${username} | Contraseña: ${password}`,
          isError: false,
        });
      }

      // Reset form
      setFormData({
        alumno_dni: "",
        alumno_nombre: "",
        alumno_ap_p: "",
        alumno_ap_m: "",
        alumno_fecha_nacimiento: "",
        alumno_email: "",
        id_grado: "",
        apoderado_dni: "",
        apoderado_nombre: "",
        apoderado_ap_p: "",
        apoderado_ap_m: "",
        apoderado_fecha_nacimiento: "",
        apoderado_telefono: "",
        apoderado_relacion: "",
        dni_entregado: false,
        certificado_estudios: false,
        matricula_precio: 0,
        c1: 0,
        c2: 0,
        c3: 0,
        c4: 0,
        c5: 0,
        c6: 0,
        c7: 0,
        c8: 0,
        c9: 0,
        c10: 0,
      });
      setStep(0);
      setAlumnoExiste(false);
      setAlumnoData(null);
    } catch (error: any) {
      setMessage({
        text:
          error.response?.data?.message || "Error al registrar la matrícula",
        isError: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Stepper Header */}
      <div className="flex justify-between mb-6">
        {steps.map((s, idx) => (
          <div key={s.id} className="flex flex-col items-center flex-1">
            <div
              className={clsx(
                "w-8 h-8 flex items-center justify-center rounded-full border text-sm font-medium",
                step === idx
                  ? "bg-primary text-white"
                  : "border-muted text-muted-foreground"
              )}
            >
              {s.id}
            </div>
            <span
              className={clsx(
                "text-xs mt-1",
                step === idx ? "text-primary" : "text-muted-foreground"
              )}
            >
              {s.title}
            </span>
          </div>
        ))}
      </div>

      {/* Message display */}
      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.isError
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>{steps[step].title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 0 && (
            <>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label>DNI</Label>
                  <Input
                    placeholder="DNI del estudiante"
                    name="alumno_dni"
                    value={formData.alumno_dni}
                    onChange={handleInputChange}
                  />
                </div>
                <Button
                  className="self-end"
                  onClick={verificarAlumno}
                  disabled={loading}
                >
                  {loading ? "Buscando..." : "Buscar"}
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nombre</Label>
                  <Input
                    name="alumno_nombre"
                    value={formData.alumno_nombre}
                    onChange={handleInputChange}
                    placeholder="Nombre"
                  />
                </div>
                <div>
                  <Label>Apellido Paterno</Label>
                  <Input
                    name="alumno_ap_p"
                    value={formData.alumno_ap_p}
                    onChange={handleInputChange}
                    placeholder="Apellido Paterno"
                  />
                </div>
                <div>
                  <Label>Apellido Materno</Label>
                  <Input
                    name="alumno_ap_m"
                    value={formData.alumno_ap_m}
                    onChange={handleInputChange}
                    placeholder="Apellido Materno"
                  />
                </div>
                <div>
                  <Label>Fecha de Nacimiento</Label>
                  <Input
                    type="date"
                    name="alumno_fecha_nacimiento"
                    value={formData.alumno_fecha_nacimiento}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label>Grado</Label>
                  <Select
                    value={formData.id_grado}
                    onValueChange={(value) =>
                      handleSelectChange("id_grado", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione grado" />
                    </SelectTrigger>
                    <SelectContent>
                      {grados?.map((grado) => (
                        <SelectItem key={grado.id} value={grado.id.toString()}>
                          {grado.descripcion}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    name="alumno_email"
                    value={formData.alumno_email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label>DNI</Label>
                  <Input
                    placeholder="DNI del apoderado"
                    name="apoderado_dni"
                    value={formData.apoderado_dni}
                    onChange={handleInputChange}
                  />
                </div>
                <Button
                  className="self-end"
                  onClick={verificarApoderado}
                  disabled={loading}
                >
                  {loading ? "Buscando..." : "Buscar"}
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nombre</Label>
                  <Input
                    name="apoderado_nombre"
                    value={formData.apoderado_nombre}
                    onChange={handleInputChange}
                    placeholder="Nombre"
                  />
                </div>
                <div>
                  <Label>Apellido Paterno</Label>
                  <Input
                    name="apoderado_ap_p"
                    value={formData.apoderado_ap_p}
                    onChange={handleInputChange}
                    placeholder="Apellido Paterno"
                  />
                </div>
                <div>
                  <Label>Apellido Materno</Label>
                  <Input
                    name="apoderado_ap_m"
                    value={formData.apoderado_ap_m}
                    onChange={handleInputChange}
                    placeholder="Apellido Materno"
                  />
                </div>
                <div>
                  <Label>Fecha de Nacimiento</Label>
                  <Input
                    type="date"
                    name="apoderado_fecha_nacimiento"
                    value={formData.apoderado_fecha_nacimiento}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label>Relación</Label>
                  <Select
                    value={formData.apoderado_relacion}
                    onValueChange={(value) =>
                      handleSelectChange("apoderado_relacion", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="padre">Padre</SelectItem>
                      <SelectItem value="madre">Madre</SelectItem>
                      <SelectItem value="hermano">Hermano/a</SelectItem>
                      <SelectItem value="tutor">Tutor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Teléfono</Label>
                  <Input
                    type="tel"
                    name="apoderado_telefono"
                    value={formData.apoderado_telefono}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Precio Matrícula</Label>
                <Input
                  placeholder="S/ 100.00"
                  name="matricula_precio"
                  value={formData.matricula_precio}
                  onChange={handleInputChange}
                  type="number"
                />
              </div>
              <div>
                <Label>Precio Cuota Mensual</Label>
                <Input
                  placeholder="S/ 250.00"
                  name="c1"
                  value={formData.c1}
                  onChange={handleInputChange}
                  type="number"
                />
              </div>
              <div>
                <Label>Número de Cuotas</Label>
                <Input placeholder="10" type="number" disabled value="10" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="dni"
                  name="dni_entregado"
                  checked={formData.dni_entregado}
                  onChange={handleInputChange}
                />
                <Label htmlFor="dni">Entregó copia de DNI</Label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="certificado"
                  name="certificado_estudios"
                  checked={formData.certificado_estudios}
                  onChange={handleInputChange}
                />
                <Label htmlFor="certificado">
                  Entregó certificado de estudios
                </Label>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Verifica los datos ingresados:
              </p>
              <div className="bg-muted p-4 rounded text-xs space-y-2">
                <p>
                  <strong>Alumno:</strong> {formData.alumno_nombre}{" "}
                  {formData.alumno_ap_p} {formData.alumno_ap_m} (DNI:{" "}
                  {formData.alumno_dni})
                </p>
                <p>
                  <strong>Apoderado:</strong> {formData.apoderado_nombre}{" "}
                  {formData.apoderado_ap_p} {formData.apoderado_ap_m} (DNI:{" "}
                  {formData.apoderado_dni})
                </p>
                <p>
                  <strong>Grado:</strong>{" "}
                  {
                    grados.find((g) => g.id.toString() === formData.id_grado)
                      ?.descripcion
                  }
                </p>
                <p>
                  <strong>Matrícula:</strong> S/ {formData.matricula_precio}
                </p>
                <p>
                  <strong>Cuotas:</strong> 10 de S/ {formData.c1} cada una
                </p>
                <p>
                  <strong>Documentos:</strong>{" "}
                  {formData.dni_entregado
                    ? "DNI entregado"
                    : "DNI no entregado"}
                  ,{" "}
                  {formData.certificado_estudios
                    ? "Certificado entregado"
                    : "Certificado no entregado"}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={prevStep} disabled={step === 0}>
          Atrás
        </Button>
        {step < steps.length - 1 ? (
          <Button onClick={nextStep}>Siguiente</Button>
        ) : (
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Enviando..." : "Enviar"}
          </Button>
        )}
      </div>
    </div>
  );
}
