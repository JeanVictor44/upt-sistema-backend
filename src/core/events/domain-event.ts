export interface DomainEvent {
  occurredAt: Date
  getAggregateId(): number
}
