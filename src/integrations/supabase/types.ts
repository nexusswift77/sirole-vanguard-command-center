export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          password_changed: boolean | null
          role: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          password_changed?: boolean | null
          role: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          password_changed?: boolean | null
          role?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          approval_status: string | null
          client_name: string | null
          created_at: string | null
          id: string
          notes: string | null
          revenue: number | null
          scheduled_at: string | null
          service_type: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          approval_status?: string | null
          client_name?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          revenue?: number | null
          scheduled_at?: string | null
          service_type?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          approval_status?: string | null
          client_name?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          revenue?: number | null
          scheduled_at?: string | null
          service_type?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      career_applications: {
        Row: {
          cover_letter: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          resume_url: string | null
        }
        Insert: {
          cover_letter?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          resume_url?: string | null
        }
        Update: {
          cover_letter?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          resume_url?: string | null
        }
        Relationships: []
      }
      clients: {
        Row: {
          company_name: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
        }
        Insert: {
          company_name?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
        }
        Update: {
          company_name?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          message: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          message?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          message?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          banner_url: string | null
          created_at: string | null
          description: string | null
          event_date: string | null
          id: string
          is_public: boolean | null
          location: string | null
          title: string | null
        }
        Insert: {
          banner_url?: string | null
          created_at?: string | null
          description?: string | null
          event_date?: string | null
          id?: string
          is_public?: boolean | null
          location?: string | null
          title?: string | null
        }
        Update: {
          banner_url?: string | null
          created_at?: string | null
          description?: string | null
          event_date?: string | null
          id?: string
          is_public?: boolean | null
          location?: string | null
          title?: string | null
        }
        Relationships: []
      }
      gallery_photos: {
        Row: {
          alt_text: string | null
          category: string | null
          created_at: string | null
          id: string
          src: string | null
        }
        Insert: {
          alt_text?: string | null
          category?: string | null
          created_at?: string | null
          id?: string
          src?: string | null
        }
        Update: {
          alt_text?: string | null
          category?: string | null
          created_at?: string | null
          id?: string
          src?: string | null
        }
        Relationships: []
      }
      inventory: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          item_name: string | null
          quantity: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          item_name?: string | null
          quantity?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          item_name?: string | null
          quantity?: number | null
        }
        Relationships: []
      }
      meeting_requests: {
        Row: {
          created_at: string | null
          email: string
          event_date: string | null
          event_type: string | null
          full_name: string
          id: string
          location: string | null
          phone: string | null
          protocol_officers: string | null
          status: string | null
          updated_at: string | null
          vision: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          event_date?: string | null
          event_type?: string | null
          full_name: string
          id?: string
          location?: string | null
          phone?: string | null
          protocol_officers?: string | null
          status?: string | null
          updated_at?: string | null
          vision?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          event_date?: string | null
          event_type?: string | null
          full_name?: string
          id?: string
          location?: string | null
          phone?: string | null
          protocol_officers?: string | null
          status?: string | null
          updated_at?: string | null
          vision?: string | null
        }
        Relationships: []
      }
      quotes: {
        Row: {
          client_name: string | null
          created_at: string | null
          id: string
          notes: string | null
          price: number | null
          service_summary: string | null
        }
        Insert: {
          client_name?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          price?: number | null
          service_summary?: string | null
        }
        Update: {
          client_name?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          price?: number | null
          service_summary?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          price_estimate: number | null
          title: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          price_estimate?: number | null
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          price_estimate?: number | null
          title?: string
        }
        Relationships: []
      }
      staff: {
        Row: {
          contact: string | null
          created_at: string | null
          full_name: string | null
          id: string
          role: string | null
        }
        Insert: {
          contact?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          role?: string | null
        }
        Update: {
          contact?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          role?: string | null
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
        }
        Relationships: []
      }
      vvip_subscribers: {
        Row: {
          company: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
