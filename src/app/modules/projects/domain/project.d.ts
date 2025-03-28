import { Base } from "@/app/shared/types/Base";

export interface Project extends Base {
  client_id: string;
  name: string
  description: string
  type: ProjectType
}

export enum ProjectType {
  CHICAGO_BLOWER = 'Chicago Blower',
  STRONG_KRANES = 'Strong Kranes',
  ARKO = 'ARKO',
  COMERCIAL = 'Comercial',
  SERVICIOS = 'Servicios',
  PMP = 'PMP'
}
