export type ScreenId =
  | 'create_account'
  | 'dashboard'
  | 'attendance'
  | 'reminders'
  | 'connections'
  | 'travel'
  | 'chat'
  | 'login_portal';

export interface UserProfile {
  name: string;
  studentId: string;
  role: string;
  major: string;
  avatarUrl: string;
  academicStanding: string;
  attendanceRate: number;
  presentSessions: number;
  excusedSessions: number;
}

export interface ReminderItem {
  id: string;
  title: string;
  location?: string;
  time: string;
  alertBefore: string;
  category: 'class' | 'meeting' | 'system' | 'custom';
  archived?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'alex';
  text: string;
  time: string;
  status?: 'sent' | 'delivered' | 'read';
}

export interface ContactItem {
  id: string;
  name: string;
  status: string;
  avatarUrl: string;
  isFavorite?: boolean;
}

export interface ConnectionNotification {
  id: string;
  senderName: string;
  message: string;
  timeAgo: string;
  avatarUrl: string;
  type: 'group_invite' | 'route_share';
  status: 'pending' | 'accepted' | 'removed';
}

export interface CommuteInfo {
  from: string;
  to: string;
  status: string;
  recommendedLeaveTime: string;
  trafficDelayMinutes: number;
  distanceKm: number;
  estMinutes: number;
}
