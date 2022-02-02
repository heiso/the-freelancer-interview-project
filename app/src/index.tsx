import { gql } from 'graphql-request'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import ProfilePage from './components/ProfilePage'
import './index.css'
import EditProfileForm from './routes/editProfile'

const queryClient = new QueryClient()

/**
 * The type `AvatarExampleFragment` in automatically generated.
 * The document can be passed to any graphql client.
 *
 * @example
 * import { AvatarExampleFragment } from './generated/graphql'
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AvatarExampleFragmentDocument = gql`
  fragment AvatarExample on Avatar {
    smallUrl
    largeUrl
    xLargeUrl
  }
`

const mountingPoint = document.getElementById('root')

if (mountingPoint == null) {
  throw new Error(
    'The mounting point of the application was not found. Please make sure an element with `id="root"` exist in index.html.'
  )
}

function App() {
  return (
    <Layout>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="profileEdit" element={<EditProfileForm />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Layout>
  )
}

ReactDOM.render(<App />, mountingPoint)
