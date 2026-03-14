insert into tenants (id, name, slug, status)
values
  ('00000000-0000-0000-0000-000000000001', 'Pilot ISP Tenant', 'pilot-isp', 'active')
on conflict (id) do update
set
  name = excluded.name,
  slug = excluded.slug,
  status = excluded.status;

insert into roles (id, tenant_id, name, description)
values
  (
    '10000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000001',
    'Admin',
    'Full access to platform administration and operations'
  ),
  (
    '10000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000001',
    'Network Engineer',
    'Device, provisioning, and technical operations access'
  ),
  (
    '10000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000001',
    'NOC Operator',
    'Monitoring and fault assignment access'
  ),
  (
    '10000000-0000-0000-0000-000000000004',
    '00000000-0000-0000-0000-000000000001',
    'Customer Support',
    'Customer, subscription, and support access'
  ),
  (
    '10000000-0000-0000-0000-000000000005',
    '00000000-0000-0000-0000-000000000001',
    'Customer',
    'Portal-only access'
  ),
  (
    '10000000-0000-0000-0000-000000000006',
    '00000000-0000-0000-0000-000000000001',
    'Technician Lite',
    'Limited field task access'
  )
on conflict (id) do update
set
  name = excluded.name,
  description = excluded.description;

insert into permissions (id, key, description)
values
  ('20000000-0000-0000-0000-000000000001', 'customers.read', 'Read customer data'),
  ('20000000-0000-0000-0000-000000000002', 'customers.write', 'Write customer data'),
  ('20000000-0000-0000-0000-000000000003', 'subscriptions.read', 'Read subscription data'),
  ('20000000-0000-0000-0000-000000000004', 'subscriptions.write', 'Write subscription data'),
  ('20000000-0000-0000-0000-000000000005', 'devices.read', 'Read device data'),
  ('20000000-0000-0000-0000-000000000006', 'devices.execute', 'Execute device operations'),
  ('20000000-0000-0000-0000-000000000007', 'monitoring.read', 'Read monitoring data'),
  ('20000000-0000-0000-0000-000000000008', 'faults.manage', 'Manage faults and incidents'),
  ('20000000-0000-0000-0000-000000000009', 'billing.read', 'Read billing visibility data'),
  ('20000000-0000-0000-0000-000000000010', 'admin.manage', 'Manage platform administration')
on conflict (key) do update
set
  description = excluded.description;

insert into role_permissions (role_id, permission_id)
values
  ('10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001'),
  ('10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000002'),
  ('10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000003'),
  ('10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000004'),
  ('10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000005'),
  ('10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000006'),
  ('10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000007'),
  ('10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000008'),
  ('10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000009'),
  ('10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000010'),
  ('10000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000003'),
  ('10000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000004'),
  ('10000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000005'),
  ('10000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000006'),
  ('10000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000007'),
  ('10000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000008'),
  ('10000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000005'),
  ('10000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000007'),
  ('10000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000008'),
  ('10000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000001'),
  ('10000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000002'),
  ('10000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000003'),
  ('10000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000004'),
  ('10000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000007'),
  ('10000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000009'),
  ('10000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000003'),
  ('10000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000009'),
  ('10000000-0000-0000-0000-000000000006', '20000000-0000-0000-0000-000000000008')
on conflict do nothing;

insert into service_plans (
  id,
  tenant_id,
  name,
  plan_code,
  download_speed_mbps,
  upload_speed_mbps,
  billing_code,
  status
)
values
  (
    '30000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000001',
    'Fiber Start 100',
    'FIBER_START_100',
    100,
    50,
    'FIB-100',
    'Active'
  ),
  (
    '30000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000001',
    'Fiber Max 300',
    'FIBER_MAX_300',
    300,
    150,
    'FIB-300',
    'Active'
  ),
  (
    '30000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000001',
    'Business 1000',
    'BUSINESS_1000',
    1000,
    500,
    'BIZ-1000',
    'Active'
  )
on conflict (tenant_id, plan_code) do update
set
  name = excluded.name,
  download_speed_mbps = excluded.download_speed_mbps,
  upload_speed_mbps = excluded.upload_speed_mbps,
  billing_code = excluded.billing_code,
  status = excluded.status;

