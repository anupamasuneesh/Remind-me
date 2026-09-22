import { UserProfile, ReminderItem, ChatMessage, ContactItem, ConnectionNotification, CommuteInfo } from '../types';

export const INITIAL_USER: UserProfile = {
  name: 'Alex Rivera',
  studentId: '2024-STUDENT-8842',
  role: 'Senior Student',
  major: 'Tech Major',
  avatarUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDy_A5K_4eTtRKPMWifFfG_hFZAWmJuGgt7UIVZRvoVXFAdranhuSGG0wuw7CXPEdTvuyHau4eQSgBbvid3vBpn7PKZG0XpHSYeDjTZkvewnvyfjDnF_JXKBzQ2pxGOZPzHerSvMIEh--2R7V0tGyzyZVUgUDlxZnt6UaGBMRZ2w9c_gA5lzcfd2_OlIAQzZyjmI6eOFFrXEHzaFrpOptdZ9Qt21GRtK7CcgCkWr_A9QSYW6zuF3vlpPA',
  academicStanding: 'Good',
  attendanceRate: 94.2,
  presentSessions: 42,
  excusedSessions: 2,
};

export const INITIAL_REMINDERS: ReminderItem[] = [
  {
    id: 'rem-1',
    title: 'CS101 Faculty Briefing',
    location: 'Main Auditorium',
    time: '09:00 AM',
    alertBefore: '10 minutes before',
    category: 'class',
  },
  {
    id: 'rem-2',
    title: 'Design Systems Lab',
    location: 'Hall B - Room 302',
    time: 'In 15 mins',
    alertBefore: '15 minutes before',
    category: 'class',
  },
  {
    id: 'rem-3',
    title: 'Archived Notifications',
    location: 'System Log • Review Pending',
    time: 'Yesterday',
    alertBefore: 'None',
    category: 'system',
    archived: true,
  },
];

export const INITIAL_ARCHIVED_ALERTS = [
  { id: 'arc-1', title: 'Traffic Alert - 10/12/23', date: '10/12/23' },
  { id: 'arc-2', title: 'History Dept. Meeting Invitation', date: '09/18/23' },
  { id: 'arc-3', title: 'System Alert: Route Change', date: '09/15/23' },
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'alex',
    text: 'Hi there! Did you get a chance to check the updated schedule for the computer science faculty meeting tomorrow?',
    time: '09:41 AM',
    status: 'read',
  },
  {
    id: 'msg-2',
    sender: 'user',
    text: "Hey Alex! Yes, I just saw it. I'll be attending the session. Should I prepare the attendance log report beforehand?",
    time: '09:43 AM',
    status: 'read',
  },
  {
    id: 'msg-3',
    sender: 'alex',
    text: 'That would be perfect. The department head asked for the percentage graph too if possible.',
    time: '09:45 AM',
    status: 'read',
  },
  {
    id: 'msg-4',
    sender: 'user',
    text: "No problem, I'll have it ready. See you there!",
    time: '09:46 AM',
    status: 'read',
  },
];

export const INITIAL_CONTACTS: ContactItem[] = [
  {
    id: 'con-1',
    name: 'Sarah Miller',
    status: 'Active now',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDo0oglQjllNqmcyLPesDbwpU0miXgJaMJpI68kr6mXiZNXrvG6ijASQKJ15hmgBK_-JN58w0YXrN3YQDdQEqQZyiPDSF_yeevxhbMarYie3FRnc5wq-Y-EeJSLYWFcAUR6bWaB9FD47Lx8R9okA_ks14kegIDNIcYXTZJum7LEkF0soJpBMffyCTlkRdx4nqHpbaYWGgTY7t8DRZDgYiNBZgC7sMAVjkCvv8S27e_DX4KH8lR6HqWHPA',
    isFavorite: true,
  },
  {
    id: 'con-2',
    name: 'James Wilson',
    status: 'Last seen 2h ago',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD60lY8mcbKVJWEWHflAckvaQgv_XpWiMlvwzy3SDwtziDn5nThdyz10AYTZhA3wHOIhxD0nonRxp_SeJICX23Z4K8PfL4rnMpOzbG1xal8h_6gvTYJJJI5DHkgD5uzKlEhaWnok3gTuhEidZFVAzdnQggo02NGrUWeBzbfaxg73rVplldNtt13O36K8ewvyr73RNSiUHrtRE0W4k9rG8vnxI5wwoWMAa5G6EASVk6FFpJjcjOHzlPFIA',
    isFavorite: true,
  },
  {
    id: 'con-3',
    name: 'Elena Rodriguez',
    status: 'Offline',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBrohUH3BppGZUGbgGAr9xd2SzT6Tsdy6pb85tPgdjTuTyJGajh2r4hKDR9qOx6Swk9Kn9jMKhvG-8qVn2md9024lRhVwTNtPrdTMUj_G8Wr0KFQA2FwADD2cvG9LAM0M1I2-tM7RSlleugmrjGNNkJlZ22TwKAOkQNMfY48-Ofs1Lk9zLUNkTB0C-2JvvoFWjXnb_qnXXO-XnazP8IXMP9cpwN2MmZTC1cwi8k3l3N3X6_qJgzVgN-lQ',
    isFavorite: true,
  },
];

