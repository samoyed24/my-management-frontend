export const PROJECT_STATUS_MAPPING = {
  End: '已完结',
  Process: '进行中',
  Quality: '质保',
} as const;

export type ProjectStatusKey = keyof typeof PROJECT_STATUS_MAPPING;

export const PROJECT_STATUS_COLOR_MAPPING = {
    End: '#F63518',
    Process: '#23CF07',
    Quality: '#1277FA'
}