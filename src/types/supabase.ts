
import { Database as SupabaseDatabase } from '@/integrations/supabase/types';

// Extend the Supabase generated types with our custom tables
export interface Database extends SupabaseDatabase {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string | null;
          email: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id: string;
          name?: string | null;
          email?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string | null;
          email?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      user_subscriptions: {
        Row: {
          id: string;
          user_id: string;
          status: string;
          plan_type: string;
          current_period_start: string;
          current_period_end: string;
        }
        Insert: {
          id: string;
          user_id: string;
          status: string;
          plan_type: string;
          current_period_start: string;
          current_period_end: string;
        }
        Update: {
          id?: string;
          user_id?: string;
          status?: string;
          plan_type?: string;
          current_period_start?: string;
          current_period_end?: string;
        }
      }
    };
    Views: SupabaseDatabase['public']['Views'];
    Functions: SupabaseDatabase['public']['Functions'];
    Enums: SupabaseDatabase['public']['Enums'];
    CompositeTypes: SupabaseDatabase['public']['CompositeTypes'];
  };
}
