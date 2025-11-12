export namespace Project {
  export type Model = {
    id: number;
    title: string;
    description: string;
    requestingDepartment: string;
    createdAt: string;
    updatedAt: string;
    priorityId: number;
    stepId: number;
    responsibleId: number;
  };

  export type ProjectWithRelations = Model & {
    priority: {
      id: number;
      name: string;
      value: number;
    };
    step: {
      id: number;
      name: string;
      order: number;
      isActionable: boolean;
    };
    responsible: {
      id: number;
      name: string;
      passwordDigest: string;
      email: string;
      roleName: "Coordenador" | "Analista" | "Assistente";
    };
  };
}

export namespace GetActiveProjects {
  export type Params = {};
  export type Response = Project.ProjectWithRelations[];
}

export namespace GetBacklogProjects {
  export type Params = {};
  export type Response = Omit<Project.ProjectWithRelations, "responsible">[];
}
