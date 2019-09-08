## Running Locally

`./deploy-app.sh` to run the app locally. The client web app runs at `localhost:3006`.

## Deploying

`./deploy-app.sh` to deploy the app. This will deploy the current state of your local branch.

#### Data Structure:

Realtime (Firebase):

- groupId
  - externalIds
    - availabilityStatus
    - meetingUrl
    - meetingName
    - meetingStartTime
    - dailyCalendarEvents
      - eventId
        - eventName
        - startTime
        - endTime
        - eventLink

Static (Firestore):

- externalId
  - groupId
  - displayName
  - personalMeetingUrl
- groupId
  - externalIds[]
