// src/app/models/call-coordinator.model.ts
export interface CallCoordinator {
  orderId: number;
  name: string;
  from: string;
  callerId: string;
  webhookUrl: string;
  status: number;
}
