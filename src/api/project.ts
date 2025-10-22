import { ProjectRequestParams, ProjectResponse } from "types/project";
import request from "./wrapper";

export function getProjectData(params: ProjectRequestParams) {
    return request.get<ProjectResponse>('/api/project', params)
}
