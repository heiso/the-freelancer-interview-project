import { QueryClient, QueryClientProvider } from 'react-query'
import Layout from './Layout'
import ProfileDetails from './ProfileDetails'

const queryClient = new QueryClient()

const ProfilePage = () => {
  return (
    <div className="h-screen flex flex-col">
      <QueryClientProvider client={queryClient}>
        <Layout>
          <ProfileDetails />
        </Layout>
      </QueryClientProvider>
    </div>
  )
}

export default ProfilePage
