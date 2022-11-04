import { createClient } from "@supabase/supabase-js"

const supabaseUrl = 'https://uxugmioardnyredowtry.supabase.co'
const supabaseKey = 
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4dWdtaW9hcmRueXJlZG93dHJ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2NjE5OTY4NCwiZXhwIjoxOTgxNzc1Njg0fQ.-T1kRKY9nqKr766m1Lqynsz_43$'

const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req, res) {

    let { data: groups, error } = await supabase
        .from('scenarios')
        .select('*')

    res.status(200).json(groups)
}
