import { ensureGapiClient } from "./ensureGapiClient";

export const gapiCalendar = {
  listUpcomingEvents: async (): Promise<Array<gapi.client.calendar.Event>> => {
    const gapiClient = await ensureGapiClient();
    const response = await gapiClient.calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: "startTime",
    });

    const eventsResult: gapi.client.calendar.Events = response.result;
    const events = eventsResult.items || [];
    console.log("Upcoming events:", events);
    events.map(e => {
      const startTime = e.start ? e.start.dateTime || e.start.date : null;
      console.log(e.summary + " (" + startTime + ")");
    });
    return events;
  },
};
