import { createClient } from "@supabase/supabase-js"
const supabaseUrl = 'https://uxugmioardnyredowtry.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY

export default async function handler(req, res) {
    const supabase = createClient(supabaseUrl, supabaseKey)

    const {scenarioid} = req.query

    let { data: scenario, error } = await supabase
        .from('scenarios')
        .select('SCENARIO_ID, SCENARIO_NAME, AUTHOR_GROUP_ID')
        .eq('SCENARIO_ID', scenarioid)

    res.status(200).json(scenario)
}