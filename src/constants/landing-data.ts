import type {
  AccessFormData,
  InstitutionRow,
  Outcome,
  ProblemCard,
} from "@/types/landing";

export const defaultFormData: AccessFormData = {
  fullName: "",
  organization: "",
  role: "",
  email: "",
  useCase: "",
};

export const problemCards: ProblemCard[] = [
  {
    tag: "Farmers",
    title: "Excluded from finance",
    body: "Smallholders lack standardized data needed to access agricultural credit - not because their land is not productive, but because productivity is unmeasured.",
  },
  {
    tag: "Institutions",
    title: "Facing deep uncertainty",
    body: "Banks, insurers, and program managers make multi-million dollar decisions on land they cannot see. Risk models rely on proxies, not ground truth.",
  },
  {
    tag: "The System",
    title: "A widening gap",
    body: "The agricultural financing gap exceeds $170bn annually in emerging markets. Poor soil data sits at the center of this market failure.",
  },
];

export const outcomes: Outcome[] = [
  {
    n: "01",
    title: "More informed agricultural lending",
    body: "Give credit institutions the soil risk signals they need to price agricultural exposure with confidence.",
  },
  {
    n: "02",
    title: "Better-aligned risk models",
    body: "Replace proxy assumptions with standardized soil indicators, enabling actuarial models to reflect ground-level reality.",
  },
  {
    n: "03",
    title: "Increased confidence in rural markets",
    body: "Reduce perceived uncertainty in smallholder agriculture, unlocking capital that currently sits on the sideline.",
  },
  {
    n: "04",
    title: "Smarter allocation of capital",
    body: "Direct subsidies, inputs, and extension programs to where they generate the highest measurable impact.",
  },
];

export const institutionRows: InstitutionRow[] = [
  { type: "Finance", label: "Commercial banks & agricultural lenders" },
  { type: "Insurance", label: "Crop insurers & climate risk underwriters" },
  {
    type: "Development",
    label: "NGOs & development finance institutions",
  },
  { type: "Government", label: "Ministries of Agriculture & national programs" },
  {
    type: "Research",
    label: "Academic & agricultural research institutions",
  },
];
