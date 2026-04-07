export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          role: Database['public']['Enums']['user_role'];
          full_name: string;
          phone: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          role?: Database['public']['Enums']['user_role'];
          full_name: string;
          phone?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          role?: Database['public']['Enums']['user_role'];
          full_name?: string;
          phone?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      creches: {
        Row: {
          id: string;
          owner_id: string;
          name: string;
          slug: string;
          description: string | null;
          phone: string | null;
          email: string | null;
          address: string | null;
          city: string | null;
          state: string | null;
          zip_code: string | null;
          latitude: number | null;
          longitude: number | null;
          logo_url: string | null;
          cover_url: string | null;
          operating_hours: Json;
          max_capacity: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          name: string;
          slug: string;
          description?: string | null;
          phone?: string | null;
          email?: string | null;
          address?: string | null;
          city?: string | null;
          state?: string | null;
          zip_code?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          logo_url?: string | null;
          cover_url?: string | null;
          operating_hours?: Json;
          max_capacity?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          owner_id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          phone?: string | null;
          email?: string | null;
          address?: string | null;
          city?: string | null;
          state?: string | null;
          zip_code?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          logo_url?: string | null;
          cover_url?: string | null;
          operating_hours?: Json;
          max_capacity?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'creches_owner_id_fkey';
            columns: ['owner_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      creche_members: {
        Row: {
          id: string;
          creche_id: string;
          profile_id: string;
          role: Database['public']['Enums']['creche_member_role'];
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          creche_id: string;
          profile_id: string;
          role?: Database['public']['Enums']['creche_member_role'];
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          creche_id?: string;
          profile_id?: string;
          role?: Database['public']['Enums']['creche_member_role'];
          is_active?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'creche_members_creche_id_fkey';
            columns: ['creche_id'];
            isOneToOne: false;
            referencedRelation: 'creches';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'creche_members_profile_id_fkey';
            columns: ['profile_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      pets: {
        Row: {
          id: string;
          tutor_id: string;
          name: string;
          breed: string | null;
          birth_date: string | null;
          weight: number | null;
          gender: Database['public']['Enums']['pet_gender'] | null;
          temperament: string | null;
          food_restrictions: string | null;
          special_conditions: string | null;
          avatar_url: string | null;
          is_active: boolean;
          is_neutered: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          tutor_id: string;
          name: string;
          breed?: string | null;
          birth_date?: string | null;
          weight?: number | null;
          gender?: Database['public']['Enums']['pet_gender'] | null;
          temperament?: string | null;
          food_restrictions?: string | null;
          special_conditions?: string | null;
          avatar_url?: string | null;
          is_active?: boolean;
          is_neutered?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tutor_id?: string;
          name?: string;
          breed?: string | null;
          birth_date?: string | null;
          weight?: number | null;
          gender?: Database['public']['Enums']['pet_gender'] | null;
          temperament?: string | null;
          food_restrictions?: string | null;
          special_conditions?: string | null;
          avatar_url?: string | null;
          is_active?: boolean;
          is_neutered?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'pets_tutor_id_fkey';
            columns: ['tutor_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      vaccines: {
        Row: {
          id: string;
          pet_id: string;
          name: string;
          applied_at: string;
          expires_at: string | null;
          document_url: string | null;
          status: Database['public']['Enums']['vaccine_status'];
          created_at: string;
        };
        Insert: {
          id?: string;
          pet_id: string;
          name: string;
          applied_at: string;
          expires_at?: string | null;
          document_url?: string | null;
          status?: Database['public']['Enums']['vaccine_status'];
          created_at?: string;
        };
        Update: {
          id?: string;
          pet_id?: string;
          name?: string;
          applied_at?: string;
          expires_at?: string | null;
          document_url?: string | null;
          status?: Database['public']['Enums']['vaccine_status'];
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'vaccines_pet_id_fkey';
            columns: ['pet_id'];
            isOneToOne: false;
            referencedRelation: 'pets';
            referencedColumns: ['id'];
          },
        ];
      };
      creche_vaccine_requirements: {
        Row: {
          id: string;
          creche_id: string;
          vaccine_name: string;
          is_mandatory: boolean;
        };
        Insert: {
          id?: string;
          creche_id: string;
          vaccine_name: string;
          is_mandatory?: boolean;
        };
        Update: {
          id?: string;
          creche_id?: string;
          vaccine_name?: string;
          is_mandatory?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: 'creche_vaccine_requirements_creche_id_fkey';
            columns: ['creche_id'];
            isOneToOne: false;
            referencedRelation: 'creches';
            referencedColumns: ['id'];
          },
        ];
      };
      bookings: {
        Row: {
          id: string;
          creche_id: string;
          pet_id: string;
          tutor_id: string;
          date: string;
          shift: Database['public']['Enums']['booking_shift'];
          status: Database['public']['Enums']['booking_status'];
          check_in_at: string | null;
          check_out_at: string | null;
          checked_in_by: string | null;
          checked_out_by: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          creche_id: string;
          pet_id: string;
          tutor_id: string;
          date: string;
          shift?: Database['public']['Enums']['booking_shift'];
          status?: Database['public']['Enums']['booking_status'];
          check_in_at?: string | null;
          check_out_at?: string | null;
          checked_in_by?: string | null;
          checked_out_by?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          creche_id?: string;
          pet_id?: string;
          tutor_id?: string;
          date?: string;
          shift?: Database['public']['Enums']['booking_shift'];
          status?: Database['public']['Enums']['booking_status'];
          check_in_at?: string | null;
          check_out_at?: string | null;
          checked_in_by?: string | null;
          checked_out_by?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'bookings_creche_id_fkey';
            columns: ['creche_id'];
            isOneToOne: false;
            referencedRelation: 'creches';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'bookings_pet_id_fkey';
            columns: ['pet_id'];
            isOneToOne: false;
            referencedRelation: 'pets';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'bookings_tutor_id_fkey';
            columns: ['tutor_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      plans: {
        Row: {
          id: string;
          creche_id: string;
          name: string;
          description: string | null;
          price: number;
          days_per_week: number;
          billing_cycle: Database['public']['Enums']['billing_cycle'];
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          creche_id: string;
          name: string;
          description?: string | null;
          price: number;
          days_per_week: number;
          billing_cycle?: Database['public']['Enums']['billing_cycle'];
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          creche_id?: string;
          name?: string;
          description?: string | null;
          price?: number;
          days_per_week?: number;
          billing_cycle?: Database['public']['Enums']['billing_cycle'];
          is_active?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'plans_creche_id_fkey';
            columns: ['creche_id'];
            isOneToOne: false;
            referencedRelation: 'creches';
            referencedColumns: ['id'];
          },
        ];
      };
      subscriptions: {
        Row: {
          id: string;
          plan_id: string;
          tutor_id: string;
          pet_id: string;
          status: Database['public']['Enums']['subscription_status'];
          asaas_subscription_id: string | null;
          started_at: string;
          cancelled_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          plan_id: string;
          tutor_id: string;
          pet_id: string;
          status?: Database['public']['Enums']['subscription_status'];
          asaas_subscription_id?: string | null;
          started_at?: string;
          cancelled_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          plan_id?: string;
          tutor_id?: string;
          pet_id?: string;
          status?: Database['public']['Enums']['subscription_status'];
          asaas_subscription_id?: string | null;
          started_at?: string;
          cancelled_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'subscriptions_plan_id_fkey';
            columns: ['plan_id'];
            isOneToOne: false;
            referencedRelation: 'plans';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'subscriptions_tutor_id_fkey';
            columns: ['tutor_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'subscriptions_pet_id_fkey';
            columns: ['pet_id'];
            isOneToOne: false;
            referencedRelation: 'pets';
            referencedColumns: ['id'];
          },
        ];
      };
      reports: {
        Row: {
          id: string;
          booking_id: string;
          pet_id: string;
          creche_id: string;
          created_by: string;
          socialization_score: number | null;
          obedience_score: number | null;
          energy_score: number | null;
          feeding_score: number | null;
          overall_notes: string | null;
          incidents: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          booking_id: string;
          pet_id: string;
          creche_id: string;
          created_by: string;
          socialization_score?: number | null;
          obedience_score?: number | null;
          energy_score?: number | null;
          feeding_score?: number | null;
          overall_notes?: string | null;
          incidents?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          booking_id?: string;
          pet_id?: string;
          creche_id?: string;
          created_by?: string;
          socialization_score?: number | null;
          obedience_score?: number | null;
          energy_score?: number | null;
          feeding_score?: number | null;
          overall_notes?: string | null;
          incidents?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'reports_booking_id_fkey';
            columns: ['booking_id'];
            isOneToOne: false;
            referencedRelation: 'bookings';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'reports_pet_id_fkey';
            columns: ['pet_id'];
            isOneToOne: false;
            referencedRelation: 'pets';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'reports_creche_id_fkey';
            columns: ['creche_id'];
            isOneToOne: false;
            referencedRelation: 'creches';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'reports_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      feed_posts: {
        Row: {
          id: string;
          creche_id: string;
          created_by: string;
          content: string | null;
          media_urls: string[];
          created_at: string;
        };
        Insert: {
          id?: string;
          creche_id: string;
          created_by: string;
          content?: string | null;
          media_urls?: string[];
          created_at?: string;
        };
        Update: {
          id?: string;
          creche_id?: string;
          created_by?: string;
          content?: string | null;
          media_urls?: string[];
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'feed_posts_creche_id_fkey';
            columns: ['creche_id'];
            isOneToOne: false;
            referencedRelation: 'creches';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'feed_posts_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      feed_post_pets: {
        Row: {
          feed_post_id: string;
          pet_id: string;
        };
        Insert: {
          feed_post_id: string;
          pet_id: string;
        };
        Update: {
          feed_post_id?: string;
          pet_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'feed_post_pets_feed_post_id_fkey';
            columns: ['feed_post_id'];
            isOneToOne: false;
            referencedRelation: 'feed_posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'feed_post_pets_pet_id_fkey';
            columns: ['pet_id'];
            isOneToOne: false;
            referencedRelation: 'pets';
            referencedColumns: ['id'];
          },
        ];
      };
      invoices: {
        Row: {
          id: string;
          creche_id: string;
          tutor_id: string;
          subscription_id: string | null;
          booking_id: string | null;
          amount: number;
          status: Database['public']['Enums']['invoice_status'];
          payment_method: Database['public']['Enums']['payment_method'] | null;
          asaas_payment_id: string | null;
          due_date: string;
          paid_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          creche_id: string;
          tutor_id: string;
          subscription_id?: string | null;
          booking_id?: string | null;
          amount: number;
          status?: Database['public']['Enums']['invoice_status'];
          payment_method?: Database['public']['Enums']['payment_method'] | null;
          asaas_payment_id?: string | null;
          due_date: string;
          paid_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          creche_id?: string;
          tutor_id?: string;
          subscription_id?: string | null;
          booking_id?: string | null;
          amount?: number;
          status?: Database['public']['Enums']['invoice_status'];
          payment_method?: Database['public']['Enums']['payment_method'] | null;
          asaas_payment_id?: string | null;
          due_date?: string;
          paid_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'invoices_creche_id_fkey';
            columns: ['creche_id'];
            isOneToOne: false;
            referencedRelation: 'creches';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'invoices_tutor_id_fkey';
            columns: ['tutor_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'invoices_subscription_id_fkey';
            columns: ['subscription_id'];
            isOneToOne: false;
            referencedRelation: 'subscriptions';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'invoices_booking_id_fkey';
            columns: ['booking_id'];
            isOneToOne: false;
            referencedRelation: 'bookings';
            referencedColumns: ['id'];
          },
        ];
      };
      messages: {
        Row: {
          id: string;
          creche_id: string;
          sender_id: string;
          content: string;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          creche_id: string;
          sender_id: string;
          content: string;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          creche_id?: string;
          sender_id?: string;
          content?: string;
          is_read?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'messages_creche_id_fkey';
            columns: ['creche_id'];
            isOneToOne: false;
            referencedRelation: 'creches';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'messages_sender_id_fkey';
            columns: ['sender_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      is_creche_member: {
        Args: {
          creche_uuid: string;
          profile_uuid: string;
        };
        Returns: boolean;
      };
      is_creche_admin: {
        Args: {
          creche_uuid: string;
          profile_uuid: string;
        };
        Returns: boolean;
      };
      is_creche_owner: {
        Args: {
          creche_uuid: string;
          profile_uuid: string;
        };
        Returns: boolean;
      };
      get_user_creche_ids: {
        Args: {
          profile_uuid: string;
        };
        Returns: string[];
      };
      fn_verificar_disponibilidade: {
        Args: {
          p_creche_id: string;
          p_data: string;
          p_turno?: Database['public']['Enums']['booking_shift'];
        };
        Returns: {
          vagas_disponiveis: number;
          total_agendamentos: number;
          capacidade_maxima: number;
        }[];
      };
      fn_dashboard_creche: {
        Args: {
          p_creche_id: string;
        };
        Returns: Json;
      };
      fn_historico_pet: {
        Args: {
          p_pet_id: string;
          p_limit?: number;
        };
        Returns: Json;
      };
      fn_relatorio_financeiro: {
        Args: {
          p_creche_id: string;
          p_inicio: string;
          p_fim: string;
        };
        Returns: Json;
      };
    };
    Enums: {
      user_role: 'tutor' | 'admin' | 'cuidador';
      creche_member_role: 'admin' | 'cuidador';
      pet_gender: 'macho' | 'femea';
      vaccine_status: 'valid' | 'expiring_soon' | 'expired';
      booking_shift: 'integral' | 'manha' | 'tarde';
      booking_status: 'confirmed' | 'pending' | 'cancelled' | 'completed' | 'no_show';
      billing_cycle: 'monthly' | 'weekly';
      subscription_status: 'active' | 'paused' | 'cancelled';
      invoice_status: 'pending' | 'confirmed' | 'received' | 'overdue' | 'refunded' | 'cancelled';
      payment_method: 'pix' | 'boleto' | 'credit_card';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

// Helper types
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
export type InsertTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];
export type UpdateTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];
export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T];
