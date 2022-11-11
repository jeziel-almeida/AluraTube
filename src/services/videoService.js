import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://fdnigtmhwzomqomnommu.supabase.co"
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkbmlndG1od3pvbXFvbW5vbW11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxNzA0NDIsImV4cCI6MTk4Mzc0NjQ0Mn0.XsU2JBOKx8e1XzKr9j8eWBUDdS_zNDEZLgzBFl4ebas"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("video").select("*")
        },
        insertVideo() {
            return supabase.from("video")
        }
    }
}