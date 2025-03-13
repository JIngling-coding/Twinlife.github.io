export interface VerificationCode {
  id: number;
  type: 'email' | 'phone';
  target: string;
  code: string;
  purpose: 'register' | 'reset_password';
  expire_time: Date;
  created_at: Date;
  updated_at: Date;
} 