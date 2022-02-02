// import { QueryClient, QueryClientProvider } from 'react-query'
import ProfileDetails from './ProfileDetails'

// const queryClient = new QueryClient()

const ProfilePage = () => {
  return (
    <div className="h-screen flex flex-col">
      {/* <QueryClientProvider client={queryClient}> */}
      <ProfileDetails />
      {/* </QueryClientProvider> */}
    </div>
  )
}

export default ProfilePage
