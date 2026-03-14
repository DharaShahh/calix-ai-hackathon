create extension if not exists "pgcrypto";

create table if not exists tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists roles (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  name text not null,
  description text,
  created_at timestamptz not null default now()
);

create unique index if not exists roles_tenant_name_idx on roles (tenant_id, name);

create table if not exists permissions (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  description text
);

create table if not exists role_permissions (
  role_id uuid not null references roles(id) on delete cascade,
  permission_id uuid not null references permissions(id) on delete cascade,
  primary key (role_id, permission_id)
);

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique,
  tenant_id uuid not null references tenants(id) on delete cascade,
  email text not null,
  full_name text not null,
  phone text,
  user_type text not null check (user_type in ('staff', 'customer')),
  status text not null,
  last_login_at timestamptz,
  created_at timestamptz not null default now()
);

create unique index if not exists users_tenant_email_idx on users (tenant_id, email);

create table if not exists user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  role_id uuid not null references roles(id) on delete cascade,
  tenant_id uuid not null references tenants(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists user_invites (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  email text not null,
  user_type text not null check (user_type in ('staff', 'customer')),
  role_id uuid references roles(id) on delete set null,
  token_hash text not null,
  status text not null,
  sent_at timestamptz,
  accepted_at timestamptz,
  expires_at timestamptz,
  created_by uuid references users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  account_number text not null,
  full_name text not null,
  email text,
  phone text,
  status text not null,
  portal_user_id uuid references users(id) on delete set null,
  created_at timestamptz not null default now()
);

create unique index if not exists customers_tenant_account_idx on customers (tenant_id, account_number);

create table if not exists service_locations (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  customer_id uuid not null references customers(id) on delete cascade,
  address_line_1 text not null,
  address_line_2 text,
  city text not null,
  state text,
  postal_code text,
  latitude numeric(10, 7),
  longitude numeric(10, 7),
  status text not null,
  created_at timestamptz not null default now()
);

create table if not exists service_plans (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  name text not null,
  plan_code text not null,
  download_speed_mbps integer not null,
  upload_speed_mbps integer not null,
  billing_code text,
  status text not null,
  created_at timestamptz not null default now()
);

create unique index if not exists service_plans_tenant_code_idx on service_plans (tenant_id, plan_code);

create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  customer_id uuid not null references customers(id) on delete cascade,
  service_location_id uuid not null references service_locations(id) on delete cascade,
  service_plan_id uuid not null references service_plans(id) on delete restrict,
  status text not null,
  activation_date date,
  suspension_date date,
  cancellation_date date,
  billing_account_ref text,
  created_at timestamptz not null default now()
);

