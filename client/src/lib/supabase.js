import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xyupmfdotkuhzpmzmtuv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5dXBtZmRvdGt1aHpwbXptdHV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5MDM3MTMsImV4cCI6MjA4MDQ3OTcxM30.limtJMGA2D_aQlEIqpPxb5_dPZVtBNp5jvu7ZBIHFxA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
