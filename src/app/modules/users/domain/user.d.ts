import type { Base } from '@/app/shared/types/Base'

interface User extends Base {
  codigo: string
  nombre: string
  nss: string
  registro_patronal: string
  fecha_ingreso: Date
  salario_diario: number
  salario_diario_integrado: number
  departamento: string
  puesto: string
  centro_costos: string
  estatus: string
}

// id (INT, PK)
// codigo (VARCHAR, UNIQUE)
// nombre (VARCHAR)
// nss (VARCHAR)
// registro_patronal (VARCHAR)
// fecha_ingreso (DATE)
// salario_diario (DECIMAL)
// salario_diario_integrado (DECIMAL)
// departamento (VARCHAR)
// puesto (VARCHAR)
// centro_costos (VARCHAR)
// estatus (CHAR)