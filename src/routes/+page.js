// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;
import { createClient } from '@supabase/supabase-js';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	const supabaseUrl = 'https://nuahpluoeqyvciiaelhp.supabase.co';
	const supabaseKey =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51YWhwbHVvZXF5dmNpaWFlbGhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyODAyMTEsImV4cCI6MTk4Mzg1NjIxMX0.ZK7KzlWGKRXNum11U3oBH6RVYcgVEkOabTsoP4QoLTU';
	const supabase = createClient(supabaseUrl, supabaseKey);

	return supabase
		.from('doctors')
		.select('*')
		.then((r) => {
			return {
				doctors: r.data
			};
		});
}