create table if not exists subscription_change_requests (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  subscription_id uuid not null references subscriptions(id) on delete cascade,
  request_type text not null,
  requested_plan_id uuid references service_plans(id) on delete set null,
  status text not null,
  requested_by_user_id uuid references users(id) on delete set null,
  approved_by_user_id uuid references users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists device_vendors (
  id uuid primary key default gen_random_uuid(),
  name text not null unique
);

create table if not exists device_models (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid not null references device_vendors(id) on delete cascade,
  name text not null,
  device_type text not null,
  supported_features jsonb not null default '{}'::jsonb
);

create table if not exists network_devices (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  serial_number text not null,
  hostname text,
  device_model_id uuid not null references device_models(id) on delete restrict,
  device_type text not null,
  status text not null,
  health_status text not null,
  service_location_id uuid references service_locations(id) on delete set null,
  customer_id uuid references customers(id) on delete set null,
  subscription_id uuid references subscriptions(id) on delete set null,
  mgmt_ip inet,
  last_seen_at timestamptz,
  retired_at timestamptz,
  created_at timestamptz not null default now()
);

create unique index if not exists network_devices_tenant_serial_idx on network_devices (tenant_id, serial_number);

create table if not exists configuration_templates (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  name text not null,
  device_type text not null,
  vendor_id uuid references device_vendors(id) on delete set null,
  template_version text not null,
  status text not null,
  content_ref text not null,
  created_at timestamptz not null default now()
);

create table if not exists device_configuration_jobs (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  device_id uuid not null references network_devices(id) on delete cascade,
  template_id uuid references configuration_templates(id) on delete set null,
  action_type text not null,
  status text not null,
  requested_by uuid references users(id) on delete set null,
  executed_at timestamptz,
  result_summary text,
  created_at timestamptz not null default now()
);

create table if not exists network_nodes (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  name text not null,
  node_type text not null,
  status text not null,
  location_ref text,
  created_at timestamptz not null default now()
);

create table if not exists network_links (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  source_node_id uuid not null references network_nodes(id) on delete cascade,
  target_node_id uuid not null references network_nodes(id) on delete cascade,
  link_type text not null,
  capacity_mbps integer,
  status text not null,
  created_at timestamptz not null default now()
);

create table if not exists node_device_links (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  node_id uuid not null references network_nodes(id) on delete cascade,
  device_id uuid not null references network_devices(id) on delete cascade
);

create table if not exists customer_network_paths (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  customer_id uuid not null references customers(id) on delete cascade,
  subscription_id uuid not null references subscriptions(id) on delete cascade,
  root_node_id uuid references network_nodes(id) on delete set null,
  endpoint_device_id uuid references network_devices(id) on delete set null
);

create table if not exists provisioning_workflows (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  name text not null,
  service_type text not null,
  device_type text not null,
  status text not null,
  created_at timestamptz not null default now()
);

create table if not exists provisioning_templates (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  workflow_id uuid not null references provisioning_workflows(id) on delete cascade,
  service_plan_id uuid not null references service_plans(id) on delete cascade,
  device_model_id uuid references device_models(id) on delete set null,
  version text not null,
  status text not null,
  created_at timestamptz not null default now()
);

create table if not exists provisioning_jobs (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  subscription_id uuid not null references subscriptions(id) on delete cascade,
  device_id uuid references network_devices(id) on delete set null,
  template_id uuid not null references provisioning_templates(id) on delete restrict,
  job_type text not null,
  status text not null,
  requested_by uuid references users(id) on delete set null,
  started_at timestamptz,
  completed_at timestamptz,
  error_message text,
  created_at timestamptz not null default now()
);

create table if not exists provisioning_events (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  job_id uuid not null references provisioning_jobs(id) on delete cascade,
  event_type text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists performance_metrics (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  device_id uuid references network_devices(id) on delete cascade,
  subscription_id uuid references subscriptions(id) on delete cascade,
  metric_type text not null,
  metric_value numeric not null,
  unit text not null,
  captured_at timestamptz not null
);

create index if not exists performance_metrics_tenant_time_idx on performance_metrics (tenant_id, captured_at desc);

create table if not exists alert_rules (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  name text not null,
  scope_type text not null,
  metric_type text not null,
  operator text not null,
  threshold_value numeric not null,
  severity text not null,
  status text not null,
  created_at timestamptz not null default now()
);

create table if not exists alerts (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  alert_rule_id uuid references alert_rules(id) on delete set null,
  device_id uuid references network_devices(id) on delete set null,
  subscription_id uuid references subscriptions(id) on delete set null,
  severity text not null,
  status text not null,
  triggered_at timestamptz not null,
  resolved_at timestamptz
);

create table if not exists fault_tickets (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  alert_id uuid references alerts(id) on delete set null,
  customer_id uuid references customers(id) on delete set null,
  subscription_id uuid references subscriptions(id) on delete set null,
  device_id uuid references network_devices(id) on delete set null,
  severity text not null,
  status text not null,
  summary text not null,
  description text,
  assigned_to_user_id uuid references users(id) on delete set null,
  created_by_user_id uuid references users(id) on delete set null,
  resolved_at timestamptz,
  closed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists fault_updates (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  fault_ticket_id uuid not null references fault_tickets(id) on delete cascade,
  updated_by_user_id uuid references users(id) on delete set null,
  update_type text not null,
  note text not null,
  created_at timestamptz not null default now()
);

create table if not exists support_tickets (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  customer_id uuid not null references customers(id) on delete cascade,
  subscription_id uuid references subscriptions(id) on delete set null,
  linked_fault_ticket_id uuid references fault_tickets(id) on delete set null,
  status text not null,
  category text not null,
  subject text not null,
  description text,
  created_by_user_id uuid references users(id) on delete set null,
  assigned_to_user_id uuid references users(id) on delete set null,
  resolved_at timestamptz,
  closed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists technician_assignments (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  fault_ticket_id uuid not null references fault_tickets(id) on delete cascade,
  technician_user_id uuid not null references users(id) on delete cascade,
  status text not null,
  assigned_at timestamptz not null default now(),
  completed_at timestamptz
);

create table if not exists billing_integrations (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  provider_name text not null,
  status text not null,
  config_ref text,
  created_at timestamptz not null default now()
);

create table if not exists billing_account_mappings (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  customer_id uuid not null references customers(id) on delete cascade,
  subscription_id uuid references subscriptions(id) on delete cascade,
  external_account_id text not null,
  external_subscription_id text,
  status text not null,
  created_at timestamptz not null default now()
);

create table if not exists billing_sync_events (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  integration_id uuid not null references billing_integrations(id) on delete cascade,
  customer_id uuid references customers(id) on delete cascade,
  subscription_id uuid references subscriptions(id) on delete cascade,
  event_type text not null,
  status text not null,
  request_payload_ref text,
  response_payload_ref text,
  created_at timestamptz not null default now()
);

create table if not exists billing_snapshots (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  customer_id uuid not null references customers(id) on delete cascade,
  subscription_id uuid references subscriptions(id) on delete cascade,
  billing_status text not null,
  current_balance numeric,
  due_date date,
  captured_at timestamptz not null default now()
);

create table if not exists api_keys (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  name text not null,
  key_hash text not null,
  status text not null,
  last_used_at timestamptz,
  created_by uuid references users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists webhook_logs (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  integration_type text not null,
  event_type text not null,
  status text not null,
  payload_ref text,
  created_at timestamptz not null default now()
);

create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  actor_user_id uuid references users(id) on delete set null,
  entity_type text not null,
  entity_id uuid,
  action text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
