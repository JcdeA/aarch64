type DropdownItem = {
    label: string;
    icon: string;
    action: (e: MouseEvent) => void;
};

// NEW TYPES

type User = {
    email: string;
    projects: Project[];
    admin: boolean;
};

type Project = {
    _id: string;
    name: string;
    vms: VM[];
    users: string[];
    budget: number;
    budget_used: number;
};

type VM = {
    _id: string;
    hostname: string;
    pop: string;
    project: string;
    prefix: string;
    os: string;
    host: number;
    vcpus: number;
    memory: number;
    ssd: number;
    password: string;
    phoned_home: boolean;
    address: string;
    gateway: string;
    creator: string;
    created: { by: string; at: number };
};

type System = {
    pops: Pop[];
    plans: { [key: string]: Plan };
    oses: { [key: string]: OS };
};

type OS = {
    version: string;
    url: string;
};

type Pop = {
    _id: string;
    name: string;
    provider: string;
    location: string;
    peeringdb_id: number;
};

type Plan = {
    vcpus: number;
    memory: number;
    ssd: number;
};

type Log = {
    _id: string,
    time: number,
    title: string,
    user_id: string,
    user_name: string,
    project_id: string,
    project_name: string,
    proxy_id: string,
    proxy_name: string,
    vm_id: string,
    vm_name: string,
}
