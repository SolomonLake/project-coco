export type CachedZoomTokenData = {
  expiresAt: number;

  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number; // in seconds
  scope: string;
};

export type ZoomUser = {
  account_id: string;
  created_at: string;
  dept: string;
  email: string;
  first_name: string;
  group_ids: Array<any>;
  host_key: string;
  id: string;
  im_group_ids: Array<any>;
  jid: string;
  language: string;
  last_client_version: string;
  last_login_time: string;
  last_name: string;
  personal_meeting_url: string;
  phone_country: string;
  phone_number: string;
  pic_url: string;
  pmi: number;
  role_name: string;
  status: string;
  timezone: string;
  type: number;
  use_pmi: boolean;
  verified: number;
};
