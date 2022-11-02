import { createClient } from "@supabase/supabase-js"

const supabaseUrl = 'https://uxugmioardnyredowtry.supabase.co'
const supabaseKey = 
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4dWdtaW9hcmRueXJlZG93dHJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYxOTk2ODQsImV4cCI6MTk4MTc3NTY4NH0.zUqJvrgCMTd-eem_DVaP249mUNYzCftwAv2zbwXBM4k'
console.log(supabaseKey);

export default async function handler(req, res) {
    const supabase = createClient(supabaseUrl, supabaseKey)

    let { data: groups, error } = await supabase
        .from('groups')
        .select('*')

    res.status(200).json(groups)
}
