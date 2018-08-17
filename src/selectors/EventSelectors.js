export const findEvent = (store, eventPeriodId, eventId) => {
  for (const period of store.eventPeriods) {
    if (period.eventPeriodId === Number(eventPeriodId)) {
      for (const event of period.events) {
        if (event.eventId === Number(eventId)) {
          return event;
        }
      }
    }
  }
  return null;
};
