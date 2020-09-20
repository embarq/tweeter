import Layout from '../../components/layout'
import MePageLayout from '../../components/me-page-layout'

export default function MeProfilePage() {
  return (
    <Layout>
      <MePageLayout>
        <div className="card-header pt-0">
          <h1 className="text-4xl">Profile</h1>
        </div>
      </MePageLayout>
    </Layout>
  )
}
