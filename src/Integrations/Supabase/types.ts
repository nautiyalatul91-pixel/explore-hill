export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      bookings: {
        Row: {
          created_at: string;
          email: string;
          full_name: string;
          id: string;
          package_name: string;
          package_slug: string;
          phone: string;
          special_requirements: string | null;
          status: string;
          travel_date: string;
          travelers: number;
          guide_name: string | null;
          coordinator_name: string | null;
          vehicle_info: string | null;
          internal_notes: string | null;
          payment_status: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          full_name: string;
          id?: string;
          package_name: string;
          package_slug: string;
          phone: string;
          special_requirements?: string | null;
          status?: string;
          travel_date: string;
          travelers: number;
          guide_name?: string | null;
          coordinator_name?: string | null;
          vehicle_info?: string | null;
          internal_notes?: string | null;
          payment_status?: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          full_name?: string;
          id?: string;
          package_name?: string;
          package_slug?: string;
          phone?: string;
          special_requirements?: string | null;
          status?: string;
          travel_date?: string;
          travelers?: number;
          guide_name?: string | null;
          coordinator_name?: string | null;
          vehicle_info?: string | null;
          internal_notes?: string | null;
          payment_status?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          created_at: string;
          id: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          user_id?: string;
        };
        Relationships: [];
      };
      departures: {
        Row: {
          id: string;
          package_slug: string;
          start_date: string;
          end_date: string;
          max_seats: number;
          booked_seats: number;
          status: string;
          created_at: string;
          unlimited_seats: boolean;
          waitlist_enabled: boolean;
          booking_cutoff_days: number;
          guide_name: string | null;
          guide_phone: string | null;
          meeting_time: string | null;
          meeting_location: string | null;
          internal_notes: string | null;
          visibility: string;
        };
        Insert: {
          id?: string;
          package_slug: string;
          start_date: string;
          end_date: string;
          max_seats?: number;
          booked_seats?: number;
          status?: string;
          created_at?: string;
          unlimited_seats?: boolean;
          waitlist_enabled?: boolean;
          booking_cutoff_days?: number;
          guide_name?: string | null;
          guide_phone?: string | null;
          meeting_time?: string | null;
          meeting_location?: string | null;
          internal_notes?: string | null;
          visibility?: string;
        };
        Update: {
          id?: string;
          package_slug?: string;
          start_date?: string;
          end_date?: string;
          max_seats?: number;
          booked_seats?: number;
          status?: string;
          created_at?: string;
          unlimited_seats?: boolean;
          waitlist_enabled?: boolean;
          booking_cutoff_days?: number;
          guide_name?: string | null;
          guide_phone?: string | null;
          meeting_time?: string | null;
          meeting_location?: string | null;
          internal_notes?: string | null;
          visibility?: string;
        };
        Relationships: [];
      };
      packages: {
        Row: {
          slug: string;
          name: string;
          category: "trek" | "trip";
          sub_category: string | null;
          region: string | null;
          location: string | null;
          state: string | null;
          country: string | null;
          price: number;
          discount_price: number | null;
          offer_badge: string | null;
          offer_start_date: string | null;
          offer_end_date: string | null;
          duration: string;
          difficulty: string | null;
          altitude: string | null;
          distance: string | null;
          temperature: string | null;
          best_season: string | null;
          pickup_point: string | null;
          drop_point: string | null;
          meeting_point: string | null;
          google_maps: string | null;
          group_size: string | null;
          minimum_age: number | null;
          maximum_age: number | null;
          package_code: string | null;
          status: "draft" | "published" | "archived";
          sort_order: number;
          featured: boolean;
          trending: boolean;
          popular: boolean;
          new_arrival: boolean;
          visibility: "visible" | "hidden";
          image: string | null;
          images: string[] | null;
          overview: string | null;
          highlights: string[] | null;
          inclusions: string[] | null;
          exclusions: string[] | null;
          things_to_carry: string[] | null;
          fitness_requirements: string | null;
          cancellation_policy: string | null;
          terms_conditions: string | null;
          know_before_you_go: string | null;
          safety_instructions: string | null;
          emergency_contacts: string | null;
          medical_requirements: string | null;
          faqs: Json;
          tagline: string | null;
          meta_title: string | null;
          meta_description: string | null;
          og_image: string | null;
          canonical_url: string | null;
          updated_at: string;
          created_at: string;
        };
        Insert: {
          slug: string;
          name: string;
          category: "trek" | "trip";
          sub_category?: string | null;
          region?: string | null;
          location?: string | null;
          state?: string | null;
          country?: string | null;
          price: number;
          discount_price?: number | null;
          offer_badge?: string | null;
          offer_start_date?: string | null;
          offer_end_date?: string | null;
          duration: string;
          difficulty?: string | null;
          altitude?: string | null;
          distance?: string | null;
          temperature?: string | null;
          best_season?: string | null;
          pickup_point?: string | null;
          drop_point?: string | null;
          meeting_point?: string | null;
          google_maps?: string | null;
          group_size?: string | null;
          minimum_age?: number | null;
          maximum_age?: number | null;
          package_code?: string | null;
          status?: "draft" | "published" | "archived";
          sort_order?: number;
          featured?: boolean;
          trending?: boolean;
          popular?: boolean;
          new_arrival?: boolean;
          visibility?: "visible" | "hidden";
          image?: string | null;
          images?: string[] | null;
          overview?: string | null;
          highlights?: string[] | null;
          inclusions?: string[] | null;
          exclusions?: string[] | null;
          things_to_carry?: string[] | null;
          fitness_requirements?: string | null;
          cancellation_policy?: string | null;
          terms_conditions?: string | null;
          know_before_you_go?: string | null;
          safety_instructions?: string | null;
          emergency_contacts?: string | null;
          medical_requirements?: string | null;
          faqs?: Json;
          tagline?: string | null;
          meta_title?: string | null;
          meta_description?: string | null;
          og_image?: string | null;
          canonical_url?: string | null;
          updated_at?: string;
          created_at?: string;
        };
        Update: {
          slug?: string;
          name?: string;
          category?: "trek" | "trip";
          sub_category?: string | null;
          region?: string | null;
          location?: string | null;
          state?: string | null;
          country?: string | null;
          price?: number;
          discount_price?: number | null;
          offer_badge?: string | null;
          offer_start_date?: string | null;
          offer_end_date?: string | null;
          duration?: string;
          difficulty?: string | null;
          altitude?: string | null;
          distance?: string | null;
          temperature?: string | null;
          best_season?: string | null;
          pickup_point?: string | null;
          drop_point?: string | null;
          meeting_point?: string | null;
          google_maps?: string | null;
          group_size?: string | null;
          minimum_age?: number | null;
          maximum_age?: number | null;
          package_code?: string | null;
          status?: "draft" | "published" | "archived";
          sort_order?: number;
          featured?: boolean;
          trending?: boolean;
          popular?: boolean;
          new_arrival?: boolean;
          visibility?: "visible" | "hidden";
          image?: string | null;
          images?: string[] | null;
          overview?: string | null;
          highlights?: string[] | null;
          inclusions?: string[] | null;
          exclusions?: string[] | null;
          things_to_carry?: string[] | null;
          fitness_requirements?: string | null;
          cancellation_policy?: string | null;
          terms_conditions?: string | null;
          know_before_you_go?: string | null;
          safety_instructions?: string | null;
          emergency_contacts?: string | null;
          medical_requirements?: string | null;
          faqs?: Json;
          tagline?: string | null;
          meta_title?: string | null;
          meta_description?: string | null;
          og_image?: string | null;
          canonical_url?: string | null;
          updated_at?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      package_itineraries: {
        Row: {
          id: string;
          package_slug: string;
          day_number: number;
          title: string;
          subtitle: string | null;
          description: string | null;
          meals: string | null;
          stay: string | null;
          distance: string | null;
          altitude: string | null;
          travel_time: string | null;
          activities: string | null;
          notes: string | null;
          images: string[] | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          package_slug: string;
          day_number: number;
          title: string;
          subtitle?: string | null;
          description?: string | null;
          meals?: string | null;
          stay?: string | null;
          distance?: string | null;
          altitude?: string | null;
          travel_time?: string | null;
          activities?: string | null;
          notes?: string | null;
          images?: string[] | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          package_slug?: string;
          day_number?: number;
          title?: string;
          subtitle?: string | null;
          description?: string | null;
          meals?: string | null;
          stay?: string | null;
          distance?: string | null;
          altitude?: string | null;
          travel_time?: string | null;
          activities?: string | null;
          notes?: string | null;
          images?: string[] | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "package_itineraries_package_slug_fkey";
            columns: ["package_slug"];
            referencedRelation: "packages";
            referencedColumns: ["slug"];
          },
        ];
      };
      media_library: {
        Row: {
          id: string;
          filename: string;
          url: string;
          size_bytes: number | null;
          content_type: string | null;
          folder: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          filename: string;
          url: string;
          size_bytes?: number | null;
          content_type?: string | null;
          folder?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          filename?: string;
          url?: string;
          size_bytes?: number | null;
          content_type?: string | null;
          folder?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      role_permissions: {
        Row: {
          id: string;
          role: Database["public"]["Enums"]["app_role"];
          permission: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          role: Database["public"]["Enums"]["app_role"];
          permission: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          permission?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      customers: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          emergency_contact: string | null;
          address: string | null;
          government_id: string | null;
          medical_information: string | null;
          notes: string | null;
          internal_notes: string | null;
          tags: string[];
          vip: boolean;
          blacklisted: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          emergency_contact?: string | null;
          address?: string | null;
          government_id?: string | null;
          medical_information?: string | null;
          notes?: string | null;
          internal_notes?: string | null;
          tags?: string[];
          vip?: boolean;
          blacklisted?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          emergency_contact?: string | null;
          address?: string | null;
          government_id?: string | null;
          medical_information?: string | null;
          notes?: string | null;
          internal_notes?: string | null;
          tags?: string[];
          vip?: boolean;
          blacklisted?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      leads: {
        Row: {
          id: string;
          name: string;
          phone: string | null;
          email: string | null;
          message: string | null;
          interested_package: string | null;
          lead_source: string | null;
          assigned_staff: string | null;
          lead_status: string;
          reminder_date: string | null;
          internal_notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          phone?: string | null;
          email?: string | null;
          message?: string | null;
          interested_package?: string | null;
          lead_source?: string | null;
          assigned_staff?: string | null;
          lead_status?: string;
          reminder_date?: string | null;
          internal_notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          phone?: string | null;
          email?: string | null;
          message?: string | null;
          interested_package?: string | null;
          lead_source?: string | null;
          assigned_staff?: string | null;
          lead_status?: string;
          reminder_date?: string | null;
          internal_notes?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      settings: {
        Row: {
          key: string;
          value: Json;
          updated_at: string;
        };
        Insert: {
          key: string;
          value: Json;
          updated_at?: string;
        };
        Update: {
          key?: string;
          value?: Json;
          updated_at?: string;
        };
        Relationships: [];
      };
      posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          content: string;
          summary: string | null;
          featured_image: string | null;
          categories: string[];
          tags: string[];
          author_name: string | null;
          reading_time: string | null;
          status: string;
          publish_date: string;
          featured: boolean;
          meta_title: string | null;
          meta_description: string | null;
          canonical_url: string | null;
          og_image: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          content: string;
          summary?: string | null;
          featured_image?: string | null;
          categories?: string[];
          tags?: string[];
          author_name?: string | null;
          reading_time?: string | null;
          status?: string;
          publish_date?: string;
          featured?: boolean;
          meta_title?: string | null;
          meta_description?: string | null;
          canonical_url?: string | null;
          og_image?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          content?: string;
          summary?: string | null;
          featured_image?: string | null;
          categories?: string[];
          tags?: string[];
          author_name?: string | null;
          reading_time?: string | null;
          status?: string;
          publish_date?: string;
          featured?: boolean;
          meta_title?: string | null;
          meta_description?: string | null;
          canonical_url?: string | null;
          og_image?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      coupons: {
        Row: {
          id: string;
          code: string;
          discount_type: string;
          discount_value: number;
          minimum_amount: number;
          maximum_discount: number | null;
          usage_limit: number | null;
          usage_count: number;
          expiry_date: string | null;
          applicable_packages: string[] | null;
          is_enabled: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          code: string;
          discount_type: string;
          discount_value: number;
          minimum_amount?: number;
          maximum_discount?: number | null;
          usage_limit?: number | null;
          usage_count?: number;
          expiry_date?: string | null;
          applicable_packages?: string[] | null;
          is_enabled?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          code?: string;
          discount_type?: string;
          discount_value?: number;
          minimum_amount?: number;
          maximum_discount?: number | null;
          usage_limit?: number | null;
          usage_count?: number;
          expiry_date?: string | null;
          applicable_packages?: string[] | null;
          is_enabled?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      reviews: {
        Row: {
          id: string;
          package_slug: string;
          user_name: string;
          rating: number;
          comment: string | null;
          images: string[] | null;
          videos: string[] | null;
          reply: string | null;
          status: string;
          featured: boolean;
          verified: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          package_slug: string;
          user_name: string;
          rating: number;
          comment?: string | null;
          images?: string[] | null;
          videos?: string[] | null;
          reply?: string | null;
          status?: string;
          featured?: boolean;
          verified?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          package_slug?: string;
          user_name?: string;
          rating?: number;
          comment?: string | null;
          images?: string[] | null;
          videos?: string[] | null;
          reply?: string | null;
          status?: string;
          featured?: boolean;
          verified?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "reviews_package_slug_fkey";
            columns: ["package_slug"];
            isOneToOne: false;
            referencedRelation: "packages";
            referencedColumns: ["slug"];
          },
        ];
      };
      audit_logs: {
        Row: {
          id: string;
          user_id: string | null;
          action: string;
          target_type: string;
          target_id: string | null;
          details: Json;
          ip_address: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          action: string;
          target_type: string;
          target_id?: string | null;
          details?: Json;
          ip_address?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          action?: string;
          target_type?: string;
          target_id?: string | null;
          details?: Json;
          ip_address?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      package_gallery: {
        Row: {
          id: string;
          package_slug: string;
          media_id: string;
          sort_order: number;
          alt_text: string | null;
          caption: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          package_slug: string;
          media_id: string;
          sort_order?: number;
          alt_text?: string | null;
          caption?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          package_slug?: string;
          media_id?: string;
          sort_order?: number;
          alt_text?: string | null;
          caption?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "package_gallery_media_id_fkey";
            columns: ["media_id"];
            isOneToOne: false;
            referencedRelation: "media_library";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "package_gallery_package_slug_fkey";
            columns: ["package_slug"];
            isOneToOne: false;
            referencedRelation: "packages";
            referencedColumns: ["slug"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"];
          _user_id: string;
        };
        Returns: boolean;
      };
    };
    Enums: {
      app_role:
        | "super_admin"
        | "admin"
        | "manager"
        | "guide"
        | "content_editor"
        | "read_only"
        | "user";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const;
