'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiChevronLeft, FiChevronRight, FiClock, FiMail, FiVideo, FiEdit2 } from 'react-icons/fi';
import type { Meeting } from '@/types';

export default function AdminCalendarPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [showDayDetails, setShowDayDetails] = useState(false);

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

  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const monthNames = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];

  const dayNames = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Get meetings for a specific day
  const getMeetingsForDay = (day: number) => {
    return meetings.filter(meeting => {
      const meetingDate = new Date(meeting.meetingDate);
      return (
        meetingDate.getDate() === day &&
        meetingDate.getMonth() === currentDate.getMonth() &&
        meetingDate.getFullYear() === currentDate.getFullYear()
      );
    });
  };

  // Check if date is today
  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  // Handle day click
  const handleDayClick = (day: number) => {
    const dayMeetings = getMeetingsForDay(day);
    if (dayMeetings.length > 0) {
      setSelectedDay(day);
      setShowDayDetails(true);
      setSelectedMeeting(null); // Clear individual meeting selection
    }
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="min-h-32 bg-muted/30" />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayMeetings = getMeetingsForDay(day);
      const today = isToday(day);

      days.push(
        <div
          key={day}
          onClick={() => handleDayClick(day)}
          className={`min-h-32 border border-border p-2 hover:bg-muted/50 transition-colors ${
            dayMeetings.length > 0 ? 'cursor-pointer' : ''
          } ${today ? 'bg-primary/5 border-primary' : 'bg-white'}`}
        >
          <div className={`text-sm font-semibold mb-2 ${today ? 'text-primary' : 'text-foreground'}`}>
            {day}
            {today && <span className="ml-1 text-xs">(Bugün)</span>}
          </div>
          <div className="space-y-1">
            {dayMeetings.slice(0, 2).map((meeting) => (
              <div
                key={meeting._id}
                className={`w-full text-left px-2 py-1 rounded text-xs ${
                  meeting.status === 'scheduled'
                    ? 'bg-blue-100 text-blue-800 border border-blue-200'
                    : meeting.status === 'completed'
                    ? 'bg-green-100 text-green-800 border border-green-200'
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}
              >
                <div className="font-semibold truncate">{meeting.meetingTime}</div>
                <div className="truncate">{meeting.clientName}</div>
              </div>
            ))}
            {dayMeetings.length > 2 && (
              <div className="text-xs text-muted-foreground text-center py-1">
                +{dayMeetings.length - 2} daha
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Takvim</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Tüm randevularınızı takvim üzerinde görüntüleyin
            </p>
          </div>
          <Link
            href="/admin/meetings"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm sm:text-base"
          >
            <FiEdit2 size={18} />
            Randevu Yönetimi
          </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Calendar Header */}
              <div className="bg-gradient-to-r from-primary-dark to-primary text-white p-4">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={previousMonth}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <FiChevronLeft size={24} />
                  </button>
                  <h2 className="text-2xl font-bold">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h2>
                  <button
                    onClick={nextMonth}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <FiChevronRight size={24} />
                  </button>
                </div>
                <button
                  onClick={goToToday}
                  className="w-full px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm font-medium"
                >
                  Bugüne Git
                </button>
              </div>

              {/* Day Names */}
              <div className="grid grid-cols-7 bg-muted">
                {dayNames.map((day) => (
                  <div
                    key={day}
                    className="text-center py-3 text-sm font-semibold text-foreground border-b border-border"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7">
                {generateCalendarDays()}
              </div>
            </div>

            {/* Legend */}
            <div className="bg-white rounded-xl shadow-lg p-4 mt-4">
              <h3 className="font-semibold text-foreground mb-3">Durum Renkleri</h3>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded" />
                  <span className="text-sm text-muted-foreground">Planlandı</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-100 border border-green-200 rounded" />
                  <span className="text-sm text-muted-foreground">Tamamlandı</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-100 border border-red-200 rounded" />
                  <span className="text-sm text-muted-foreground">İptal Edildi</span>
                </div>
              </div>
            </div>
        </div>

        {/* Meeting Details Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              {selectedMeeting ? (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-foreground">Randevu Detayları</h3>
                    <button
                      onClick={() => setSelectedMeeting(null)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">Müşteri</div>
                      <div className="text-lg font-semibold text-foreground">
                        {selectedMeeting.clientName}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">Tarih</div>
                      <div className="text-foreground">
                        {new Date(selectedMeeting.meetingDate).toLocaleDateString('tr-TR', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
                        <FiClock size={16} />
                        Saat
                      </div>
                      <div className="text-foreground">
                        {selectedMeeting.meetingTime} ({selectedMeeting.duration} dk)
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
                        <FiMail size={16} />
                        E-posta
                      </div>
                      <div className="text-foreground">{selectedMeeting.clientEmail}</div>
                    </div>

                    {selectedMeeting.clientPhone && (
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">Telefon</div>
                        <div className="text-foreground">{selectedMeeting.clientPhone}</div>
                      </div>
                    )}

                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">Durum</div>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          selectedMeeting.status === 'scheduled'
                            ? 'bg-blue-100 text-blue-800'
                            : selectedMeeting.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {selectedMeeting.status === 'scheduled'
                          ? 'Planlandı'
                          : selectedMeeting.status === 'completed'
                          ? 'Tamamlandı'
                          : 'İptal Edildi'}
                      </span>
                    </div>

                    {selectedMeeting.notes && (
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">Notlar</div>
                        <div className="text-sm text-foreground bg-muted/50 rounded-lg p-3">
                          {selectedMeeting.notes}
                        </div>
                      </div>
                    )}

                    <div className="pt-4 border-t border-border">
                      <a
                        href={selectedMeeting.googleMeetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                      >
                        <FiVideo size={20} />
                        Google Meet'e Katıl
                      </a>
                    </div>

                    <div>
                      <Link
                        href="/admin/meetings"
                        className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
                      >
                        <FiEdit2 size={16} />
                        Düzenle
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <FiClock size={48} className="text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Detayları görmek için bir randevuya tıklayın
                  </p>
                </div>
              )}
          </div>
        </div>
      </div>

      {/* Day Details Modal */}
      {showDayDetails && selectedDay && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => {
              setShowDayDetails(false);
              setSelectedDay(null);
            }}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl z-50 w-[95%] sm:w-full max-w-2xl max-h-[85vh] sm:max-h-[80vh] overflow-y-auto mx-2 sm:mx-0">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-3 sm:p-4 flex items-center justify-between rounded-t-xl">
              <h2 className="text-base sm:text-xl font-bold text-foreground">
                {selectedDay} {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()} - Randevular
              </h2>
              <button
                onClick={() => {
                  setShowDayDetails(false);
                  setSelectedDay(null);
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>
            <div className="p-3 sm:p-6 space-y-3 sm:space-y-4">
              {getMeetingsForDay(selectedDay).map((meeting) => (
                <div
                  key={meeting._id}
                  className="border border-border rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-2 sm:gap-0 mb-3">
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg font-bold text-foreground">{meeting.clientName}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                        <FiClock size={14} />
                        {meeting.meetingTime} ({meeting.duration} dk)
                      </p>
                    </div>
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
                  </div>

                  <div className="space-y-2 mb-3">
                    <p className="text-sm text-foreground flex items-center gap-2">
                      <FiMail size={14} />
                      {meeting.clientEmail}
                    </p>
                    {meeting.clientPhone && (
                      <p className="text-sm text-foreground">📞 {meeting.clientPhone}</p>
                    )}
                  </div>

                  {meeting.notes && (
                    <div className="bg-muted/50 rounded-lg p-3 mb-3">
                      <p className="text-sm text-foreground">{meeting.notes}</p>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-2">
                    <a
                      href={meeting.googleMeetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-xs sm:text-sm"
                    >
                      <FiVideo size={14} />
                      Google Meet
                    </a>
                    <button
                      onClick={() => {
                        setSelectedMeeting(meeting);
                        setShowDayDetails(false);
                      }}
                      className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors text-xs sm:text-sm"
                    >
                      <FiEdit2 size={14} />
                      Detaylar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
