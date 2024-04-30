import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cdigwlainwyihsbvtpdz.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkaWd3bGFpbnd5aWhzYnZ0cGR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzAxOTY0NjYsImV4cCI6MTk4NTc3MjQ2Nn0.ui05rgebbLZeoINhq5KFBRY1tsqjKbqEZyfxb3pFi4k";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
