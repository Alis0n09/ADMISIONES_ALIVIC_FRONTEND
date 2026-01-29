import type * as React from "react";

declare module "@mui/material" {
  // Compatibilidad para Grid con API antigua (item/xs/sm/md)
  // Evita errores de tipos con la versión actual de MUI.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const Grid: React.ComponentType<any>;
}

