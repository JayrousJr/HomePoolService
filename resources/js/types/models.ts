// Pagination wrapper interface
export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

// Client Category interface
export interface ClientCategory {
    id: number;
    name: string;
    description?: string | null;
    created_at: string;
    updated_at: string;
}

// Client interface
export interface Client {
    id: number;
    name: string;
    email: string;
    phone: string;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    zip: string;
    category_id: number;
    category?: ClientCategory;
    active: boolean;
    notes?: string | null;
    created_at: string;
    updated_at: string;
}

// Service Request interface
export interface ServiceRequest {
    id: number;
    name: string;
    email: string;
    phone: string;
    service: string;
    message?: string | null;
    assigned: boolean;
    assigned_to?: number | null;
    assigned_user?: {
        id: number;
        name: string;
        email: string;
    } | null;
    created_at: string;
    updated_at: string;
}

// Task interface
export interface Task {
    id: number;
    service_request_id: number;
    service_request?: ServiceRequest;
    technician_id: number;
    technician?: {
        id: number;
        name: string;
        email: string;
    };
    status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
    comments?: string | null;
    scheduled_date?: string | null;
    completed_date?: string | null;
    created_at: string;
    updated_at: string;
}

// Assigned Task interface (for technicians view)
export interface AssignedTask {
    id: number;
    service_request_id: number;
    service_request?: ServiceRequest;
    status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
    comments?: string | null;
    scheduled_date?: string | null;
    completed_date?: string | null;
    created_at: string;
    updated_at: string;
}

// Message interface (Contact form submissions)
export interface Message {
    id: number;
    name: string;
    email: string;
    phone?: string | null;
    subject: string;
    message: string;
    read: boolean;
    replied: boolean;
    created_at: string;
    updated_at: string;
}

// Job Applicant interface
export interface JobApplicant {
    id: number;
    name: string;
    email: string;
    phone: string;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    zip?: string | null;
    resume_path?: string | null;
    cover_letter?: string | null;
    hire_status: 'pending' | 'reviewing' | 'interviewed' | 'hired' | 'rejected';
    notes?: string | null;
    created_at: string;
    updated_at: string;
}

// Visitor interface (Analytics)
export interface Visitor {
    id: number;
    ip_address: string;
    user_agent?: string | null;
    request_count: number;
    last_visited_at: string;
    created_at: string;
    updated_at: string;
}

// Gallery interface
export interface Gallery {
    id: string;
    image_path: string;
    created_at: string;
    updated_at: string;
}

// Dashboard Stats interface
export interface DashboardStats {
    total_users: number;
    total_clients: number;
    total_service_requests: number;
    total_tasks: number;
    total_messages: number;
}

// About interface
export interface About {
    id: string;
    title: string;
    description: string;
    image_path?: string | null;
    created_at: string;
    updated_at: string;
}

// Company Info interface
export interface CompanyInfo {
    id: number;
    name: string;
    email: string;
    phone: string;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    zip?: string | null;
    description?: string | null;
    logo_path?: string | null;
    created_at: string;
    updated_at: string;
}

// Popup interface
export interface Popup {
    id: string;
    title: string;
    content: string;
    image_path?: string | null;
    active: boolean;
    start_date?: string | null;
    end_date?: string | null;
    created_at: string;
    updated_at: string;
}

// Social Network interface
export interface SocialNetwork {
    id: number;
    platform: string;
    url: string;
    icon?: string | null;
    active: boolean;
    order?: number | null;
    created_at: string;
    updated_at: string;
}