export const INITIAL_NOTIFICATIONS: ConnectionNotification[] = [
  {
    id: 'notif-1',
    senderName: 'David Chen',
    message: 'Sent you a connection request for the "Computer Science Faculty" group.',
    timeAgo: '2 minutes ago',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCQepNs7ChpoZ3hWwzZAMT2ArGZzvkn1jaNoeZ74ZGUlNMHWnhjaPW1WK9_Q9zZUAkiQycjXafG-LbAxBa8eGbBE0--t97U1ID3oaQdPgWeHKge-dGHa-NgldXeZfC06RcjCnKBOUwvlyt0X_BQXzWH01zTe8SuHub8TELGO6R-aRv1UXq0JbjHzOA3mkem0uUagtVY5P6f2rKxVEnnRS-5Idqez9xMJju91SMn1eN5o6e3TMxRcaf3mQ',
    type: 'group_invite',
    status: 'pending',
  },
  {
    id: 'notif-2',
    senderName: 'Maya Patel',
    message: 'Wants to share their "Morning Route" with you.',
    timeAgo: '1 hour ago',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAxfZVGIX89OWoGJ2YALWF9Z2edLBasusJynoqKx1ht9Y3gtVgNNBRsuMjvxFDuah18iVhmkuNZGtZNp2qcgzKirLFLJnGDhh9FcyeqipujZ6oecCSJp8pF_n3Tnl89EbNGOVuV-BXZnKyIBzORTeQGnoLJNCD8HTaJzgnjrNc3-XnD3gOem3w2ryLqxjOR_oiMMvVEtO2VvXDjKjEvDMYt4hUeXL3l_bik4B8wJTDWuzb1WCY48fooKA',
    type: 'route_share',
    status: 'pending',
  },
];

export const INITIAL_COMMUTE: CommuteInfo = {
  from: 'Home Residence',
  to: 'Main Campus',
  status: 'Delayed (Heavy Traffic)',
  recommendedLeaveTime: '08:15 AM',
  trafficDelayMinutes: 10,
  distanceKm: 12.4,
  estMinutes: 24,
};

export const PROFESSOR_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBLJofMcvpirs5GMU2DWps5GbjqqYYu8yoqhLKGEVRQXoUyLRSZmANVcPxgAuX5fWRNYgEcU-6BedcVr8v7SLh6Da-aaQwTOdvHHZRwzso2T55ZC23-kJ5umn2peuRcfFVRl4Ukn6NMJltF2fS3YvLZQNXulRicEVYdHjOVBcfYVvRJEzyvDiKOThvptJHWi3pFm9lxasV72wLcH4zRfrPNFCf1oKr5TFPEZW5EnNXZMOHwVrJUGWz6_w';

export const CHAT_PARTNER_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuClEU3dtgrBILZFSVjWFabjjhDtN1mfLbT3Bhq1QxUgC8A7sQDxsvJQMubC6fgv0PF3o-31nn_h35pgMT9ngUTvvV_idtUGbP70cA1Rdewq4qsPitvISqddXLFbVHK9wqxMm_R_wPi2aZyzzXWlqtcAWiyKqL7o1Hbo64XnEkDCJoVlKoPi5gSQNXFOdLg-7YuAmy1XKiiWS5rt4ZQir1s8fOuhXIG_Yib4p2Cg6mJDvKQFMMEqhJ5MIw';

export const MAP_TEXTURE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDm2Qd0h2FcuO_AwwM6J8ImYDpTnaYcIhNQd7btWk2oKncV8EVgQ1dI9Fk1bkFcXtk5He5kMcucQUGiw7OST2N6k7dQNSVCyuceFX9-VG_FWVAXAQbO3_jEnVnsbRsfPts6XCSsgUE-yOs08MsXiq52_yGJX-8vNXQ-XeIC4J3vm-6YMfdp5PXdUZmJ1v6Fh0GzGJy5kJ24meFBih6zJDfQ9DVPYYC8Ax7AOHmEqnYU6zZQDYLp1xghbA';
