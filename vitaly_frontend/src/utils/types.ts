// API data type
export interface ApiData {
  session_id: string;
  timestamp: string;
  muscle_activation: number;
  muscle_fatigue: number;
  force: number;
  velocity: number;
  power_output: number;
}

// Message type for AI chat
export interface ChatMessage {
  type: "user" | "ai";
  message: string;
}

// Force data type
export interface ForceData {
  current: number[];
  previous: number[];
}

// Velocity data type
export interface VelocityData {
  force: number[];
  velocity: number[];
}

// Correlation data type
export interface CorrelationData {
  external: number[];
  internal: number[];
}

// Gait data type
export interface GaitData {
  current: number[];
  previous: number[];
  baseline: number[];
}

// Previous session data type
export interface PreviousSessionData {
  force: number[];
  velocity: number[];
} 