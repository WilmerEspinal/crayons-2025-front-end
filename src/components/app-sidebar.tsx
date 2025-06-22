import * as React from "react";
import { useState } from "react";

import { VersionSwitcher } from "@/components/version-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  const toggleGroup = (title: string) => {
    setExpandedGroup(prev => prev === title ? null : title);
  };

  const data = {
    versions: ["1.0.0"],
    navMain: [
      {
        title: "Gestión de Alumnos",
        url: "#",
        items: [
          {
            title: "Registro de Alumno",
            url: "/dashboard/register-student",
          },
          {
            title: "Lista de Alumnos",
            url: "/dashboard/list-student",
          },
        ],
      },
      {
        title: "Gestión de Docentes",
        url: "#",
        items: [
          {
            title: "Registro de Docente",
            url: "/dashboard/register-teacher",
          },
          {
            title: "Lista de Docentes",
            url: "/dashboard/list-teacher",
          },
        ],
      },
      {
        title: "Gestión de Cuotas",
        url: "#",
        items: [
          {
            title: "Programar cuota",
            url: "/dashboard/programar-cuotas",
          },
          {
            title: "Cuotas",
            url: "#/cuotas",
          },
          {
            title: "Cuota Manual",
            url: "#/cuota-manual",
          },
        ],
      },
      {
        title: "Automatización con IA",
        url: "#",
        items: [
          {
            title: "Generación de Facturas con IA",
            url: "#/facturas-ia",
          },
          {
            title: "Resumen de Pagos Inteligente",
            url: "#/resumen-pagos-ia",
          },
        ],
      },
    ],
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel 
              onClick={() => toggleGroup(item.title)}
              className="cursor-pointer flex items-center justify-between"
            >
              {item.title}
              {expandedGroup === item.title ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </SidebarGroupLabel>
            {expandedGroup === item.title && (
              <SidebarGroupContent>
                <SidebarMenu>
                  {item.items.map((subItem) => (
                    <SidebarMenuItem key={subItem.title}>
                      <SidebarMenuButton asChild>
                        <Link to={subItem.url}>{subItem.title}</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            )}
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
