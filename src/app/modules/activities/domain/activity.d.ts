import { Base } from "@/app/shared/types/Base";

export interface Activity extends Base {
  department_id: string;
  code: string;
  description: string;
}