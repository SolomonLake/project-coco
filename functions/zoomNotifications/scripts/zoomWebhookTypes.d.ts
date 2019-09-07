export type Zoom_WebhookBody = Zoom_ParticipantJoined | Zoom_ParticipantLeft;

export type Zoom_ParticipantJoined = {
  event: "meeting.participant_joined";
  payload: {
    // "The account Id of the host."
    account_id: string;
    object: {
      // "Meeting ID - also known as the meeting number."
      id: string;
      // "Unique Meeting ID. Each meeting instance will generate its own meeting UUID."
      uuid: string;
      // "ID of the user who is set as the host of the meeting."
      host_id: string;
      // "Meeting Topic"
      topic: string;
      // "Meeting Types:<br> `1` - Instant Meeting<br> `2` - Scheduled Meeting<br> `3` - Recurring Meeting with no fixed time.<br> `8` - Recurring Meeting with a fixed time. "
      type: number;
      // [date-time]
      start_time: string;
      timezone: string;
      duration: number;
      participant: {
        // "This is the Participant ID. This is a unique ID assigned to the participant joining a meeting and is valid for that meeting only."
        user_id: string;
        user_name: string;
        // "Unique identifier of the participant. "
        id: string;
        // [date-time]
        join_time: string;
      };
    };
  };
};

export type Zoom_ParticipantLeft = {
  event: "meeting.participant_left";
  payload: {
    // "The account Id of the host."
    account_id: string;
    object: {
      // "Meeting ID - also known as the meeting number."
      id: string;
      // "Unique Meeting ID. Each meeting instance will generate its own meeting UUID."
      uuid: string;
      // "ID of the user who is set as the host of the meeting."
      host_id: string;
      // "Meeting Topic"
      topic: string;
      // "Meeting Types:<br> `1` - Instant Meeting<br> `2` - Scheduled Meeting<br> `3` - Recurring Meeting with no fixed time.<br> `8` - Recurring Meeting with a fixed time. "
      type: number;
      // [date-time]
      start_time: string;
      timezone: string;
      duration: number;
      participant: {
        // "This is the Participant ID. This is a unique ID assigned to the participant joining a meeting and is valid for that meeting only."
        user_id: string;
        user_name: string;
        // "Unique identifier of the participant. "
        id: string;
        // [date-time]
        leave_time: string;
      };
    };
  };
};
