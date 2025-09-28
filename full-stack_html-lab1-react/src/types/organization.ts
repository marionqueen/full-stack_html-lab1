export interface Leader {
  name: string;
  role: string;
  description: string;
}

export interface OrganizationData {
  leadership: {
    [key: string]: Leader[];
  };
}