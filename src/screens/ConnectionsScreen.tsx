import React, { useState } from 'react';
import { ScreenId, ContactItem, ConnectionNotification } from '../types';
import { INITIAL_CONTACTS, INITIAL_NOTIFICATIONS } from '../data/mockData';

interface ConnectionsScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const ConnectionsScreen: React.FC<ConnectionsScreenProps> = ({ onNavigate }) => {
  const [contacts, setContacts] = useState<ContactItem[]>(INITIAL_CONTACTS);
  const [notifications, setNotifications] = useState<ConnectionNotification[]>(INITIAL_NOTIFICATIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [archivedItems, setArchivedItems] = useState([
    { id: 'arc-1', title: 'History Dept. Meeting Invitation', icon: 'group' },
    { id: 'arc-2', title: 'System Alert: Route Change', icon: 'mail' },
  ]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleAccept = (id: string, name: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, status: 'accepted' } : n))
    );
    showToast(`Connected with ${name}!`);
  };

  const handleRemoveNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
    showToast('Notification dismissed.');
  };

  const handleRemoveContact = (id: string) => {
    setContacts(contacts.filter((c) => c.id !== id));
    showToast('Contact removed from favourites.');
  };

  const handleCreateContact = () => {
    if (!newContactName.trim()) return;
    const newC: ContactItem = {
      id: `c-${Date.now()}`,
      name: newContactName,
      status: 'Active now',
      avatarUrl:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      isFavorite: true,
    };
    setContacts([newC, ...contacts]);
    setNewContactName('');
    setShowAddModal(false);
    showToast(`Added ${newC.name} to favourites!`);
  };

  const handleUnarchive = (id: string, title: string) => {
    setArchivedItems(archivedItems.filter((item) => item.id !== id));
    showToast(`Unarchived: ${title}`);
  };

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-background text-on-surface min-h-[90vh] pb-28 pt-2 px-4 md:px-8 max-w-7xl mx-auto space-y-6">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-primary text-on-primary px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 text-xs md:text-sm font-semibold animate-in fade-in slide-in-from-top-4">
          <span className="material-symbols-outlined text-[18px]">verified</span>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight">
            Connections & Activity
          </h1>
          <p className="text-xs md:text-sm text-on-surface-variant mt-0.5">
            Manage your network and stay updated with your requests.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-primary text-on-primary px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-[0_4px_16px_rgba(67,97,238,0.2)] hover:bg-primary-container active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            <span>Add New Contact</span>
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: Contacts Management (4 cols) */}
        <div className="md:col-span-4 space-y-5">
          {/* Add People Section */}
          <section className="bg-surface-container-lowest p-5 md:p-6 rounded-[24px] shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-surface-container">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">group_add</span>
                <span>Add People</span>
              </h2>
            </div>
            <div className="space-y-3">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search contact"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-surface-container-highest focus:border-primary outline-none transition-all text-xs md:text-sm text-on-surface"
                />
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowAddModal(true)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border-2 border-primary text-primary font-bold text-xs hover:bg-primary-fixed transition-colors active:scale-98 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">person_add</span>
                  <span>Create contact</span>
                </button>
                <button
                  type="button"
                  onClick={() => showToast('Connection request broadcast initiated.')}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-surface-container-high text-on-surface-variant font-bold text-xs hover:bg-surface-container-highest transition-colors active:scale-98 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  <span>Request</span>
                </button>
              </div>
            </div>
          </section>

          {/* Favourite Contacts Section */}
          <section className="bg-surface-container-lowest p-5 md:p-6 rounded-[24px] shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-surface-container">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-error text-[20px] icon-filled">
                  favorite
                </span>
                <span>Favourite</span>
              </h2>
              <span className="text-xs text-on-surface-variant font-medium">
                {contacts.length} Contacts
              </span>
            </div>

            <div className="space-y-3.5">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between group p-1 rounded-xl hover:bg-surface-container-low transition-colors"
                >
                  <div
                    onClick={() => onNavigate('chat')}
                    className="flex items-center gap-3 cursor-pointer grow min-w-0"
                  >
                    <img
                      src={contact.avatarUrl}
                      alt={contact.name}
                      className="w-10 h-10 rounded-full object-cover shrink-0 border border-outline-variant/30"
                    />
                    <div className="min-w-0">
                      <p className="text-xs md:text-sm font-bold text-on-surface truncate group-hover:text-primary transition-colors">
                        {contact.name}
                      </p>
                      <p className="text-[11px] text-on-surface-variant">{contact.status}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveContact(contact.id)}
                    className="text-error text-xs font-semibold md:opacity-0 md:group-hover:opacity-100 transition-opacity px-2.5 py-1 rounded-full border border-error/50 hover:bg-error-container/30 shrink-0 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Notifications Feed & Archive (8 cols) */}
        <div className="md:col-span-8 space-y-5">
          {/* Notifications Feed */}
          <section className="bg-surface-container-lowest p-5 md:p-6 rounded-[24px] shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-surface-container min-h-[380px]">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base md:text-lg font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">
                  notifications_active
                </span>
                <span>Notifications</span>
              </h2>
              <button
                onClick={() => {
                  setNotifications(notifications.map((n) => ({ ...n, status: 'accepted' })));
                  showToast('All notifications marked as read.');
                }}
                className="text-primary font-bold text-xs hover:underline cursor-pointer"
              >
                Mark all as read
              </button>
            </div>

            <div className="space-y-4">
              {notifications.map((notif) => {
                const isAccepted = notif.status === 'accepted';
                return (
                  <div
                    key={notif.id}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 hover:shadow-sm transition-all gap-4 ${
                      isAccepted ? 'opacity-65' : ''
                    }`}
                  >
                    <div className="flex gap-3.5 items-start">
                      <div className="relative shrink-0">
                        <img
                          src={notif.avatarUrl}
                          alt={notif.senderName}
                          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-primary text-on-primary w-5 h-5 rounded-full flex items-center justify-center text-[10px] border-2 border-white">
                          <span className="material-symbols-outlined text-[13px]">person_add</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-on-surface">{notif.senderName}</h3>
                        <p className="text-xs text-on-surface-variant leading-snug mt-0.5">
                          {notif.message}
                        </p>
                        <span className="text-[10px] text-outline mt-1 block">
                          {notif.timeAgo}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      {isAccepted ? (
                        <span className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">check</span>
                          Accepted
                        </span>
                      ) : (
                        <>
                          <button
                            onClick={() => handleAccept(notif.id, notif.senderName)}
                            className="px-4 py-1.5 bg-primary text-on-primary rounded-full text-xs font-bold hover:shadow-md transition-all active:scale-95 cursor-pointer"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleRemoveNotification(notif.id)}
                            className="px-4 py-1.5 border-2 border-outline/40 text-on-surface-variant rounded-full text-xs font-bold hover:bg-surface-container-high transition-colors cursor-pointer"
                          >
                            Remove
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => showToast('Displaying 12 archived network notifications')}
                className="bg-surface-container-high text-on-surface px-5 py-2 rounded-xl text-xs font-bold hover:bg-surface-container-highest transition-colors cursor-pointer"
              >
                Archived
              </button>
            </div>
          </section>

          {/* Archived Section */}
          <section className="bg-surface-container-low p-5 md:p-6 rounded-[24px] border-2 border-dashed border-outline-variant">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-on-surface-variant flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">archive</span>
                <span>Archived</span>
              </h2>
              <span className="text-xs text-outline">Recently hidden items</span>
            </div>

            <div className="space-y-2.5">
              {archivedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-surface rounded-xl border border-surface-container hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="material-symbols-outlined text-outline text-[18px]">
                      {item.icon}
                    </span>
                    <p className="text-xs font-semibold text-on-surface truncate">{item.title}</p>
                  </div>
                  <button
                    onClick={() => handleUnarchive(item.id, item.title)}
                    className="text-primary text-xs font-bold flex items-center gap-1 hover:bg-primary-fixed px-3 py-1 rounded-full transition-all active:scale-95 shrink-0 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[14px]">unarchive</span>
                    <span>unarchive</span>
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-20 right-6 w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-30 cursor-pointer"
        title="Add Contact"
      >
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>

      {/* Add Contact Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-outline-variant/30"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-on-surface mb-2">Create New Contact</h3>
            <p className="text-xs text-on-surface-variant mb-4">
              Add a classmate or faculty member to your direct network.
            </p>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-on-surface-variant">Full Name</label>
                <input
                  type="text"
                  value={newContactName}
                  onChange={(e) => setNewContactName(e.target.value)}
                  placeholder="e.g. Professor Williams"
                  className="w-full mt-1 px-3.5 py-2.5 rounded-xl border-2 border-surface-container-high focus:border-primary outline-none text-xs"
                />
              </div>
            </div>
            <div className="mt-5 flex gap-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2.5 rounded-full border border-outline/30 text-xs font-semibold hover:bg-surface-container"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateContact}
                className="flex-1 py-2.5 rounded-full bg-primary text-on-primary text-xs font-bold hover:bg-primary-container"
              >
                Save Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