insert into customers (
  id,
  tenant_id,
  account_number,
  full_name,
  email,
  phone,
  status
)
values
  (
    '40000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000001',
    'AC-10482',
    'Aarav Mehta',
    'aarav.mehta@example.net',
    '+91 98765 11001',
    'Active'
  ),
  (
    '40000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000001',
    'AC-10483',
    'Priya Shah',
    'priya.shah@example.net',
    '+91 98765 11002',
    'Pending Activation'
  ),
  (
    '40000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000001',
    'AC-10484',
    'Nimbus Co-working',
    'ops@nimbuscw.com',
    '+91 98765 11003',
    'Suspended'
  )
on conflict (tenant_id, account_number) do update
set
  full_name = excluded.full_name,
  email = excluded.email,
  phone = excluded.phone,
  status = excluded.status;

insert into service_locations (
  id,
  tenant_id,
  customer_id,
  address_line_1,
  city,
  state,
  postal_code,
  status
)
values
  (
    '50000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000001',
    '40000000-0000-0000-0000-000000000001',
    'Block 8, Bangalore North',
    'Bangalore North',
    'Karnataka',
    '560001',
    'Active'
  ),
  (
    '50000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000001',
    '40000000-0000-0000-0000-000000000002',
    'Sector 14, Whitefield',
    'Whitefield',
    'Karnataka',
    '560066',
    'Pending Activation'
  ),
  (
    '50000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000001',
    '40000000-0000-0000-0000-000000000003',
    '12th Main, Indiranagar',
    'Indiranagar',
    'Karnataka',
    '560038',
    'Suspended'
  )
on conflict (id) do update
set
  address_line_1 = excluded.address_line_1,
  city = excluded.city,
  state = excluded.state,
  postal_code = excluded.postal_code,
  status = excluded.status;

insert into subscriptions (
  id,
  tenant_id,
  customer_id,
  service_location_id,
  service_plan_id,
  status,
  activation_date,
  billing_account_ref
)
values
  (
    '60000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000001',
    '40000000-0000-0000-0000-000000000001',
    '50000000-0000-0000-0000-000000000001',
    '30000000-0000-0000-0000-000000000002',
    'Active',
    date '2026-03-02',
    'BILL-30492'
  ),
  (
    '60000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000001',
    '40000000-0000-0000-0000-000000000002',
    '50000000-0000-0000-0000-000000000002',
    '30000000-0000-0000-0000-000000000001',
    'Pending Provisioning',
    null,
    null
  ),
  (
    '60000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000001',
    '40000000-0000-0000-0000-000000000003',
    '50000000-0000-0000-0000-000000000003',
    '30000000-0000-0000-0000-000000000003',
    'Suspended',
    date '2026-01-14',
    'BILL-30494'
  )
on conflict (id) do update
set
  service_plan_id = excluded.service_plan_id,
  status = excluded.status,
  activation_date = excluded.activation_date,
  billing_account_ref = excluded.billing_account_ref;

insert into users (
  id,
  tenant_id,
  email,
  full_name,
  phone,
  user_type,
  status
)
values
  (
    '70000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000001',
    'anika.rao@isp.local',
    'Anika Rao',
    '+91 98765 22001',
    'staff',
    'Active'
  ),
  (
    '70000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000001',
    'karthik.sen@isp.local',
    'Karthik Sen',
    '+91 98765 22002',
    'staff',
    'Active'
  ),
  (
    '70000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000001',
    'maya.pillai@isp.local',
    'Maya Pillai',
    '+91 98765 22003',
    'staff',
    'Invited'
  )
on conflict (tenant_id, email) do update
set
  full_name = excluded.full_name,
  phone = excluded.phone,
  status = excluded.status;

insert into user_roles (id, user_id, role_id, tenant_id)
values
  (
    '80000000-0000-0000-0000-000000000001',
    '70000000-0000-0000-0000-000000000001',
    '10000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000001'
  ),
  (
    '80000000-0000-0000-0000-000000000002',
    '70000000-0000-0000-0000-000000000002',
    '10000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000001'
  ),
  (
    '80000000-0000-0000-0000-000000000003',
    '70000000-0000-0000-0000-000000000003',
    '10000000-0000-0000-0000-000000000004',
    '00000000-0000-0000-0000-000000000001'
  )
on conflict (id) do nothing;
