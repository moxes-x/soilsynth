export type AccessFormData = {
  fullName: string;
  organization: string;
  role: string;
  email: string;
  useCase: string;
};

export type AccessFormErrors = Partial<Record<keyof AccessFormData, string>>;

export type ProblemCard = {
  tag: string;
  title: string;
  body: string;
};

export type Outcome = {
  n: string;
  title: string;
  body: string;
};

export type InstitutionRow = {
  type: string;
  label: string;
};
