import { CalendarEvent } from "./../../../sharedTypes/appGroupEntry.d";
import { gapiCalendar } from "./../../scripts/gapi/gapiCalendar";
import { appGroupsDatabaseAccessor } from "../../scripts/databaseServices/appGroupsDatabaseAccessor";

export const mainGroupActionCreator = {
  syncCalendarEvents: async (userId: string, appGroupId: string) => {
    const events: Array<
      gapi.client.calendar.Event
    > = await gapiCalendar.listUpcomingEvents();
    const calendarEvents = events.map(convertGapiCalendarEventToCalendarEvent);
    appGroupsDatabaseAccessor.setUserCalendarEvents(
      userId,
      appGroupId,
      calendarEvents,
    );
  },
};

function convertGapiCalendarEventToCalendarEvent(
  gapiCalendarEvent: gapi.client.calendar.Event,
): CalendarEvent {
  const id = gapiCalendarEvent.id;
  const eventName = gapiCalendarEvent.summary;
  const startTime = gapiCalendarEvent.start
    ? gapiCalendarEvent.start.dateTime || gapiCalendarEvent.start.date
    : null;
  const endTime = gapiCalendarEvent.end
    ? gapiCalendarEvent.end.dateTime || gapiCalendarEvent.end.date
    : null;
  const eventLink = gapiCalendarEvent.htmlLink;
  if (id && eventName && startTime && endTime && eventLink) {
    return {
      id,
      eventName,
      startTime,
      endTime,
      eventLink,
    };
  } else {
    console.log("gapi calendar event", gapiCalendarEvent);
    throw new Error("gapi calendar event is missing properties");
  }
}
