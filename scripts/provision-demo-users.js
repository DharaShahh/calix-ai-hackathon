const { createClient } = require("@supabase/supabase-js");
const { Client } = require("pg");

const DEFAULT_PASSWORD = "Password123!";
const TENANT_ID = "00000000-0000-0000-0000-000000000001";

const ROLE_IDS = {
  admin: "10000000-0000-0000-0000-000000000001",
  engineer: "10000000-0000-0000-0000-000000000002",
  noc: "10000000-0000-0000-0000-000000000003",
  support: "10000000-0000-0000-0000-000000000004",
  customer: "10000000-0000-0000-0000-000000000005",
  technician: "10000000-0000-0000-0000-000000000006"
};

const DEMO_USERS = [
  {
    key: "admin",
    profileId: "70000000-0000-0000-0000-000000000001",
    userRoleId: "80000000-0000-0000-0000-000000000001",
    email: "dhara.admin@yopmail.com",
    fullName: "Dhara Admin",
    phone: "+91 98765 33001",
    userType: "staff",
    status: "Active"
  },
  {
    key: "engineer",
    profileId: "70000000-0000-0000-0000-000000000002",
    userRoleId: "80000000-0000-0000-0000-000000000002",
    email: "dhara.engineer@yopmail.com",
    fullName: "Dhara Engineer",
    phone: "+91 98765 33002",
    userType: "staff",
    status: "Active"
  },
  {
    key: "support",
    profileId: "70000000-0000-0000-0000-000000000003",
    userRoleId: "80000000-0000-0000-0000-000000000003",
    email: "dhara.support@yopmail.com",
    fullName: "Dhara Support",
    phone: "+91 98765 33003",
    userType: "staff",
    status: "Active"
  },
  {
    key: "noc",
    profileId: "70000000-0000-0000-0000-000000000004",
    userRoleId: "80000000-0000-0000-0000-000000000004",
    email: "dhara.noc@yopmail.com",
    fullName: "Dhara NOC",
    phone: "+91 98765 33004",
    userType: "staff",
    status: "Active"
  },
  {
    key: "technician",
    profileId: "70000000-0000-0000-0000-000000000005",
    userRoleId: "80000000-0000-0000-0000-000000000005",
    email: "dhara.technician@yopmail.com",
    fullName: "Dhara Technician",
    phone: "+91 98765 33005",
    userType: "staff",
    status: "Active"
  },
  {
    key: "customer",
    profileId: "70000000-0000-0000-0000-000000000006",
    userRoleId: "80000000-0000-0000-0000-000000000006",
    email: "dhara.customer@yopmail.com",
    fullName: "Dhara Customer",
    phone: "+91 98765 33006",
    userType: "customer",
    status: "Active",
    customerId: "40000000-0000-0000-0000-000000000001"
  }
];

async function getOrCreateAuthUser(admin, user) {
  const pageSize = 100;
  let page = 1;

  while (true) {
    const { data, error } = await admin.auth.admin.listUsers({
      page,
      perPage: pageSize
    });

    if (error) {
      throw error;
    }

    const existing = data.users.find((item) => item.email?.toLowerCase() === user.email.toLowerCase());

    if (existing) {
      const { data: updated, error: updateError } = await admin.auth.admin.updateUserById(existing.id, {
        email: user.email,
        password: DEFAULT_PASSWORD,
        email_confirm: true,
        app_metadata: {
          role: user.key === "customer" ? "Customer" : user.key === "noc" ? "NOC Operator" : user.key === "technician" ? "Technician Lite" : user.key === "support" ? "Customer Support" : user.key === "engineer" ? "Network Engineer" : "Admin",
          user_type: user.userType
        },
        user_metadata: {
          full_name: user.fullName,
          role: user.key === "customer" ? "Customer" : user.key === "noc" ? "NOC Operator" : user.key === "technician" ? "Technician Lite" : user.key === "support" ? "Customer Support" : user.key === "engineer" ? "Network Engineer" : "Admin",
          user_type: user.userType
        }
      });

      if (updateError) {
        throw updateError;
      }

      return updated.user;
    }

    if (data.users.length < pageSize) {
      break;
    }

    page += 1;
  }

  const { data, error } = await admin.auth.admin.createUser({
    email: user.email,
    password: DEFAULT_PASSWORD,
    email_confirm: true,
    app_metadata: {
      role: user.key === "customer" ? "Customer" : user.key === "noc" ? "NOC Operator" : user.key === "technician" ? "Technician Lite" : user.key === "support" ? "Customer Support" : user.key === "engineer" ? "Network Engineer" : "Admin",
      user_type: user.userType
    },
    user_metadata: {
      full_name: user.fullName,
      role: user.key === "customer" ? "Customer" : user.key === "noc" ? "NOC Operator" : user.key === "technician" ? "Technician Lite" : user.key === "support" ? "Customer Support" : user.key === "engineer" ? "Network Engineer" : "Admin",
      user_type: user.userType
    }
  });

  if (error) {
    throw error;
  }

  return data.user;
}

async function main() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.");
  }

  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required.");
  }

  const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false }
  });

  const db = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  await db.connect();
  await db.query("begin");

  try {
    for (const user of DEMO_USERS) {
      const authUser = await getOrCreateAuthUser(admin, user);

      await db.query(
        `
          insert into users (id, tenant_id, auth_user_id, email, full_name, phone, user_type, status)
          values ($1, $2, $3, $4, $5, $6, $7, $8)
          on conflict (id) do update
          set
            auth_user_id = excluded.auth_user_id,
            email = excluded.email,
            full_name = excluded.full_name,
            phone = excluded.phone,
            user_type = excluded.user_type,
            status = excluded.status
        `,
        [
          user.profileId,
          TENANT_ID,
          authUser.id,
          user.email,
          user.fullName,
          user.phone,
          user.userType,
          user.status
        ]
      );

      await db.query(
        `
          insert into user_roles (id, user_id, role_id, tenant_id)
          values ($1, $2, $3, $4)
          on conflict (id) do update
          set
            user_id = excluded.user_id,
            role_id = excluded.role_id,
            tenant_id = excluded.tenant_id
        `,
        [user.userRoleId, user.profileId, ROLE_IDS[user.key], TENANT_ID]
      );

      if (user.userType === "customer") {
        await db.query(
          `
            update customers
            set
              email = $2,
              phone = $3,
              portal_user_id = $4
            where id = $1
          `,
          [user.customerId, user.email, user.phone, user.profileId]
        );
      }
    }

    await db.query("commit");
    console.log("Demo auth users provisioned successfully.");
  } catch (error) {
    await db.query("rollback");
    throw error;
  } finally {
    await db.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
