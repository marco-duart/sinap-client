export interface Project {
  id: number;
  title: string;
  description?: string;
  requestingDepartment: string;
  urgencyScore: number;
  importanceScore: number;
  startDate?: string | Date;
  endDate?: string | Date;
  budget?: number;
  businessValue?: string;
  createdAt: Date;
  updatedAt: Date;
  priorityId: number;
  stepId: number;
  priority?: Priority;
  step?: Step;
  artifacts?: Artifact[];
  tasks?: Task[];
  raciAssignments?: ProjectRaci[];
}

export interface Priority {
  id: number;
  name: string;
  value: number;
}

export interface Step {
  id: number;
  name: string;
  order: number;
  isActionable: boolean;
  pdcaPhase: "PLAN" | "DO" | "CHECK" | "ACT";
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  estimatedEffort?: number;
  projectId: number;
  stepId?: number;
  dependsOnTaskId?: number;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  createdAt: Date;
  updatedAt: Date;
  project?: Project;
  dependsOnTask?: Task;
  dependentTasks?: Task[];
}

export interface Artifact {
  id: number;
  title: string;
  description?: string;
  type: "DOCUMENTO" | "IMAGEM" | "VÍDEO" | "ÁUDIO" | "OUTRO";
  url: string;
  filename: string;
  projectId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectRaci {
  id: number;
  projectId: number;
  userId: number;
  raciRole: "RESPONSIBLE" | "ACCOUNTABLE" | "CONSULTED" | "INFORMED";
  user?: any;
}

export interface EstimationSession {
  id: number;
  projectId?: number;
  status: "PENDING" | "VOTING" | "REVEALED" | "CLOSED";
  topics?: EstimationTopic[];
  createdAt: Date;
}

export interface EstimationTopic {
  id: number;
  sessionId: number;
  taskId?: number;
  referenceTitle?: string;
  finalScore?: number;
  votes?: EstimationVote[];
}

export interface EstimationVote {
  id: number;
  topicId: number;
  userId: number;
  score: number;
  createdAt: Date;
}
