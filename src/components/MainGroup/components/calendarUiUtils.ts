import { CalendarMeeting } from "../../../../sharedTypes/appGroupEntry";

export function getCurrentCalendarEvent(
  dailyCalendarEvents: Array<CalendarMeeting>,
): null | CalendarMeeting {
  const currentTimeNum = Date.now();

  const currentMeetings = dailyCalendarEvents.filter(m => {
    const localEndTime = new Date(m.endTime);
    const localEndTimeNum = localEndTime.getTime();
    const meetingEndsInTheFuture = localEndTimeNum > currentTimeNum;

    const localStartTime = new Date(m.startTime);
    const localStartTimeNum = localStartTime.getTime();
    const meetingStartedInThePast = localStartTimeNum < currentTimeNum;

    return meetingEndsInTheFuture && meetingStartedInThePast;
  });
  return currentMeetings[0];
}
