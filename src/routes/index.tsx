import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "../pages/dashboard/index";
import { Login } from "../pages/auth/login";
import { Register } from "../pages/auth/register";
import { PrivateRoute } from "../components/private-route";
import { ProjectsList } from "../pages/projects/list";
import { ProjectForm } from "../pages/projects/form";
import { ProjectDetail } from "../pages/projects/detail";
import { TaskForm } from "../pages/tasks/form";
import { MetricsDashboard } from "../pages/metrics/dashboard";
import { ProductivityPage } from "../pages/metrics/productivity";
import { TeamPerformancePage } from "../pages/metrics/team";
import { EstimationAccuracyPage } from "../pages/metrics/accuracy";
import { AdminUsers } from "../pages/admin/users";
import { AdminSteps } from "../pages/admin/steps";
import { AdminPriorities } from "../pages/admin/priorities";
import { PlanningPokerCreate } from "../pages/planning-poker/create";
import { RaciMatrix } from "../pages/raci/index";
import { ArtifactsPage } from "../pages/artifacts/index";
import { Layout } from "../components/layout";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rotas Privadas Envoltas no Layout */}
        <Route element={<PrivateRoute element={<Layout />} />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/projects" element={<ProjectsList />} />
          <Route path="/projects/create" element={<ProjectForm />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/projects/:id/edit" element={<ProjectForm />} />

          <Route path="/projects/:projectId/tasks/create" element={<TaskForm />} />
          <Route path="/projects/:projectId/tasks/:taskId/edit" element={<TaskForm />} />
          <Route path="/projects/:projectId/raci" element={<RaciMatrix />} />
          <Route path="/projects/:projectId/artifacts" element={<ArtifactsPage />} />

          <Route path="/metrics" element={<MetricsDashboard />} />
          <Route path="/metrics/dashboard" element={<MetricsDashboard />} />
          <Route path="/metrics/productivity" element={<ProductivityPage />} />
          <Route path="/metrics/team" element={<TeamPerformancePage />} />
          <Route path="/metrics/accuracy" element={<EstimationAccuracyPage />} />

          <Route path="/planning-poker/create" element={<PlanningPokerCreate />} />

          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/steps" element={<AdminSteps />} />
          <Route path="/admin/priorities" element={<AdminPriorities />} />
        </Route>

        {/* Fallback */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
