'use client';

import { useState, useEffect } from 'react';
import { FiCalendar, FiClock, FiMail, FiPlus, FiTrash2, FiCheck, FiX, FiVideo, FiEdit2 } from 'react-icons/fi';
import type { Meeting } from '@/types';

export default function AdminMeetingsPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState<Meeting | null>(null);

  // Form state
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [duration, setDuration] = useState(30);
  const [googleMeetLink, setGoogleMeetLink] = useState('');
  const [notes, setNotes] = useState('');

  // Load meetings
  const loadMeetings = async () => {
    try {
      const res = await fetch('/api/meetings');
      const data = await res.json();
      setMeetings(data.meetings || []);
    } catch (error) {
      console.error('Error loading meetings:', error);
    }
  };

  useEffect(() => {
    loadMeetings();
  }, []);

  // Create or Update meeting
  const handleSubmitMeeting = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const meetingData = {
        clientName,
        clientEmail,
        clientPhone,
        meetingDate,
        meetingTime,
        duration,
        googleMeetLink,
        notes,
      };

      const res = editingMeeting
        ? await fetch(`/api/meetings/${editingMeeting._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(meetingData),
          })
        : await fetch('/api/meetings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(meetingData),
          });

      if (res.ok) {
        resetForm();
        loadMeetings();
        setShowForm(false);
        setEditingMeeting(null);
      } else {
        alert(editingMeeting ? 'Randevu güncellenemedi. Lütfen tekrar deneyin.' : 'Randevu oluşturulamadı. Lütfen tekrar deneyin.');
      }
    } catch (error) {
      console.error('Error saving meeting:', error);
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  // Edit meeting
  const handleEditMeeting = (meeting: Meeting) => {
    setEditingMeeting(meeting);
    setClientName(meeting.clientName);
    setClientEmail(meeting.clientEmail);
    setClientPhone(meeting.clientPhone || '');
    setMeetingDate(new Date(meeting.meetingDate).toISOString().split('T')[0]);
    setMeetingTime(meeting.meetingTime);
    setDuration(meeting.duration);
    setGoogleMeetLink(meeting.googleMeetLink);
    setNotes(meeting.notes || '');
    setShowForm(true);
  };

  // Send invitation email
  const handleSendInvite = async (meetingId: string) => {
    if (!confirm('Randevu davetini göndermek istediğinize emin misiniz?')) {
      return;
    }

    try {
      const res = await fetch('/api/meetings/send-invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ meetingId }),
      });

      if (res.ok) {
        alert('Davet e-postası başarıyla gönderildi!');
        loadMeetings();
      } else {
        alert('E-posta gönderilemedi. Lütfen tekrar deneyin.');
      }
    } catch (error) {
      console.error('Error sending invite:', error);
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  // Delete meeting
  const handleDeleteMeeting = async (id: string) => {
    if (!confirm('Bu randevuyu silmek istediğinize emin misiniz?')) {
      return;
    }

    try {
      const res = await fetch(`/api/meetings/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        loadMeetings();
      }
    } catch (error) {
      console.error('Error deleting meeting:', error);
    }
  };

  // Update meeting status
  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/meetings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        loadMeetings();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const resetForm = () => {
    setClientName('');
    setClientEmail('');
    setClientPhone('');
    setMeetingDate('');
    setMeetingTime('');
    setDuration(30);
    setGoogleMeetLink('');
    setNotes('');
    setEditingMeeting(null);
  };

  // Group meetings by date
  const groupedMeetings = meetings.reduce((acc, meeting) => {
    const date = new Date(meeting.meetingDate).toLocaleDateString('tr-TR');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(meeting);
    return acc;
  }, {} as Record<string, Meeting[]>);

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Randevu Yönetimi</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Müşteri randevularını oluşturun ve yönetin
            </p>
          </div>
          <button
            onClick={() => {
              if (showForm) {
                setShowForm(false);
                resetForm();
              } else {
                setShowForm(true);
              }
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm sm:text-base"
          >
            {showForm ? <FiX size={18} /> : <FiPlus size={18} />}
            {showForm ? 'İptal' : 'Yeni Randevu'}
          </button>
        </div>

        {/* Create/Edit Meeting Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-foreground mb-4">
              {editingMeeting ? 'Randevu Düzenle' : 'Yeni Randevu Oluştur'}
            </h2>
            <form onSubmit={handleSubmitMeeting} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Müşteri Adı *
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  E-posta *
                </label>
                <input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Tarih *
                </label>
                <input
                  type="date"
                  value={meetingDate}
                  onChange={(e) => setMeetingDate(e.target.value)}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Saat *
                </label>
                <input
                  type="time"
                  value={meetingTime}
                  onChange={(e) => setMeetingTime(e.target.value)}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Süre (dakika)
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="input"
                >
                  <option value={15}>15 dakika</option>
                  <option value={30}>30 dakika</option>
                  <option value={45}>45 dakika</option>
                  <option value={60}>60 dakika</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Google Meet Linki *
                </label>
                <input
                  type="url"
                  value={googleMeetLink}
                  onChange={(e) => setGoogleMeetLink(e.target.value)}
                  className="input"
                  placeholder="https://meet.google.com/xxx-xxxx-xxx"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Google Meet'te yeni toplantı oluşturun ve linki buraya yapıştırın
                </p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Notlar
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="input"
                  rows={3}
                  placeholder="Randevu hakkında notlar..."
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
                >
                  {isLoading
                    ? (editingMeeting ? 'Güncelleniyor...' : 'Oluşturuluyor...')
                    : (editingMeeting ? 'Randevu Güncelle' : 'Randevu Oluştur')
                  }
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Meetings List */}
        {meetings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <FiCalendar size={48} className="text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">Henüz randevu yok</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedMeetings)
              .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
              .map(([date, dateMeetings]) => (
                <div key={date} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="bg-primary text-white px-6 py-3 font-semibold">
                    {date}
                  </div>
                  <div className="divide-y divide-border">
                    {dateMeetings.map((meeting) => (
                      <div key={meeting._id} className="p-6 hover:bg-muted/30 transition-colors">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-bold text-foreground">
                                {meeting.clientName}
                              </h3>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  meeting.status === 'scheduled'
                                    ? 'bg-blue-100 text-blue-800'
                                    : meeting.status === 'completed'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                }`}
                              >
                                {meeting.status === 'scheduled'
                                  ? 'Planlandı'
                                  : meeting.status === 'completed'
                                  ? 'Tamamlandı'
                                  : 'İptal Edildi'}
                              </span>
                              {meeting.emailSent && (
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 flex items-center gap-1">
                                  <FiCheck size={12} />
                                  Davet Gönderildi
                                </span>
                              )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
                              <div className="flex items-center gap-2">
                                <FiClock size={16} />
                                {meeting.meetingTime} ({meeting.duration} dk)
                              </div>
                              <div className="flex items-center gap-2">
                                <FiMail size={16} />
                                {meeting.clientEmail}
                              </div>
                              {meeting.clientPhone && (
                                <div className="flex items-center gap-2">
                                  📞 {meeting.clientPhone}
                                </div>
                              )}
                            </div>

                            {meeting.notes && (
                              <div className="bg-muted/50 rounded-lg p-3 mb-3">
                                <p className="text-sm text-foreground">{meeting.notes}</p>
                              </div>
                            )}

                            <a
                              href={meeting.googleMeetLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-primary hover:underline text-sm"
                            >
                              <FiVideo size={16} />
                              Google Meet Linki
                            </a>
                          </div>

                          <div className="flex flex-col gap-2">
                            {!meeting.emailSent && meeting.status === 'scheduled' && (
                              <button
                                onClick={() => handleSendInvite(meeting._id!)}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm flex items-center gap-2 whitespace-nowrap"
                              >
                                <FiMail size={16} />
                                Davet Gönder
                              </button>
                            )}

                            <button
                              onClick={() => handleEditMeeting(meeting)}
                              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm flex items-center gap-2"
                            >
                              <FiEdit2 size={16} />
                              Düzenle
                            </button>

                            {meeting.status === 'scheduled' && (
                              <button
                                onClick={() => handleUpdateStatus(meeting._id!, 'completed')}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm flex items-center gap-2"
                              >
                                <FiCheck size={16} />
                                Tamamlandı
                              </button>
                            )}

                            <button
                              onClick={() => handleDeleteMeeting(meeting._id!)}
                              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm flex items-center gap-2"
                            >
                              <FiTrash2 size={16} />
                              Sil
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
  );
}
