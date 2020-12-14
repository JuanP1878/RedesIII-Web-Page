import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MediaComponent} from "../../pages/media/media.component";

export const AdminLayoutRoutes: Routes = [
  { path: "reports", component: DashboardComponent },
  { path: "devices", component: IconsComponent },
  { path: "media", component: MediaComponent },
];
