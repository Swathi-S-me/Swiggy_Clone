export interface HelpOption {
  type: string;
  title: string;
  waitTimeDescription?: string;
  metadata?: {
    emailId?: string;
    phoneNumber?: string;
  };
}

export interface HelpIssue {
  id: number;
  title: string;
  description?: string | null;
  hyperLinkText?: string | null;
  hyperLink?: string | null;
  options?: HelpOption[];
}
export interface Props {
  issue: HelpIssue;
  openId: number | null;
  setOpenId: (id: number | null) => void;
}

export interface Sidebar {
  active: string;
  setActive: (key: string) => void;
}
