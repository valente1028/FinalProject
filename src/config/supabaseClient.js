import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cdigwlainwyihsbvtpdz.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyaWpob2ljdHJieGlza2Z5bnNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMxNDE1NjEsImV4cCI6MjAyODcxNzU2MX0.TKml-ceb9YYNoOgXDXyDV8ljwnYjHwZfusNKDpF6pHk";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
